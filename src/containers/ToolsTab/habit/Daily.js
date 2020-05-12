import React from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {withTranslation} from 'react-i18next';
import CheckBox from 'react-native-check-box';
import {reflectionActions, userActions, otherActions} from 'Redux/actions';
import {selector} from 'Redux/selectors';
import {MCRootView, MCView, MCCard} from 'components/styled/View';
import {MCImage, MCIcon} from 'components/common';
import {H3, H4, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
import {getCommitKey} from 'services/operators';

const ReactionView = styled(MCView)`
  display: flex;
  flex-direction: row;
  height: 40px;
  border-radius: 20px;
  margin-right: 10px;
  margin-bottom: 10px;
  padding-horizontal: 10px;
  background-color: ${props => props.theme.colors.card};
`;

class DailyHabitScreen extends React.Component {
  onPressEdit = item => {
    this.props.selectReflection(item);
    this.props.setSeletedUsers(item.data.collaborators);
    NavigationService.navigate('EditHabit');
  };

  onToggleCheck = (habit, item) => {
    if (this.props.isShowingUserHabit) return;
    this.props.selectReflection(habit);
    const updated = habit.data.habits.map(i => {
      if (i.title === item.title) {
        return {
          title: item.title,
          completed: item.completed ? undefined : new Date().getTime(),
        };
      } else {
        return i;
      }
    });
    this.props.updateSelectedReflection({habits: updated});
    this.props.addOrUpdateReflection('');
    this.props.updateAnalyzeStatus({
      data: [
        {
          date: getCommitKey(item.completed || new Date().getTime()),
          amount: item.completed ? -1 : 1,
        },
      ],
    });
  };

  _renderItem = ({item}) => {
    const {theme, isShowingUserHabit} = this.props;
    const {
      title,
      habits,
      collaborators,
      love,
      nudge,
      strong,
      cheer,
      congrats,
      crown,
    } = item.data;
    return (
      <MCView width={350} bordered br={10} align="center" mb={10}>
        <MCCard shadow br={1} row align="center">
          <H4 style={{flex: 1}} align="center">
            {title}
          </H4>
        </MCCard>
        {habits.map((habit, index) => (
          <CheckBox
            key={index}
            style={{width: dySize(330), marginTop: 10}}
            onClick={() => this.onToggleCheck(item, habit)}
            isChecked={habit.completed}
            leftText={habit.title}
            leftTextStyle={{
              color: theme.colors.text,
              fontSize: theme.base.FONT_SIZE_LARGE,
              fontFamily: 'ProximaNova-Regular',
            }}
            checkBoxColor={theme.colors.text}
          />
        ))}
        <MCView row align="center" mt={10} mb={10}>
          <MCView
            row
            align="center"
            style={{flex: 1}}
            ml={30}
            overflow="visible">
            {collaborators.map(user => (
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
          {!isShowingUserHabit && (
            <MCView row align="center" justify="flex-end" style={{flex: 1}}>
              <MCButton onPress={() => this.onPressEdit(item)}>
                <MCIcon name="ios-create" />
              </MCButton>
            </MCView>
          )}
        </MCView>
        <MCView row wrap align="center" width={330}>
          {love > 0 && (
            <ReactionView>
              <H3>❤</H3>
              <H3 ml={10}>{love}</H3>
            </ReactionView>
          )}
          {nudge > 0 && (
            <ReactionView>
              <H3>👉</H3>
              <H3 ml={10}>{nudge}</H3>
            </ReactionView>
          )}
          {strong > 0 && (
            <ReactionView>
              <H3>💪</H3>
              <H3 ml={10}>{strong}</H3>
            </ReactionView>
          )}
          {cheer > 0 && (
            <ReactionView>
              <H3>👏</H3>
              <H3 ml={10}>{cheer}</H3>
            </ReactionView>
          )}
          {congrats > 0 && (
            <ReactionView>
              <H3>🏆</H3>
              <H3 ml={10}>{congrats}</H3>
            </ReactionView>
          )}
          {crown > 0 && (
            <ReactionView>
              <H3>👑</H3>
              <H3 ml={10}>{crown}</H3>
            </ReactionView>
          )}
        </MCView>
      </MCView>
    );
  };

  render() {
    const {
      t,
      theme,
      isShowingUserHabit,
      myDailyHabits,
      userDailyHabits,
    } = this.props;
    return (
      <MCRootView justify="flex-start" align="flex-start">
        <FlatList
          contentContainerStyle={{
            width: dySize(375),
            alignItems: 'center',
            paddingVertical: 20,
          }}
          data={isShowingUserHabit ? userDailyHabits : myDailyHabits}
          renderItem={this._renderItem}
          keyExtractor={item => item._id}
          ListEmptyComponent={<MCEmptyText>{t('no_result')}</MCEmptyText>}
        />
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  isShowingUserHabit: state.otherReducer.isShowingUserHabit,
  myDailyHabits: selector.reflections
    .getMySpecialReflections(state, 'Habit')
    .filter(({data}) => data.isDaily),
  userDailyHabits: selector.reflections
    .getUserSpecialReflections(state, 'Habit')
    .filter(({data}) => data.isDaily),
});

const mapDispatchToProps = {
  setInitialReflection: reflectionActions.setInitialReflection,
  selectReflection: reflectionActions.selectReflection,
  updateSelectedReflection: reflectionActions.updateSelectedReflection,
  addOrUpdateReflection: reflectionActions.addOrUpdateReflection,
  setSeletedUsers: userActions.setSeletedUsers,
  updateAnalyzeStatus: otherActions.updateAnalyzeStatus,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(DailyHabitScreen),
);
