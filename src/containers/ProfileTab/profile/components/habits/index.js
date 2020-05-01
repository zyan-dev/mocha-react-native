import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import moment from 'moment';
import {MCCard, MCView} from 'components/styled/View';
import {H3, H4, H5} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCImage} from 'components/common';
import {dySize} from 'utils/responsive';
import {AppleSvg} from 'assets/svgs';
import {CommitColors} from 'utils/constants';
import {
  showAlert,
  getCommitKey,
  getTodayStartDateStamp,
} from 'services/operators';
import DailyHabitScreen from './Daily';
import WeeklyHabitScreen from './Weekly';

class HabitsCard extends React.Component {
  static propTypes = {
    onPressAll: PropTypes.func,
    dailyHabits: PropTypes.arrayOf(Object),
    weeklyHabits: PropTypes.arrayOf(Object),
    commits: PropTypes.arrayOf(Object),
    editable: PropTypes.bool,
    theme: PropTypes.object.isRequired,
  };

  static defaultProps = {
    onPressAll: () => undefined,
    onPressNew: () => undefined,
    dailyHabits: [],
    weeklyHabits: [],
    editable: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      endDate: new Date(),
      tabIndex: 0,
    };
  }

  componentDidMount() {
    this.setEndDate();
  }

  setEndDate = year => {
    const today = new Date();
    const weekEndDate = new Date(
      getTodayStartDateStamp() + 86400 * 1000 * (6 - today.getDay()),
    );
    this.setState({endDate: weekEndDate});
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

  getCommitData = (weekNumberOffset, weekDayOffset) => {
    const {commits} = this.props;
    const {endDate} = this.state;
    const commitDate = new Date(
      endDate.getTime() -
        86400 * 1000 * (6 - weekDayOffset) -
        86400 * 1000 * 7 * weekNumberOffset,
    );
    const commitKey = getCommitKey(commitDate);
    const find = commits.find(commit => commit.date === commitKey);
    const commitNum = find ? find.amount : undefined;
    if (commitNum) {
      let color = 'transparent';
      if (commitNum > 15) color = CommitColors[3];
      else if (commitNum > 10) color = CommitColors[2];
      else if (commitNum > 4) color = CommitColors[1];
      else if (commitNum > 0) color = CommitColors[0];
      return {
        date: commitDate,
        color,
        number: commitNum,
      };
    } else {
      return {
        date: commitDate,
        color: 'transparent',
      };
    }
  };

  onPressCommit = (weekNumberOffset, weekDayOffset) => {
    const {t} = this.props;
    const commitData = this.getCommitData(weekNumberOffset, weekDayOffset);
    const date = moment(commitData.date).format('MMM D');
    if (commitData.number) {
      showAlert(`${date}\n${commitData.number} ${t('commit_number')}`);
    } else {
      showAlert(date);
    }
  };

  render() {
    const {tabIndex} = this.state;
    const {
      t,
      theme,
      onPressAll,
      editable,
      dailyHabits,
      weeklyHabits,
    } = this.props;
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
        <MCView row style={{width: '100%'}} align="center">
          <MCView width={70} row align="center">
            {Array.apply(null, Array(4)).map((i, index) => (
              <MCView
                mr={5}
                width={10}
                height={10}
                br={5}
                background={CommitColors[index]}
              />
            ))}
          </MCView>
          <MCView style={{flex: 1}} />
          <MCView align="center" style={{flex: 1}}>
            <H3>M</H3>
          </MCView>
          <MCView style={{flex: 1}} />
          <MCView align="center" style={{flex: 1}}>
            <H3>W</H3>
          </MCView>
          <MCView style={{flex: 1}} />
          <MCView align="center" style={{flex: 1}}>
            <H3>F</H3>
          </MCView>
          <MCView style={{flex: 1}} />
        </MCView>
        <MCView>
          {Array.apply(null, Array(2)).map((i, index) => {
            return (
              <MCView key={index} row mt={5} align="center" justify="center">
                <MCView width={70}>
                  {index === 0 && <H4>This week</H4>}
                  {index === 1 && <H4>Last week</H4>}
                </MCView>
                {Array.apply(null, Array(7)).map((i, subIndex) => (
                  <MCButton
                    ml={5}
                    mr={5}
                    width={24}
                    height={24}
                    br={5}
                    bordered
                    onPress={() => this.onPressCommit(index, subIndex)}
                    background={this.getCommitData(index, subIndex).color}
                  />
                ))}
              </MCView>
            );
          })}
        </MCView>
        <MCView row mt={20} align="center" justify="space-between" width={300}>
          <MCButton
            width={140}
            bordered
            align="center"
            style={{
              borderColor:
                tabIndex === 0 ? theme.colors.outline : theme.colors.text,
            }}
            onPress={() => this.setState({tabIndex: 0})}>
            <H4
              color={tabIndex === 0 ? theme.colors.outline : theme.colors.text}>
              Daily
            </H4>
          </MCButton>
          <MCButton
            width={140}
            bordered
            align="center"
            style={{
              borderColor:
                tabIndex === 1 ? theme.colors.outline : theme.colors.text,
            }}
            onPress={() => this.setState({tabIndex: 1})}>
            <H4
              color={tabIndex === 1 ? theme.colors.outline : theme.colors.text}>
              Weekly
            </H4>
          </MCButton>
        </MCView>
        {tabIndex === 0 && <DailyHabitScreen dailyHabits={dailyHabits} />}
        {tabIndex === 1 && <WeeklyHabitScreen weeklyHabits={weeklyHabits} />}
      </MCView>
    );
  }
}

export default withTranslation()(HabitsCard);
