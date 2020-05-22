import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import {selector} from 'Redux/selectors';
import {reflectionActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {H4, ErrorText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCHeader, MCTimeSlider} from 'components/common';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
import {HydrationValues, HydrationPracticeOptions} from 'utils/constants';
import {FlatList} from 'react-native-gesture-handler';
import {FaucetSvg} from 'assets/svgs';

class HydrationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };
  }
  isNew = false;
  componentWillMount() {
    const {
      hydration,
      selectReflection,
      setInitialReflection,
      reflectionDraft,
    } = this.props;
    if (hydration) {
      selectReflection(hydration);
    } else {
      this.isNew = true;
      if (reflectionDraft['Hydration']) {
        selectReflection(reflectionDraft['Hydration']);
      } else {
        setInitialReflection('hydration');
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

  onPressSubmit = () => {
    this.setState({submitted: true});
    if (!this.validateOptions()) return;
    this.props.addOrUpdateReflection();
  };

  validateOptions = () => {
    const {selectedReflection} = this.props;
    const practices = _.get(selectedReflection, ['data', 'practices'], []);
    return practices.length > 0;
  };

  onChangeHydrationRange = range => {
    this.props.updateSelectedReflection({cups_range: range});
  };

  onToggleOption = option => {
    const {practices} = this.props.selectedReflection.data;
    const index = practices.indexOf(option);
    if (index < 0) practices.push(option);
    else practices.splice(index, 1);
    this.props.updateSelectedReflection({practices});
  };

  _renderItem = ({index, item}) => {
    const {t, theme} = this.props;
    const {practices} = this.props.selectedReflection.data;
    const option = item;
    const color =
      practices.indexOf(option) > -1 ? theme.colors.outline : theme.colors.text;

    return (
      <MCButton
        bordered
        ml={index % 2 === 1 ? 15 : 0}
        mr={index % 2 === 0 ? 15 : 0}
        mt={15}
        width={150}
        height={90}
        align="center"
        justify="center"
        onPress={() => this.onToggleOption(option)}
        style={{
          borderColor: color,
        }}>
        <H4 color={color} align="center">
          {t(`tools_tab_hydration_${option}`)}
        </H4>
      </MCButton>
    );
  };

  render() {
    const {submitted} = this.state;
    const {t, theme, selectedReflection} = this.props;
    const cupsRange = _.get(
      selectedReflection,
      ['data', 'cups_range'],
      undefined,
    );
    const practices = _.get(
      selectedReflection,
      ['data', 'practices'],
      undefined,
    );
    if (!cupsRange || !practices) return null;
    const isErrorOption = !this.validateOptions();
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          title={t('tools_tab_hydration')}
          headerIcon={<FaucetSvg size={30} />}
          onPressBack={() => this.onPressBack()}
          rightIcon="cloud-upload-alt"
          onPressRight={() => this.onPressSubmit()}
        />
        <MCContent contentContainerStyle={{padding: dySize(20)}}>
          <H4>{t('tools_tab_hydration_question')}</H4>
          <MCView align="center">
            <MCTimeSlider
              width={300}
              onChange={range => this.onChangeHydrationRange(range)}
              value={[cupsRange[0], cupsRange[1]]}
              values={HydrationValues}
              showBottomLabel={false}
            />
          </MCView>
          <H4>{t('tools_tab_hydration_practice_title')}</H4>
          {submitted && isErrorOption && (
            <ErrorText>{t('error_input_select_empty')}</ErrorText>
          )}
          <FlatList
            data={HydrationPracticeOptions}
            renderItem={this._renderItem}
            keyExtractor={item => item}
            numColumns={2}
          />
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  selectedReflection: selector.reflections.getSelectedReflection(state),
  hydration: selector.reflections.findMySpecialReflections(state, 'Hydration'),
  reflectionDraft: state.reflectionReducer.draft,
});

const mapDispatchToProps = {
  selectReflection: reflectionActions.selectReflection,
  setInitialReflection: reflectionActions.setInitialReflection,
  updateSelectedReflection: reflectionActions.updateSelectedReflection,
  addOrUpdateReflection: reflectionActions.addOrUpdateReflection,
  saveReflectionDraft: reflectionActions.saveReflectionDraft,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HydrationScreen),
);
