import React from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
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

class DailyObjectiveScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressEdit = (item) => {
    this.props.selectReflection(item);
    this.props.setSeletedUsers(item.data.collaborators);
    NavigationService.navigate('EditObjective');
  };

  onToggleCheck = (objective, measure) => {
    if (this.props.isShowingUserObjective) return;
    this.props.selectReflection(objective);
    const updated = objective.data.measures.map((i) => {
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
    this.props.addOrUpdateReflection(false);
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
    const {title, measures, collaborators} = item.data;
    return (
      <MCView width={350} bordered br={10} align="center" mb={10}>
        <MCCard shadow br={1} row align="center">
          <H4 style={{flex: 1}} align="center">
            {title}
          </H4>
        </MCCard>
        {measures.map((measure) => (
          <CheckBox
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
            {collaborators.map((user) => (
              <MCImage
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
      </MCView>
    );
  };

  render() {
    const {
      t,
      isShowingUserObjective,
      dailyObjectives,
      userDailyObjectives,
    } = this.props;
    return (
      <MCRootView justify="flex-start">
        <FlatList
          contentContainerStyle={{
            width: dySize(375),
            paddingTop: 20,
            alignItems: 'center',
          }}
          data={isShowingUserObjective ? userDailyObjectives : dailyObjectives}
          renderItem={this._renderItem}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={<MCEmptyText>{t('no_result')}</MCEmptyText>}
        />
      </MCRootView>
    );
  }
}

const mapStateToProps = (state) => ({
  theme: state.routerReducer.theme,
  isShowingUserObjective: state.otherReducer.isShowingUserObjective,
  dailyObjectives: selector.reflections.getMyDailyObjectives(state),
  userDailyObjectives: selector.reflections.getUserDailyObjectives(state),
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
  connect(mapStateToProps, mapDispatchToProps)(DailyObjectiveScreen),
);
