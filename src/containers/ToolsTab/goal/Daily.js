import React from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {withTranslation} from 'react-i18next';
import CheckBox from 'react-native-check-box';
import {reflectionActions, userActions, otherActions} from 'Redux/actions';
import {selector} from 'Redux/selectors';
import {MCRootView, MCView, MCCard} from 'components/styled/View';
import {MCImage} from 'components/common';
import {H3, H4, MCEmptyText, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
import {getCommitKey} from '../../../services/operators';

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

class DailyObjectiveScreen extends React.Component {
  onPressEdit = item => {
    this.props.selectReflection(item);
    this.props.setSeletedUsers(item.data.collaborators);
    NavigationService.navigate('EditObjective');
  };

  onToggleCheck = (objective, measure) => {
    if (this.props.isShowingUserObjective) return;
    this.props.selectReflection(objective);
    const updated = objective.data.measures.map(i => {
      if (i.title === measure.title) {
        return {
          title: measure.title,
          completed: measure.completed ? undefined : new Date().getTime(),
        };
      } else {
        return i;
      }
    });
    this.props.updateSelectedReflection({measures: updated});
    this.props.addOrUpdateReflection('');
    this.props.updateAnalyzeStatus({
      data: [
        {
          date: getCommitKey(measure.completed || new Date().getTime()),
          amount: measure.completed ? -1 : 1,
        },
      ],
    });
  };

  _renderItem = ({item}) => {
    const {theme, isShowingUserObjective} = this.props;
    const {
      title,
      measures,
      collaborators,
      love,
      nudge,
      strong,
      cheer,
      congrats,
      crown,
    } = item.data;
    const incompleted = measures.filter(measure => !measure.completed);
    return (
      <MCView width={350} bordered br={10} align="center" mb={10}>
        <MCCard shadow br={1} row align="center">
          <H4 style={{flex: 1}} align="center">
            {title}
          </H4>
        </MCCard>
        {measures.map((measure, index) => (
          <CheckBox
            key={index}
            style={{width: dySize(330), marginTop: 10}}
            onClick={() => this.onToggleCheck(item, measure)}
            isChecked={measure.completed}
            leftText={measure.title}
            leftTextStyle={{
              color: theme.colors.text,
              fontSize: theme.base.FONT_SIZE_LARGE,
              fontFamily: 'Raleway-Regular',
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
          {!isShowingUserObjective && (
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
      isShowingUserObjective,
      myDailyObjectives,
      userDailyObjectives,
    } = this.props;
    return (
      <MCRootView justify="flex-start" align="flex-start">
        <FlatList
          contentContainerStyle={{
            width: dySize(375),
            alignItems: 'center',
            paddingVertical: 20,
          }}
          data={
            isShowingUserObjective ? userDailyObjectives : myDailyObjectives
          }
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
  isShowingUserObjective: state.otherReducer.isShowingUserObjective,
  myDailyObjectives: selector.reflections
    .getMySpecialReflections(state, 'Objective')
    .filter(({data}) => data.isDaily),
  userDailyObjectives: selector.reflections
    .getUserSpecialReflections(state, 'Objective')
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
  )(DailyObjectiveScreen),
);
