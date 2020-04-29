import React from 'react';
import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import {MCCard, MCView} from 'components/styled/View';
import {H3, H4, H5, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCImage, MCModal, MCIcon} from 'components/common';
import {dySize} from 'utils/responsive';
import {AppleSvg} from 'assets/svgs';

class HabitsCard extends React.Component {
  static propTypes = {
    onPressAll: PropTypes.func,
    dailyHabits: PropTypes.arrayOf(Object),
    weeklyHabits: PropTypes.arrayOf(Object),
    editable: PropTypes.bool,
  };

  static defaultProps = {
    onPressAll: () => undefined,
    onPressNew: () => undefined,
    dailyHabits: [],
    weeklyHabits: [],
    editable: true,
  };

  _renderHabitItem = ({item}) => {
    const habit = item.data;
    return (
      <MCCard key={item._id} width={300} mb={10} align="center">
        <MCButton align="center" row onPress={() => this.onPressItem(habit)}>
          <H4 style={{flex: 1}} numberOfLines={1}>
            {habit.title}
          </H4>
          <MCView row align="center" ml={30} overflow="visible">
            {habit.collaborators.map(user => (
              <MCImage
                key={user._id}
                image={{uri: user.avatar}}
                round
                width={30}
                height={30}
                style={{marginLeft: dySize(-20)}}
              />
            ))}
          </MCView>
        </MCButton>
      </MCCard>
    );
  };

  render() {
    const {t, dailyHabits, weeklyHabits, onPressAll, editable} = this.props;
    return (
      <MCView align="center">
        <MCView row align="center" mb={20}>
          <MCView row align="center" style={{flex: 1}}>
            <H3 weight="bold" mr={10}>
              {t('profile_card_habit')}
            </H3>
            <AppleSvg size={25} />
          </MCView>
          {editable && (
            <MCButton onPress={() => onPressAll()}>
              <H5 underline>{t('view_all')}</H5>
            </MCButton>
          )}
        </MCView>
      </MCView>
    );
  }
}

export default withTranslation()(HabitsCard);
