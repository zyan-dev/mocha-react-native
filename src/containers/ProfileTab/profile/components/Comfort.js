import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import {MCIcon} from 'components/common';
import {MCView, MCCard} from 'components/styled/View';
import {H3, H4, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {HandheartSvg} from 'assets/svgs';
import {ComfortingPreferences} from 'utils/constants';

class ComfortCard extends React.Component {
  static propTypes = {
    comfort: PropTypes.array,
    onPressEdit: PropTypes.func,
    editable: PropTypes.bool,
  };

  static defaultProps = {
    editable: true,
    comfort: [],
    onPressEdit: () => undefined,
  };

  render() {
    const {t, theme, comfort, onPressEdit, editable} = this.props;
    const options = _.get(comfort, ['data', 'options'], []);
    return (
      <MCView>
        <MCView row align="center" mb={20}>
          <MCView row align="center" style={{flex: 1}}>
            <H3 weight="bold" mr={10}>
              {t('profile_subtitle_comfort')}
            </H3>
            <HandheartSvg size={20} theme={theme} />
          </MCView>
          {editable && (
            <MCButton onPress={() => onPressEdit()}>
              <MCIcon type="FontAwesome5" name="edit" />
            </MCButton>
          )}
        </MCView>
        {options.length === 0 && (
          <MCCard align="center" width={300}>
            <MCEmptyText>{t('profile_card_empty_comfort')}</MCEmptyText>
          </MCCard>
        )}
        {options.length > 0 && (
          <H4 mr={10}>{t('profile_card_comfort_title')}</H4>
        )}
        <MCView row wrap justify="space-between" width={300}>
          {options.length > 0 &&
            options.map(option => {
              const index = ComfortingPreferences.indexOf(option);
              if (index < 0) return null;
              return (
                <MCView
                  bordered
                  br={10}
                  width={140}
                  height={80}
                  align="center"
                  justify="center"
                  mt={15}
                  ph={10}>
                  <H4 align="center">{t(`tools_tab_comfort_${option}`)}</H4>
                </MCView>
              );
            })}
        </MCView>
      </MCView>
    );
  }
}

export default withTranslation()(ComfortCard);
