import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {MCIcon} from 'components/common';
import {MCView} from 'components/styled/View';
import {H3, H5} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';

class RiskToleranceCard extends React.Component {
  static propTypes = {
    risks: PropTypes.arrayOf(Object),
    onPressEdit: PropTypes.func,
    editable: PropTypes.bool,
  };

  static defaultProps = {
    editable: true,
    risks: [],
    onPressEdit: () => undefined,
  };

  render() {
    const {t, risks, onPressEdit, editable} = this.props;
    return (
      <MCView align="center">
        <MCView row align="center" mb={20}>
          <H3 weight="bold" style={{flex: 1}}>
            {t('profile_subtitle_risks')}
          </H3>
          {editable && (
            <MCButton onPress={() => onPressEdit()}>
              <MCIcon type="FontAwesome5" name="edit" />
            </MCButton>
          )}
        </MCView>
        <H5>{t('coming soon')}</H5>
      </MCView>
    );
  }
}

export default withTranslation()(RiskToleranceCard);
