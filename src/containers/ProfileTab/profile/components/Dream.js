import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import {MCView} from 'components/styled/View';
import {H3, H4} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCIcon} from 'components/common';
import FutureSvg from '../../../../assets/svgs/Future';

class DreamCard extends React.Component {
  static propTypes = {
    dream: PropTypes.object,
    onPressEdit: PropTypes.func,
    editable: PropTypes.bool,
  };

  static defaultProps = {
    editable: true,
    dream: {},
    onPressEdit: () => undefined,
  };

  render() {
    const {t, dream, editable, onPressEdit} = this.props;
    const main = _.get(dream, ['data', 'main'], '');
    const others = _.get(dream, ['data', 'others'], []);
    return (
      <MCView mt={30}>
        <MCView row align="center" mb={20}>
          <MCView row align="center" style={{flex: 1}}>
            <H3 weight="bold" mr={10}>
              {t('profile_subtitle_dreams')}
            </H3>
            <FutureSvg size={25} />
          </MCView>
          {editable && (
            <MCButton onPress={() => onPressEdit()}>
              <MCIcon type="FontAwesome5" name="edit" />
            </MCButton>
          )}
        </MCView>
        <H4 underline>{t('profile_card_dream_future_title')}</H4>
        <H4 ml={10}>{main}</H4>
        <MCView mt={30} row align="center">
          <H4 underline>{t('profile_card_dream_bucket_title')}</H4>
          <MCIcon type="FontAwesome5Pro" name="island-tropical" />
        </MCView>
        {others.map(list => (
          <MCView row align="center">
            <H4>🔹</H4>
            <H4>{list}</H4>
          </MCView>
        ))}
      </MCView>
    );
  }
}

export default withTranslation()(DreamCard);
