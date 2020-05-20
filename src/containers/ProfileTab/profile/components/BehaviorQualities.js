import React from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import {withTranslation} from 'react-i18next';
import {MCCard, MCView} from 'components/styled/View';
import {H3, H4, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCIcon} from 'components/common';
import {MedalSvg} from 'assets/svgs';

class QualitiesBehaviorCard extends React.Component {
  static propTypes = {
    onPressEdit: PropTypes.func,
    editable: PropTypes.bool,
    qualities: PropTypes.object,
  };

  static defaultProps = {
    onPressEdit: () => undefined,
    qualities: {},
    editable: true,
  };

  render() {
    const {t, theme, qualities, editable, onPressEdit} = this.props;
    const options = _.get(qualities, ['data', 'bookmarked'], []);
    return (
      <MCView mt={30}>
        <MCView row align="center" mb={20}>
          <MCView row align="center" style={{flex: 1}}>
            <H3 weight="bold" mr={10}>
              {t('profile_subtitle_qualities_character')}
            </H3>
            <MedalSvg theme={theme} size={25} />
          </MCView>
          {editable && (
            <MCButton onPress={() => onPressEdit()}>
              <MCIcon type="FontAwesome5" name="edit" />
            </MCButton>
          )}
        </MCView>
        {options.length === 0 && (
          <MCCard align="center" width={300}>
            <MCEmptyText>
              {t('profile_card_empty_qualities_behavior')}
            </MCEmptyText>
          </MCCard>
        )}
        {options.length > 0 && (
          <H4 mr={10}>{t('profile_card_qualities_character_description')}</H4>
        )}
        {options.length > 0 &&
          options.map(option => {
            return (
              <MCView
                bordered
                br={10}
                width={280}
                height={50}
                align="center"
                justify="center"
                mt={15}
                ml={10}
                ph={10}>
                <H4 align="center">{t(`tools_tab_behavior_${option}`)}</H4>
              </MCView>
            );
          })}
      </MCView>
    );
  }
}

export default withTranslation()(QualitiesBehaviorCard);
