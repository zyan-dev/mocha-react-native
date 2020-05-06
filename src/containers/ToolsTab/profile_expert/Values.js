import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import i18next from 'i18next';
import {selector} from 'Redux/selectors';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {H4, H5} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCHeader, MCIcon, MCImage} from 'components/common';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
import {KeySvg} from 'assets/svgs';
import {getStringWithOutline} from 'services/operators';
import {ValueCardBackgrounds, ValueCardTextColor} from 'utils/constants';

class PersonalizeValueScreen extends React.Component {
  title = {
    title: i18next.t('tools_tab_personalize_core_value_title', {
      bold: i18next.t('outline_core_values'),
    }),
    boldWordKeys: ['core_values'],
  };

  resetTitle = {
    title: i18next.t('tools_tab_reset_core_value_title', {
      bold: i18next.t('outline_core_values'),
    }),
    boldWordKeys: ['core_values'],
  };

  resetButtonTitle = {
    title: i18next.t('tools_tab_reset_core_value_button', {
      bold: i18next.t('outline_core_values'),
    }),
    boldWordKeys: ['core_values'],
  };

  onPressCoreItem = value => {
    NavigationService.navigate('PE_ValueStory', {value});
  };

  renderCoreValueCard = (value, index) => {
    const {t, theme} = this.props;
    return (
      <MCButton
        key={value.value + theme.colors.theme_name}
        mb={15}
        onPress={() => this.onPressCoreItem(value)}
        style={{
          width: dySize(160),
          height: dySize(220),
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: 'white',
          backgroundColor: ValueCardBackgrounds[index % 3],
          borderRadius: 10,
          borderWidth: dySize(6),
          padding: dySize(5),
        }}>
        <H4 weight="bold" align="center" color={ValueCardTextColor}>
          {t(`tools_tab_value_${value.value}`)}
        </H4>
        <MCView style={{flex: 1}} align="center" justify="center">
          {value.image && (
            <MCImage
              image={value.image}
              width={dySize(125)}
              height={dySize(100)}
              resizeMode="contain"
            />
          )}
          {value.icon && (
            <MCIcon
              type="FontAwesome5"
              name={value.icon}
              size={50}
              color={ValueCardTextColor}
            />
          )}
        </MCView>
        <H5
          align="center"
          style={{letterSpacing: 5}}
          color={ValueCardTextColor}>
          {t(`value_name_${value.name}`).toUpperCase()}
        </H5>
      </MCButton>
    );
  };

  render() {
    const {t, theme, coreValues} = this.props;
    const core = _.get(coreValues, ['data', 'core'], []);
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          title={t('tools_tab_discover_your_values')}
          headerIcon={<KeySvg theme={theme} size={25} />}
          rightIcon="cloud-upload-alt"
          onPressRight={() => this.onPressSubmit()}
        />
        <MCContent
          contentContainerStyle={{padding: dySize(20), alignItems: 'center'}}>
          {getStringWithOutline(this.title, {align: 'left'})}
          <MCView row wrap justify="space-between" mt={20}>
            {core.map((item, index) => {
              return this.renderCoreValueCard(item, index);
            })}
          </MCView>
          {getStringWithOutline(this.resetTitle)}
          <MCButton
            bordered
            width={250}
            onPress={() => NavigationService.navigate('PE_CoreValues')}>
            {getStringWithOutline(this.resetButtonTitle)}
          </MCButton>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  coreValues: selector.reflections.findMySpecialReflections(
    state,
    'CoreValues',
  ),
});

export default withTranslation()(
  connect(
    mapStateToProps,
    undefined,
  )(PersonalizeValueScreen),
);
