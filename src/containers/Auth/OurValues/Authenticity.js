import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import i18next from 'i18next';
import {MCContent, MCView} from 'components/styled/View';
import {H3, H4} from 'components/styled/Text';
import {dySize} from 'utils/responsive';
import {getStringWithOutline} from 'services/operators';

class AuthenticityScreen extends React.PureComponent {
  Guide1 = {
    title: i18next.t('welcome_values_authenticity_guide_1', {
      bold: i18next.t('outline_assert'),
    }),
    boldWordKeys: ['assert'],
  };
  Guide2 = {
    title: i18next.t('welcome_values_authenticity_guide_2', {
      bold1: i18next.t('outline_trust'),
      bold2: i18next.t('outline_courage'),
    }),
    boldWordKeys: ['trust', 'courage'],
  };
  render() {
    const {t, theme} = this.props;
    return (
      <MCContent
        contentContainerStyle={{alignItems: 'center'}}
        style={{marginBottom: dySize(140)}}>
        <MCView
          bordered
          mt={60}
          br={20}
          ph={20}
          height={50}
          style={{borderColor: theme.colors.outline}}
          align="center"
          justify="center">
          <H3 weight="bold" color={theme.colors.outline}>
            {t('welcome_values_authenticity')}
          </H3>
        </MCView>
        <H4
          weight="italic"
          width={250}
          mt={30}
          mb={60}
          align="center"
          style={{lineHeight: dySize(24)}}>
          {t('welcome_values_authenticity_title')}
        </H4>
        <H4 weight="bold" underline>
          {t('welcome_values_guidelines', {
            category: t('welcome_values_authenticity'),
          })}
        </H4>
        <MCView width={250} align="center">
          {getStringWithOutline(this.Guide1)}
          {getStringWithOutline(this.Guide2)}
        </MCView>
      </MCContent>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
});

export default withTranslation()(
  connect(
    mapStateToProps,
    undefined,
  )(AuthenticityScreen),
);
