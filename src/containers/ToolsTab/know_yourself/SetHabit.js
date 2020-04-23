import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import {selector} from 'Redux/selectors';
import {reflectionActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {H3, H4, ErrorText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {
  MCHeader,
  MCIcon,
  MCImage,
  MCTextFormInput,
  MCEditableText,
} from 'components/common';
import {dySize} from 'utils/responsive';
import {AttachmentOptions} from 'utils/constants';
import NavigationService from 'navigation/NavigationService';
import {AppleImage} from 'assets/images';

class SetHabitScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      newHabitTitle: '',
    };
  }
  isNew = false;
  componentWillMount() {
    const {
      habit,
      selectReflection,
      setInitialReflection,
      reflectionDraft,
    } = this.props;
    if (habit) {
      selectReflection(habit);
    } else {
      this.isNew = true;
      if (reflectionDraft['Habit'] && 0) {
        selectReflection(reflectionDraft['Habit']);
      } else {
        setInitialReflection('habit');
      }
    }
  }

  onChangeHabit = (index, text) => {
    const {
      selectedReflection: {
        data: {habits},
      },
    } = this.props;
    habits[index] = text;
    this.props.updateSelectedReflection({habits});
  };

  onRemoveHabit = habit => {
    const {
      selectedReflection: {
        data: {habits},
      },
    } = this.props;
    const filtered = habits.filter(item => item !== habit);
    this.props.updateSelectedReflection({habits: filtered});
  };

  addNewHabit = title => {
    const {
      selectedReflection: {
        data: {habits},
      },
    } = this.props;
    if (title.length === 0) return;
    habits.push(title);
    this.props.updateSelectedReflection({habits});
    this.setState({newHabitTitle: ''});

    // scroll up content after adding new habit to avoid hiding keyboard
    const position = this.scrollView._root.position;
    this.scrollView &&
      this.scrollView._root.scrollToPosition(0, position.y + dySize(60), true);
  };

  onPressDaily = () => {
    this.props.updateSelectedReflection({isDaily: true});
  };

  onPressWeekly = () => {
    this.props.updateSelectedReflection({isDaily: false});
  };

  onPressBack = () => {
    const {selectedReflection, saveReflectionDraft} = this.props;
    if (this.isNew) {
      saveReflectionDraft({
        [selectedReflection.type]: selectedReflection,
      });
    }
    NavigationService.goBack();
  };

  onPressSubmit = () => {
    const {
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
      habits:
        newHabitTitle.length > 0 ? habits.concat([newHabitTitle]) : habits,
    });
    this.setState({newHabitTitle: ''});
    this.props.addOrUpdateReflection();
  };

  validateTitle = () => {
    return this.props.selectedReflection.data.title.length > 0;
  };

  validateHabits = () => {
    return (
      this.props.selectedReflection.data.habits.length > 0 ||
      this.state.newHabitTitle.length > 0
    );
  };

  render() {
    const {submitted, newHabitTitle} = this.state;
    const {t, selectedReflection, updateSelectedReflection} = this.props;
    if (!selectedReflection.data) return null;
    console.log('TTT', selectedReflection.data);
    const {title, habits, isDaily} = selectedReflection.data;
    const isErrorTitle = !this.validateTitle();
    const isErrorHabits = !this.validateHabits();
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          title={`${t('practice')} 7`}
          onPressBack={() => this.onPressBack()}
          rightIcon="cloud-upload-alt"
          onPressRight={() => this.onPressSubmit()}
        />
        <MCContent
          ref={ref => (this.scrollView = ref)}
          contentContainerStyle={{padding: dySize(20), paddingBottom: 200}}>
          <MCView row justify="center" align="center" mb={20}>
            <H3 mr={10}>{t('tools_tab_set_a_habit')}</H3>
            <MCImage
              image={AppleImage}
              width={30}
              height={30}
              resizeMode="contain"
            />
          </MCView>
          <H4 align="center">Excellence is a habit.</H4>
          <H3 underline mt={10}>
            Start small
          </H3>
          <H4>Add a personal development habit</H4>
          <H4 mt={20}>Here are some examples:</H4>
          <MCView bordered br={10} ph={20} pv={20}>
            <H4 weight="bold">Piano Practice</H4>
            <H4 ml={40}>10 minutes of sight reading</H4>
            <H4 weight="bold" mt={20}>
              Meditation
            </H4>
            <H4 ml={40}>5 minutes of daily mediation</H4>
            <H4 weight="bold" mt={20}>
              Morning Routine
            </H4>
            <H4 ml={40}>Make the bed</H4>
            <H4 ml={40}>10 pushups</H4>
            <H4 ml={40}>Cold shower</H4>
          </MCView>
          <MCTextFormInput
            mt={20}
            label={t('tools_tab_input_habit_title')}
            value={title}
            onChangeText={value => updateSelectedReflection({title: value})}
            submitted={submitted}
            errorText={t('error_input_required')}
            isInvalid={isErrorTitle}
          />
          <H4>{t('tools_tab_input_habit_perform')}</H4>
          {isErrorHabits && submitted && (
            <ErrorText>{t('error_input_habit')}</ErrorText>
          )}
          {habits.map((habit, index) => (
            <MCView key={index} row align="center" mb={5}>
              <H4 width={30} align="center">
                {index + 1}.
              </H4>
              <MCView style={{flex: 1}}>
                <MCEditableText
                  maxLength={60}
                  text={habit}
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
          <MCView mt={20} row align="center">
            <H4>{t('tools_tab_input_habit_how_often')}</H4>
            <MCIcon type="FontAwesome" name="clock-o" />
          </MCView>
          <MCView mt={10} row align="center">
            <MCButton
              row
              align="center"
              style={{flex: 1}}
              onPress={() => this.onPressDaily()}>
              <MCView bordered width={30} height={30} br={5}>
                {isDaily && <MCIcon type="FontAwesome5" name="check" />}
              </MCView>
              <H4 ml={10}>Daily Habit?</H4>
            </MCButton>
            <MCButton
              row
              align="center"
              style={{flex: 1}}
              onPress={() => this.onPressWeekly()}>
              <MCView bordered width={30} height={30} br={5}>
                {!isDaily && <MCIcon type="FontAwesome5" name="check" />}
              </MCView>
              <H4 ml={10}>Weekly Habit?</H4>
            </MCButton>
          </MCView>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  habit: selector.reflections.findMySpecialReflections(state, 'Habit'),
  selectedReflection: state.reflectionReducer.selectedReflection,
  reflectionDraft: state.reflectionReducer.draft,
});

const mapDispatchToProps = {
  selectReflection: reflectionActions.selectReflection,
  setInitialReflection: reflectionActions.setInitialReflection,
  updateSelectedReflection: reflectionActions.updateSelectedReflection,
  addOrUpdateReflection: reflectionActions.addOrUpdateReflection,
  saveReflectionDraft: reflectionActions.saveReflectionDraft,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SetHabitScreen),
);
