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
import NavigationService from 'navigation/NavigationService';

class PersonalityScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  isNew = false;

  componentWillMount() {
    const {
      myPersonality,
      selectReflection,
      setInitialReflection,
      reflectionDraft,
    } = this.props;
    if (myPersonality) {
      selectReflection(myPersonality);
    } else {
      this.isNew = true;
      if (reflectionDraft['Personality']) {
        selectReflection(reflectionDraft['Personality']);
      } else {
        setInitialReflection('personality');
      }
    }
  }

  onPressBack = () => {
    const {selectedReflection, saveReflectionDraft} = this.props;
    if (this.isNew) {
      saveReflectionDraft({
        [selectedReflection.type]: selectedReflection,
      });
    }
    NavigationService.goBack();
  };

  onSubmit = () => {
    this.props.addOrUpdateReflection();
  };

  onChangeValue = (key, value) => {
    const {updateSelectedReflection} = this.props;
    if (Number(value) > 100) {
      updateSelectedReflection({[key]: 100});
    } else if (Number(value) < 0 || value.length === 0) {
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
            onChange={value => this.onChangeValue(key, value)}
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
    const {t, theme, selectedReflection} = this.props;
    if (!selectedReflection || !selectedReflection.data) return null;
    return (
      <MCRootView>
        <MCHeader
          hasRight
          title={t('profile_subtitle_personality')}
          rightIcon="cloud-upload-alt"
          rightText={t('button_save')}
          rightIconColor={theme.colors.outline}
          onPressRight={() => this.onSubmit()}
          onPressBack={() => this.onPressBack()}
        />
        <MCContent>
          {selectedReflection.data && (
            <FlatList
              contentContainerStyle={{padding: dySize(15)}}
              data={Object.keys(DefaultReflections.personality.data)}
              renderItem={this._renderPersonalityItem}
              keyExtractor={item => item}
            />
          )}
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  myPersonality: selector.reflections.findMySpecialReflections(
    state,
    'Personality',
  ),
  selectedReflection: selector.reflections.getSelectedReflection(state),
  reflectionDraft: state.reflectionReducer.draft,
});

const mapDispatchToProps = {
  setInitialReflection: reflectionActions.setInitialReflection,
  updateSelectedReflection: reflectionActions.updateSelectedReflection,
  addOrUpdateReflection: reflectionActions.addOrUpdateReflection,
  selectReflection: reflectionActions.selectReflection,
  saveReflectionDraft: reflectionActions.saveReflectionDraft,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PersonalityScreen),
);
