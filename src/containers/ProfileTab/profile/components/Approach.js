import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {MCView} from 'components/styled/View';
import {H3, H4, H5, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';

class ApproachCard extends React.Component {
  static propTypes = {
    approach: PropTypes.arrayOf(Object),
    onPressEdit: PropTypes.func,
    editable: PropTypes.bool,
  };

  static defaultProps = {
    editable: true,
    approach: [],
    onPressEdit: () => undefined,
  };

  render() {
    const {t, approach, onPressEdit, editable} = this.props;
    return (
      <MCView align="center">
        <MCView row align="center" mb={20}>
          <H3 weight="bold" style={{flex: 1}}>
            {t('profile_card_approach')}
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

export default withTranslation()(ApproachCard);
