import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import styled from 'styled-components';
import CheckBox from 'react-native-check-box';
import {MCView, MCCard} from 'components/styled/View';
import {MCImage} from 'components/common';
import {H3, H4, MCEmptyText} from 'components/styled/Text';
import {dySize} from 'utils/responsive';

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

class WeeklyHabitScreen extends React.Component {
  static propTypes = {
    weeklyHabits: PropTypes.arrayOf(Object),
  };

  static defaultProps = {
    weeklyHabits: [],
  };

  _renderItem = item => {
    const {theme} = this.props;
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
      <MCView width={300} bordered br={10} align="center" mb={10}>
        <MCCard shadow br={1} row align="center">
          <H4 style={{flex: 1}} align="center">
            {title}
          </H4>
        </MCCard>
        {habits.map((habit, index) => (
          <CheckBox
            key={index}
            style={{width: dySize(280), marginTop: 10}}
            isChecked={habit.completed}
            onClick={() => {}}
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
            {collaborators &&
              collaborators.map(user => (
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
        </MCView>
        <MCView row wrap align="center" width={280}>
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
    const {t, weeklyHabits} = this.props;
    return (
      <MCView mt={20}>
        {weeklyHabits.length === 0 && (
          <MCEmptyText>{t('no_result')}</MCEmptyText>
        )}
        {weeklyHabits.map(item => {
          return this._renderItem(item);
        })}
      </MCView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
});

const mapDispatchToProps = {};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(WeeklyHabitScreen),
);
