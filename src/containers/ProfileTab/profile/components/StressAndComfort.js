import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {MCIcon} from 'components/common';
import {MCView} from 'components/styled/View';
import {H3, H4, H5} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';

class StressAndComfortCard extends React.Component {
  static propTypes = {
    stress: PropTypes.arrayOf(Object),
    onPressEdit: PropTypes.func,
    editable: PropTypes.bool,
  };

  static defaultProps = {
    editable: true,
    stress: [],
    onPressEdit: () => undefined,
  };

  render() {
    const {t, stress, onPressEdit, editable} = this.props;
    return (
      <MCView align="center">
        <MCView row align="center" mb={20}>
          <H3 weight="bold" style={{flex: 1}}>
            {t('profile_card_stress_and_comfort')}
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

export default withTranslation()(StressAndComfortCard);
