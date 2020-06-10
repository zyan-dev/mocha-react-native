import React from 'react';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import CheckBox from 'react-native-check-box';
import {FlatList} from 'react-native-gesture-handler';
import * as _ from 'lodash';
import {selector} from 'Redux/selectors';
import {reflectionActions, userActions, otherActions} from 'Redux/actions';
import {
  MCHeader,
  MCEditableText,
  MCImage,
  MCTextFormInput,
  MCPicker,
  MCIcon,
} from 'components/common';
import {MCView, MCRootView, MCContent, MCCard} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {H3, H4, ErrorText} from 'components/styled/Text';
import {getUpdatedHabits} from 'services/operators';
import NavigationService from 'navigation/NavigationService';
import {dySize} from 'utils/responsive';
import {AppleSvg} from 'assets/svgs';

class EditHabitScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      newHabitTitle: '',
      origin: {},
      submitted: false,
    };
  }

  componentDidMount() {
    const {reflectionDraft, selectReflection, selectedReflection} = this.props;
    this.setState({origin: selectedReflection});
    // Don't load saved draft on edit screen
    if (!selectedReflection._id && reflectionDraft['Habit']) {
      selectReflection(reflectionDraft['Habit']);
    }
  }

  onPressRight = () => {
    const {
      selectedUsers,
      updateSelectedReflection,
      selectedReflection: {
        data: {habits},
      },
    } = this.props;
    const {newHabitTitle} = this.state;
    this.setState({submitted: true});
    if (!this.validateTitle()) return;
    if (!this.validateHabits()) return;
    updateSelectedReflection({
      collaborators: selectedUsers.map(user => _.pick(user, ['_id'])),
      habits:
        newHabitTitle.length > 0
          ? habits.concat([{title: newHabitTitle}])
          : habits,
    });
    this.setState({newHabitTitle: ''});
    this.updateCommitHistory();
    setTimeout(() => {
      this.props.addOrUpdateReflection();
      this.props.saveReflectionDraft({Habit: undefined});
    });
  };

  updateCommitHistory = () => {
    const {
      selectedReflection: {
        data: {habits},
      },
    } = this.props;
    const {origin} = this.state;
    const updatedHabits = getUpdatedHabits(habits, origin);
    if (Object.keys(updatedHabits).length > 0) {
      const param = Object.keys(updatedHabits).map(key => ({
        date: key,
        amount: updatedHabits[key],
      }));
      this.props.updateAnalyzeStatus({data: param});
    }
  };

  onToggleCheck = habit => {
    const {
      updateSelectedReflection,
      selectedReflection: {
        data: {habits},
      },
    } = this.props;
    const updated = habits.map(item => {
      if (item.title === habit.title) {
        return {
          ...habit,
          completed: habit.completed ? undefined : new Date().getTime(),
        };
      } else {
        return item;
      }
    });
    updateSelectedReflection({habits: updated});
  };

  onPressCollaborator = user => {
    NavigationService.navigate('UserProfile', {id: user._id});
  };

  onRemoveHabit = habit => {
    const {
      selectedReflection: {
        data: {habits},
      },
    } = this.props;
    const filtered = habits.filter(item => item.title !== habit.title);
    this.props.updateSelectedReflection({habits: filtered});
  };

  onChangeHabit = (index, text) => {
    const {
      selectedReflection: {
        data: {habits},
      },
    } = this.props;
    habits[index] = {
      ...habits[index],
      title: text,
    };
    this.props.updateSelectedReflection({habits});
  };

  addNewHabit = title => {
    const {
      selectedReflection: {
        data: {habits},
      },
    } = this.props;
    if (title.length === 0) return;
    habits.push({title, completed: undefined});
    this.props.updateSelectedReflection({habits});
    this.setState({newHabitTitle: ''});

    // scroll up content after adding new habit to avoid hiding keyboard
    const position = this.scrollView._root.position;
    this.scrollView &&
      this.scrollView._root.scrollToPosition(0, position.y + dySize(65), true);
  };

  onDelete = () => {
    this.props.removeReflection(this.props.selectedReflection);
    NavigationService.goBack();
  };

  validateTitle = () => {
    const {selectedReflection} = this.props;
    const title = _.get(selectedReflection, ['data', 'title'], '');
    return title.length > 0;
  };

  validateHabits = () => {
    const {selectedReflection} = this.props;
    const habits = _.get(selectedReflection, ['data', 'habits'], []);
    return habits.length > 0 || this.state.newHabitTitle.length > 0;
  };

  onPressBack = () => {
    const {selectedReflection} = this.props;
    if (this.state.newHabitTitle.length > 0) {
      selectedReflection.data.habits.push({
        title: this.state.newHabitTitle,
      });
    }
    // save draft for add new screens only(not edit screen)
    if (!selectedReflection._id) {
      this.props.saveReflectionDraft({
        [selectedReflection.type]: selectedReflection,
      });
    }

    NavigationService.goBack();
  };

  _renderMemberItem = ({item}) => {
    const user = item;
    const {deselectUser} = this.props;
    return (
      <MCView align="center" width={100} mt={10}>
        <MCButton onPress={() => this.onPressCollaborator(user)}>
          <MCImage
            round
            image={{uri: user.avatar}}
            width={80}
            height={80}
            type="avatar"
          />
        </MCButton>
        <MCButton onPress={() => deselectUser(user)}>
          <MCIcon name="ios-remove-circle-outline" />
        </MCButton>
        <H3 align="center">{user.name}</H3>
      </MCView>
    );
  };

  render() {
    const {newHabitTitle, submitted} = this.state;
    const {
      t,
      theme,
      selectedReflection,
      updateSelectedReflection,
      selectedUsers,
    } = this.props;
    if (!selectedReflection) return null;
    const title = _.get(selectedReflection, ['data', 'title'], '');
    const isDaily = _.get(selectedReflection, ['data', 'isDaily'], false);
    const habits = _.get(selectedReflection, ['data', 'habits'], []);
    const isErrorTitle = !this.validateTitle();
    const isErrorHabits = !this.validateHabits();
    return (
      <MCRootView>
        <MCHeader
          title={
            selectedReflection._id
              ? t('habit_edit_title')
              : t('habit_add_title')
          }
          hasRight
          rightIcon="cloud-upload-alt"
          onPressRight={() => this.onPressRight()}
          onPressBack={() => this.onPressBack()}
          headerIcon={<AppleSvg size={25} />}
        />
        <MCContent
          ref={ref => (this.scrollView = ref)}
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{padding: dySize(10), paddingBottom: 200}}>
          <MCView row align="center">
            <MCIcon name="ios-information-circle-outline" padding={1} />
            <H3 ml={10} weight="bold">
              {t('habit_header_title')}
            </H3>
          </MCView>
          <MCTextFormInput
            label=""
            onChange={text => updateSelectedReflection({title: text})}
            value={title}
            submitted={submitted}
            errorText={t('error_input_required')}
            isInvalid={isErrorTitle}
          />
          <MCView row align="center" mb={20}>
            <MCIcon name="md-alarm" padding={1} />
            <H3 ml={10} weight="bold">
              {t('habit_period')}
            </H3>
          </MCView>
          <MCView row align="center" mb={10}>
            <CheckBox
              style={{flex: 1}}
              onClick={() => updateSelectedReflection({isDaily: false})}
              isChecked={!isDaily}
              rightText={t('habit_weekly_checkmark_title')}
              rightTextStyle={{
                color: theme.colors.text,
                fontSize: theme.base.FONT_SIZE_LARGE,
                fontFamily: 'ProximaNova-Regular',
                paddingRight: 10,
              }}
              checkBoxColor={theme.colors.text}
            />
            <CheckBox
              style={{flex: 1}}
              onClick={() => updateSelectedReflection({isDaily: true})}
              isChecked={isDaily}
              rightText={t('habit_daily_checkmark_title')}
              rightTextStyle={{
                color: theme.colors.text,
                fontSize: theme.base.FONT_SIZE_LARGE,
                fontFamily: 'ProximaNova-Regular',
                paddingRight: 10,
              }}
              checkBoxColor={theme.colors.text}
            />
          </MCView>

          <MCView row align="center" mt={20}>
            <MCIcon name="ruler" type="Entypo" padding={1} size={16} />
            <H3 ml={10} weight="bold">
              {t('habit_item_title')}
            </H3>
          </MCView>
          {habits.map((habit, index) => (
            <MCView key={index} row align="center" mb={5}>
              <H4 width={30} align="center">
                {index + 1}.
              </H4>
              <MCView style={{flex: 1}}>
                <MCEditableText
                  maxLength={60}
                  text={habit.title}
                  onChange={text => this.onChangeHabit(index, text)}
                />
              </MCView>
              <MCButton onPress={() => this.onRemoveHabit(habit)}>
                <MCIcon name="ios-remove-circle-outline" padding={1} />
              </MCButton>
            </MCView>
          ))}
          <MCView row align="center">
            <H4 width={30} align="center">
              {habits.length + 1}.
            </H4>
            <MCView style={{flex: 1}}>
              <MCEditableText
                maxLength={60}
                text={newHabitTitle}
                blurOnSubmit={false}
                onChange={text => this.setState({newHabitTitle: text})}
                onSubmit={() => this.addNewHabit(newHabitTitle)}
              />
            </MCView>
            <MCButton onPress={() => this.addNewHabit(newHabitTitle)}>
              <MCIcon name="ios-add-circle-outline" padding={1} />
            </MCButton>
          </MCView>
          {isErrorHabits && submitted && (
            <ErrorText>{t('error_input_add_nothing')}</ErrorText>
          )}
          <MCView row align="center" justify="space-between" mt={20}>
            <MCView row align="center">
              <MCIcon name="ios-person-add" padding={1} />
              <H3 ml={10} weight="bold">
                {t('habit_social_accountability_title')}
              </H3>
            </MCView>
            <MCButton
              onPress={() =>
                NavigationService.navigate('SelectUser', {multiple: true})
              }>
              <MCIcon name="ios-add-circle-outline" padding={1} />
            </MCButton>
          </MCView>
          <H4 color={theme.colors.border}>
            {t('habit_social_accountability_bottom')}
          </H4>
          <MCCard>
            <FlatList
              horizontal
              style={{width: '100%', height: dySize(200)}}
              data={selectedUsers}
              keyboardShouldPersistTaps="always"
              renderItem={this._renderMemberItem}
              keyExtractor={item => item}
            />
          </MCCard>
          {selectedReflection._id && (
            <MCView mt={50} mb={30} align="center">
              <MCButton
                onPress={() => this.onDelete()}
                align="center"
                width={250}
                bordered
                background={theme.colors.danger}>
                <H3 color="white">{t('button_remove_habit')}</H3>
              </MCButton>
            </MCView>
          )}
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  selectedReflection: selector.reflections.getSelectedReflection(state),
  selectedUsers: state.usersReducer.selectedUsers,
  reflectionDraft: state.reflectionReducer.draft,
});

const mapDispatchToProps = {
  updateSelectedReflection: reflectionActions.updateSelectedReflection,
  addOrUpdateReflection: reflectionActions.addOrUpdateReflection,
  removeReflection: reflectionActions.removeReflection,
  saveReflectionDraft: reflectionActions.saveReflectionDraft,
  selectReflection: reflectionActions.selectReflection,
  deselectUser: userActions.deselectUser,
  updateAnalyzeStatus: otherActions.updateAnalyzeStatus,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(EditHabitScreen),
);
