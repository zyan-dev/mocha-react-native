import React from 'react';
import PropTypes from 'prop-types';
import {FlatList} from 'react-native';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import {MCView} from 'components/styled/View';
import {H3, H4} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCIcon} from 'components/common';
import {KeySvg} from 'assets/svgs';

class CoreValuesCard extends React.Component {
  static propTypes = {
    coreValues: PropTypes.object,
    onPressEdit: PropTypes.func,
    editable: PropTypes.bool,
  };

  static defaultProps = {
    editable: true,
    coreValues: {},
    onPressEdit: () => undefined,
  };

  render() {
    const {t, coreValues, editable, onPressEdit} = this.props;
    const selected = _.get(coreValues, ['data', 'selected'], []);
    const core = _.get(coreValues, ['data', 'core'], []);
    return (
      <MCView>
        <MCView row align="center" mb={20}>
          <MCView row align="center" style={{flex: 1}}>
            <H3 weight="bold" mr={10}>
              {t('tools_tab_core_values')}
            </H3>
            <KeySvg theme={theme} size={25} />
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

export default withTranslation()(CoreValuesCard);
