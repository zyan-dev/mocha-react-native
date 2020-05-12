import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import {MCIcon} from 'components/common';
import {MCView, MCCard} from 'components/styled/View';
import {H3, H4, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {
  SkullCowSvg,
  HandsheartSvg,
  PaletteSvg,
  CrownSvg,
  BellSvg,
  FlowerSvg,
  HeadSideBrainSvg,
  SortAmountSvg,
  ConnectionSvg,
  UsersSvg,
} from 'assets/svgs';
import {MeaningLifeOptions} from 'utils/constants';

class MeaningLifeCard extends React.Component {
  static propTypes = {
    meaning: PropTypes.array,
    onPressEdit: PropTypes.func,
    editable: PropTypes.bool,
  };

  static defaultProps = {
    editable: true,
    meaning: [],
    onPressEdit: () => undefined,
  };

  render() {
    const {t, theme, meaning, onPressEdit, editable} = this.props;
    const options = _.get(meaning, ['data', 'options'], []);
    return (
      <MCView>
        <MCView row align="center" mb={20}>
          <MCView row align="center" style={{flex: 1}}>
            <H3 weight="bold" mr={10}>
              {t('profile_subtitle_meaning_life')}
            </H3>
            <SkullCowSvg size={25} color={theme.colors.text} />
          </MCView>
          {editable && (
            <MCButton onPress={() => onPressEdit()}>
              <MCIcon type="FontAwesome5" name="edit" />
            </MCButton>
          )}
        </MCView>
        {options.length === 0 && (
          <MCCard align="center" width={300}>
            <MCEmptyText>{t('profile_card_empty_meaning_life')}</MCEmptyText>
          </MCCard>
        )}
        {/* {options.length > 0 && (
          <H4 mr={10}>{t('profile_card_comfort_title')}</H4>
        )} */}
        <MCView row wrap justify="space-between" width={300}>
          {options.length > 0 &&
            options.map(option => {
              const index = MeaningLifeOptions.indexOf(option);
              if (index < 0) return null;
              return (
                <MCView
                  bordered
                  br={10}
                  width={140}
                  align="center"
                  justify="center"
                  mt={15}
                  ph={10}>
                  <MCView height={60} align="center" justify="center">
                    {option === 'friend_family_love' && (
                      <HandsheartSvg size={30} theme={theme} />
                    )}
                    {option === 'creativity' && (
                      <PaletteSvg size={30} theme={theme} />
                    )}
                    {option === 'self-improvement' && (
                      <CrownSvg size={30} theme={theme} />
                    )}
                    {option === 'music' && (
                      <MCIcon type="FontAwesome5Pro" name="music" size={30} />
                    )}
                    {option === 'other_services' && (
                      <BellSvg size={30} color={theme.colors.text} />
                    )}
                    {option === 'connection' && (
                      <ConnectionSvg size={30} color={theme.colors.text} />
                    )}
                    {option === 'belonging' && (
                      <UsersSvg size={40} color={theme.colors.text} />
                    )}
                    {option === 'trancendence' && (
                      <FlowerSvg theme={theme} size={35} />
                    )}
                    {option === 'self-knowledge' && (
                      <HeadSideBrainSvg size={30} theme={theme} />
                    )}
                    {option === 'order' && (
                      <SortAmountSvg size={30} theme={theme} />
                    )}
                  </MCView>
                  <MCView height={40} align="center" justify="center">
                    <H4 align="center">
                      {t(`tools_tab_meaning_life_${option}`)}
                    </H4>
                  </MCView>
                </MCView>
              );
            })}
        </MCView>
      </MCView>
    );
  }
}

export default withTranslation()(MeaningLifeCard);
