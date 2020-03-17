import {
  AddUserManualIcon,
  AddEmotionIcon,
  AddFeedbackIcon,
  AddGoalIcon,
  AddNeedIcon,
  AddTapToCountIcon,
  AddValueIcon,
} from '../assets/images';

// Constants used for testing

export const fontFamilies = {
  bold: 'Raleway-Bold',
  regular: 'Raleway-Regular',
  thin: 'Raleway-Thin',
  italic: 'Raleway-Italic',
};

export const ContactProfileKeys = [
  'preferredtobecalled',
  'namepronoun',
  'preferredpronoun',
  'email',
  'phone',
  'neighborhood',
];

export const AddReflectionSections = [
  {
    key: 'manual', // You can find `add_reflection_manual` in en.json to check the reflection card title
    points: 1000,
    unit: 'pts',
    duration: '5-10',
    boldWordKeys: ['user_manual'], // You can find `add_reflection_manual_bold_user_manual` to check the bold text
    icon: AddUserManualIcon,
    navigateTo: 'AddUserManual',
  },
  {
    key: 'value',
    points: 500,
    unit: 'pts',
    duration: '5',
    boldWordKeys: ['value'],
    icon: AddValueIcon,
    navigateTo: 'AddValue',
  },
  {
    key: 'feedback',
    points: 200,
    unit: 'pts',
    duration: '2 min',
    boldWordKeys: ['request_feedback'],
    icon: AddFeedbackIcon,
    navigateTo: 'AddFeedback',
  },
  {
    key: 'goal',
    points: 200,
    unit: 'pts',
    duration: '4-6',
    boldWordKeys: ['goal'],
    icon: AddGoalIcon,
    navigateTo: 'AddGoal',
  },
  {
    key: 'mood_and_emotion',
    points: 50,
    unit: 'pts',
    duration: '2-4',
    boldWordKeys: ['mood', 'emotions'],
    icon: AddEmotionIcon,
    navigateTo: 'AddEmotion',
  },
  {
    key: 'need',
    points: 50,
    unit: 'pts',
    duration: '2-4',
    boldWordKeys: ['needs'],
    icon: AddNeedIcon,
    navigateTo: 'AddNeed',
  },
  {
    key: 'tapToCount',
    points: 10,
    unit: 'pts',
    duration: '<1',
    boldWordKeys: ['tap_to_count'],
    icon: AddTapToCountIcon,
    navigateTo: 'AddTapToCount',
  },
];

export const SampleFeedbackQuestions = [
  'mocha_feedback_handle-stress',
  'mocha_feedback_how-approachable',
  'mocha_feedback_how-coachable',
  'mocha_feedback_how-dependable',
  'mocha_feedback_how-trustworthy',
  'mocha_feedback_my-blindspots',
  'mocha_feedback_my-strenhths',
  'mocha_feedback_my-weakness',
  'mocha_feedback_when-i-was-at-best',
  'mocha_feedback_working-with-me',
];

export const NetworkPermissions = [
  {key: 'Value', data: 'value'},
  {key: 'Manual', data: 'user-manual'},
  {key: 'Emotion', data: 'emotion'},
  {key: 'Need', data: 'need'},
  {key: 'Goal', data: 'goal'},
  {key: 'Tap', data: 'tap-to-count'},
];

export const NightSliderValues = [
  '7:00 PM',
  '8:00 PM',
  '9:00 PM',
  '10:00 PM',
  '11:00 PM',
  '00:00 AM',
  '01:00 AM',
  '02:00 AM',
  '03:00 AM',
  '04:00 AM',
  '05:00 AM',
  '06:00 AM',
  '07:00 AM',
];
export const DaySliderValues = [
  '7:00 AM',
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
];
