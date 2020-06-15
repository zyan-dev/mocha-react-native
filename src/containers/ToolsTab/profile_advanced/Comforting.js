import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import i18next from 'i18next';

import {selector} from 'Redux/selectors';
import {reflectionActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {H3, H4, ErrorText, MCTextInput} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCHeader, MCIcon} from 'components/common';
import NavigationService from 'navigation/NavigationService';
import {HandheartSvg} from 'assets/svgs';
import {getStringWithOutline} from 'services/operators';
import {ComfortingPreferences} from 'utils/constants';
import {dySize} from 'utils/responsive';

class ComfortingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };
  }

  isNew = false;

  description = {
    title: i18next.t('tools_tab_comfort_description', {
      bold: i18next.t('outline_comfort_people'),
    }),
    boldWordKeys: ['comfort_people'],
  };

  componentWillMount() {
    const {
      comfort,
      selectReflection,
      setInitialReflection,
      reflectionDraft,
    } = this.props;
    if (comfort) {
      selectReflection(comfort);
    } else {
      this.isNew = true;
      if (reflectionDraft['Comfort']) {
        selectReflection(reflectionDraft['Comfort']);
      } else {
        setInitialReflection('comfort');
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
    const {submitted} = this.state;
    const {t, theme, selectedReflection} = this.props;
    if (
      !selectedReflection ||
      !selectedReflection.data ||
      selectedReflection.type !== 'Comfort'
    )
      return null;
    const options = _.get(selectedReflection, ['data', 'options'], []);

    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          title={t('tools_tab_comfort')}
          headerIcon={<HandheartSvg theme={theme} size={25} />}
          onPressBack={() => this.onPressBack()}
          rightIcon="cloud-upload-alt"
          rightText={t('button_save')}
          rightIconColor={theme.colors.outline}
          onPressRight={() => this.onPressSubmit()}
        />
        <MCContent contentContainerStyle={{padding: dySize(20)}}>
          {getStringWithOutline(this.description, {align: 'left'})}
          <H4>{t('select_all_that_apply')}</H4>
          {!this.validateOptions() && submitted && (
            <ErrorText>{t('error_input_select_empty')}</ErrorText>
          )}
          <MCView row wrap justify="space-between" mt={20}>
            {ComfortingPreferences.map(key => {
              const selected = options.indexOf(key) > -1;
              return (
                <MCButton
                  key={key}
                  bordered
                  width={key === 'alone' ? 335 : 160}
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
                  <H3
                    weight={!selected ? 'regular' : 'bold'}
                    align="center"
                    color={
                      !selected ? theme.colors.text : theme.colors.outline
                    }>
                    {t(`tools_tab_comfort_${key}`)}
                  </H3>
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
  comfort: selector.reflections.findMySpecialReflections(state, 'Comfort'),
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
  )(ComfortingScreen),
);
