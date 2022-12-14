import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {MCIcon} from 'components/common';
import {MCView} from 'components/styled/View';
import {H3, H5} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';

class QuirksCard extends React.Component {
  static propTypes = {
    quirks: PropTypes.arrayOf(Object),
    onPressEdit: PropTypes.func,
    editable: PropTypes.bool,
  };

  static defaultProps = {
    editable: true,
    quirks: [],
    onPressEdit: () => undefined,
  };

  render() {
    const {t, quirks, onPressEdit, editable} = this.props;
    return (
      <MCView align="center" mt={30}>
        <MCView row align="center" mb={20}>
          <H3 weight="bold" style={{flex: 1}}>
            {t('profile_subtitle_quirks')}
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

export default withTranslation()(QuirksCard);
