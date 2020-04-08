import React from 'react';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import {MCView, MCRootView, MCContent} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import {H3} from 'components/styled/Text';
import {MCEditableText, MCHeader} from 'components/common';
import {reflectionActions} from 'Redux/actions';
import {selector} from 'Redux/selectors';
import {DefaultReflections} from 'utils/constants';

class PersonalityScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const {myPersonality} = this.props;
    if (myPersonality) {
      this.props.selectReflection(myPersonality);
    } else {
      this.props.setInitialReflection('personality');
    }
  }

  onSaveMyPersonality = () => {
    this.props.addOrUpdateReflection();
  };

  onChangeValue = (key, value) => {
    const {updateSelectedReflection} = this.props;
    if (Number(value) > 100) {
      updateSelectedReflection({[key]: '100'});
    } else if (Number(value) < 0) {
      updateSelectedReflection({[key]: '0'});
    } else {
      updateSelectedReflection({[key]: Number(value)});
    }
  };

  _renderPersonalityItem = ({item}) => {
    const key = item;
    const {t, selectedReflection} = this.props;
    const text = selectedReflection.data[key] || '';
    return (
      <MCView row align="center" mb={20}>
        <H3 style={{flex: 1}} underline>{`${t(`personality_${key}`)} :`}</H3>
        <MCView width={50}>
          <MCEditableText
            text={text.toString()}
            onChange={(value) => this.onChangeValue(key, value)}
            keyboardType="numeric"
          />
        </MCView>
        <H3 ml={10} underline>
          %
        </H3>
      </MCView>
    );
  };

  render() {
    const {t, selectedReflection} = this.props;
    return (
      <MCRootView>
        <MCHeader
          title={t('profile_card_personality')}
          onPressBack={() => this.onSaveMyPersonality()}
        />
        <MCContent>
          {selectedReflection.data && (
            <FlatList
              contentContainerStyle={{padding: dySize(15)}}
              data={Object.keys(DefaultReflections.personality.data)}
              renderItem={this._renderPersonalityItem}
              keyExtractor={(item) => item}
            />
          )}
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.routerReducer.theme,
  myPersonality: selector.reflections.findMySpecialReflections(
    state,
    'Personality',
  ),
  selectedReflection: state.reflectionReducer.selectedReflection,
});

const mapDispatchToProps = {
  saveMyChronotype: reflectionActions.saveMyChronotype,
  setInitialReflection: reflectionActions.setInitialReflection,
  updateSelectedReflection: reflectionActions.updateSelectedReflection,
  addOrUpdateReflection: reflectionActions.addOrUpdateReflection,
  selectReflection: reflectionActions.selectReflection,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(PersonalityScreen),
);
