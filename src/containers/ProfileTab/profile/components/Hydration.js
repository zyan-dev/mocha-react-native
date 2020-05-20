import React from 'react';
import PropTypes from 'prop-types';
import {FlatList} from 'react-native';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import {MCView} from 'components/styled/View';
import {H3, H4, MCText, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCIcon} from 'components/common';
import {dySize} from 'utils/responsive';
import {HydrationPracticeOptions, HydrationValues} from 'utils/constants';
import {FaucetSvg} from 'assets/svgs';

class HydrationCard extends React.Component {
  static propTypes = {
    hydration: PropTypes.object,
    onPressEdit: PropTypes.func,
    editable: PropTypes.bool,
  };

  static defaultProps = {
    editable: true,
    hydration: {},
    onPressEdit: () => undefined,
  };

  _renderItem = ({index, item}) => {
    const option = item;
    const {t, theme, hydration} = this.props;
    const practices = _.get(hydration, ['data', 'practices'], []);
    const color =
      practices.indexOf(option) > -1 ? theme.colors.outline : theme.colors.text;

    return (
      <MCButton
        bordered
        ml={index % 2 === 1 ? 10 : 0}
        mr={index % 2 === 0 ? 10 : 0}
        mt={15}
        width={140}
        height={90}
        align="center"
        justify="center"
        onPress={() => {}}
        style={{
          borderColor: color,
        }}>
        <H4 color={color} align="center">
          {t(`tools_tab_hydration_${option}`)}
        </H4>
      </MCButton>
    );
  };

  render() {
    const {t, hydration, editable, onPressEdit} = this.props;
    const cups = _.get(hydration, ['data', 'cups_range'], []);
    return (
      <MCView mt={30}>
        <MCView row align="center" mb={20}>
          <MCView row align="center" style={{flex: 1}}>
            <H3 weight="bold" mr={10}>
              {t('profile_subtitle_hydration')}
            </H3>
            <FaucetSvg size={25} />
          </MCView>
          {editable && (
            <MCButton onPress={() => onPressEdit()}>
              <MCIcon type="FontAwesome5" name="edit" />
            </MCButton>
          )}
        </MCView>
        {cups.length === 0 ? (
          <MCButton align="center" style={{width: '100%'}} bordered>
            <MCEmptyText>
              {editable
                ? t('profile_card_empty_hydration')
                : t('profile_card_empty_user_hydration')}
            </MCEmptyText>
          </MCButton>
        ) : (
          <>
            <MCView align="center" style={{width: '100%'}}>
              <MCView bordered br={10} width={200} align="center" pv={20}>
                <MCText weight="bold" style={{fontSize: dySize(50)}}>
                  {`${HydrationValues[cups[0]]} - ${HydrationValues[cups[1]]}`}
                </MCText>
                <H4>{t('profile_card_hydration_cups_title')}</H4>
              </MCView>
            </MCView>
            <H4 mt={20} underline>
              {t('profile_card_hydration_practice_title')}
            </H4>
            <FlatList
              data={HydrationPracticeOptions}
              renderItem={this._renderItem}
              keyExtractor={item => item}
              numColumns={2}
            />
          </>
        )}
      </MCView>
    );
  }
}

export default withTranslation()(HydrationCard);
