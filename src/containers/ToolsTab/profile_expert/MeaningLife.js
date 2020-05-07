import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import {selector} from 'Redux/selectors';
import {reflectionActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {H3, H4, ErrorText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCHeader, MCIcon} from 'components/common';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
import {MeaningLifeOptions} from 'utils/constants';
import {
  SkullCowSvg,
  HandsheartSvg,
  PaletteSvg,
  CrownSvg,
  BellSvg,
  FlowerSvg,
  HeadSideBrainSvg,
  SortAmountSvg,
  ConnectionSvg,
} from 'assets/svgs';

class MeaningLifeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };
  }

  isNew = false;
  componentWillMount() {
    const {
      meaning,
      selectReflection,
      setInitialReflection,
      reflectionDraft,
    } = this.props;
    if (meaning) {
      selectReflection(meaning);
    } else {
      this.isNew = true;
      if (reflectionDraft['MeaningLife']) {
        selectReflection(reflectionDraft['MeaningLife']);
      } else {
        setInitialReflection('meaning_life');
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

  onPressItem = key => {
    const {
      selectedReflection: {
        data: {options},
      },
      updateSelectedReflection,
    } = this.props;
    const index = options.indexOf(key);
    if (index < 0) options.push(key);
    else options.splice(index, 1);
    updateSelectedReflection({options});
  };

  onPressSubmit = () => {
    this.setState({submitted: true});
    if (!this.validateOptions()) return;
    this.props.addOrUpdateReflection();
  };

  validateOptions = () => {
    const {selectedReflection} = this.props;
    const options = _.get(selectedReflection, ['data', 'options'], []);
    return options.length > 0;
  };

  render() {
    const {submitted, newItem} = this.state;
    const {t, theme, selectedReflection, updateSelectedReflection} = this.props;
    if (!selectedReflection || !selectedReflection.data) return null;
    const options = _.get(selectedReflection, ['data', 'options'], []);
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          title={t('tools_tab_meaning_of_life')}
          headerIcon={<SkullCowSvg color={theme.colors.text} size={25} />}
          onPressBack={() => this.onPressBack()}
          rightIcon="cloud-upload-alt"
          onPressRight={() => this.onPressSubmit()}
        />
        <MCContent contentContainerStyle={{padding: dySize(20)}}>
          <H4>{t('tools_tab_meaning_life_question')}</H4>
          <H4 weight="italic">{t(`select_all_that_apply`)}</H4>
          {!this.validateOptions() && submitted && (
            <ErrorText>{t('error_input_select_empty')}</ErrorText>
          )}
          <MCView row wrap justify="space-between" mt={20}>
            {MeaningLifeOptions.map(key => {
              const selected = options.indexOf(key) > -1;
              return (
                <MCButton
                  key={key}
                  bordered
                  width={160}
                  height={100}
                  br={6}
                  mb={10}
                  align="center"
                  justify="center"
                  style={{
                    borderColor: !selected
                      ? theme.colors.border
                      : theme.colors.outline,
                  }}
                  onPress={() => this.onPressItem(key)}>
                  <MCView style={{flex: 1}} align="center" justify="center">
                    {key === 'friend_family_love' && (
                      <HandsheartSvg size={30} theme={theme} />
                    )}
                    {key === 'creativity' && (
                      <PaletteSvg size={30} theme={theme} />
                    )}
                    {key === 'self-improvement' && (
                      <CrownSvg size={30} theme={theme} />
                    )}
                    {key === 'music' && (
                      <MCIcon type="FontAwesome5Pro" name="music" size={30} />
                    )}
                    {key === 'other_services' && (
                      <BellSvg size={30} color={theme.colors.text} />
                    )}
                    {key === 'connection' && (
                      <ConnectionSvg size={30} color={theme.colors.text} />
                    )}
                    {key === 'belonging' && (
                      <MCIcon type="FontAwesome5Pro" name="users" size={30} />
                    )}
                    {key === 'trancendence' && <FlowerSvg size={35} />}
                    {key === 'self-knowledge' && (
                      <HeadSideBrainSvg size={30} theme={theme} />
                    )}
                    {key === 'order' && (
                      <SortAmountSvg size={30} theme={theme} />
                    )}
                  </MCView>
                  <MCView
                    height={50}
                    width={100}
                    align="center"
                    justify="center">
                    <H4 weight={!selected ? 'regular' : 'bold'} align="center">
                      {t(`tools_tab_meaning_life_${key}`)}
                    </H4>
                  </MCView>
                </MCButton>
              );
            })}
          </MCView>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  selectedReflection: selector.reflections.getSelectedReflection(state),
  meaning: selector.reflections.findMySpecialReflections(state, 'MeaningLife'),
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
  )(MeaningLifeScreen),
);
