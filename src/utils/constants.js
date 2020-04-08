import i18next from 'i18next';
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

export const FontFamilies = {
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

export const WeekDays = [
  {
    long: 'Sunday',
    short: 'Sun',
  },
  {
    long: 'Monday',
    short: 'Mon',
  },
  {
    long: 'Tuesday',
    short: 'Tue',
  },
  {
    long: 'Wednesday',
    short: 'Wed',
  },
  {
    long: 'Thursday',
    short: 'Thu',
  },
  {
    long: 'Friday',
    short: 'Fri',
  },
  {
    long: 'Saturday',
    short: 'Sat',
  },
];

export const AddReflectionSections = [
  {
    key: 'manual', // You can find `add_reflection_manual` in en.json to check the reflection card title
    points: 1000,
    unit: 'pts',
    duration: '5-10',
    boldWordKeys: ['user_manual'], // You can find `add_reflection_manual_bold_user_manual` to check the bold text
    icon: AddUserManualIcon,
    navigateTo: 'UserManuals',
    registerRequired: false,
  },
  {
    key: 'value',
    points: 500,
    unit: 'pts',
    duration: '5',
    boldWordKeys: ['value'],
    icon: AddValueIcon,
    navigateTo: 'Values',
    registerRequired: false,
  },
  {
    key: 'feedback',
    points: 200,
    unit: 'pts',
    duration: '2 min',
    boldWordKeys: ['request_feedback'],
    icon: AddFeedbackIcon,
    navigateTo: 'Feedbacks',
    registerRequired: true,
  },
  {
    key: 'goal',
    points: 200,
    unit: 'pts',
    duration: '4-6',
    boldWordKeys: ['goal'],
    icon: AddGoalIcon,
    navigateTo: 'Objectives',
    registerRequired: true,
  },
  {
    key: 'mood_and_emotion',
    points: 50,
    unit: 'pts',
    duration: '2-4',
    boldWordKeys: ['mood', 'emotions'],
    icon: AddEmotionIcon,
    navigateTo: 'Emotions',
    registerRequired: false,
  },
  {
    key: 'need',
    points: 50,
    unit: 'pts',
    duration: '2-4',
    boldWordKeys: ['needs'],
    icon: AddNeedIcon,
    navigateTo: 'Needs',
    registerRequired: false,
  },
  {
    key: 'tapToCount',
    points: 10,
    unit: 'pts',
    duration: '<1',
    boldWordKeys: ['tap_to_count'],
    icon: AddTapToCountIcon,
    navigateTo: 'TapToCounts',
    registerRequired: true,
  },
];

export const ResourceSideMenuList = [
  {
    index: 0,
    icon: 'ios-search',
    iconType: 'Ionicon',
    title: 'resource_menu_search',
    redirectTo: 'ResourceSearch',
  },
  {
    index: 1,
    icon: 'ios-apps',
    iconType: 'Ionicon',
    title: 'resource_menu_my_resources',
    redirectTo: 'MyResources',
  },
  {
    index: 2,
    icon: 'ios-add',
    iconType: 'Ionicon',
    title: 'resource_menu_add',
    redirectTo: 'AddResource',
  },
  {
    index: 0,
    icon: 'ios-gift',
    iconType: 'Ionicon',
    title: 'resource_menu_favourite',
    redirectTo: 'ResourceBookmarked',
  },
];

export const ProfileSideMenuList = [
  {
    index: 0,
    icon: 'ios-link',
    iconType: 'Ionicon',
    title: 'profile_menu_signin',
    redirectTo: 'TabFeed',
    registerRequired: false,
  },
  {
    index: 1,
    icon: 'ios-log-out',
    iconType: 'Ionicon',
    title: 'profile_menu_signout',
    redirectTo: '',
    registerRequired: true,
  },
  {
    index: 2,
    icon: 'ios-calendar',
    iconType: 'Ionicon',
    title: 'profile_menu_timeline',
    redirectTo: 'TimeLine',
    registerRequired: true,
  },
  {
    index: 3,
    icon: 'ios-trending-up',
    iconType: 'Ionicon',
    title: 'profile_menu_analyze',
    redirectTo: 'Analyze',
    registerRequired: true,
  },
  {
    index: 4,
    icon: 'ios-send',
    iconType: 'Ionicon',
    title: 'profile_menu_cv',
    redirectTo: 'SendMochaCV',
    registerRequired: true,
  },
  {
    index: 5,
    icon: 'ios-notifications-outline',
    iconType: 'Ionicon',
    title: 'profile_menu_manage_notifications',
    redirectTo: 'ManageNotifications',
    registerRequired: true,
  },
  {
    index: 6,
    icon: 'logo-usd',
    iconType: 'Ionicon',
    title: 'profile_menu_purchase',
    redirectTo: 'Purchase',
    registerRequired: true,
  },
  {
    index: 7,
    icon: 'ios-remove-circle-outline',
    iconType: 'Ionicon',
    title: 'profile_menu_delete',
    redirectTo: '',
    registerRequired: true,
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

export const SampleReflectionSections = {
  values: [
    'Above and Beyond',
    'Abundance',
    'Acceptance',
    'Accessibility',
    'Accomplishment',
    'Accountability',
    'Accuracy',
    'Accurate',
    'Achievement',
    'Activity',
    'Adaptability',
    'Advancement',
    'Adventure',
    'Adventurous',
    'Adventurousness',
    'Advocacy',
    'Affection',
    'Affective',
    'Aggressive',
    'Aggressiveness',
    'Agility',
    'Alert',
    'Alertness',
    'Altruism',
    'Ambition',
    'Amusement',
    'Anti-Bureaucratic',
    'Anti-Corporate',
    'Anticipate',
    'Anticipation',
    'Appreciation',
    'Approachability',
    'Approachable',
    'Articulation',
    'Assertive',
    'Assertiveness',
    'Attention to Detail',
    'Attentive',
    'Attentiveness',
    'Attractiveness',
    'Authenticity',
    'Authority',
    'Autonomy',
    'Availability',
    'Available',
    'Awareness',
    'Balance',
    'Beauty',
    'Being',
    'Being the Best',
    'Belonging',
    'Benevolence',
    'Best',
    'Best People',
    'Bold',
    'Boldness',
    'Bravery',
    'Brilliance',
    'Brilliant',
    'Calm',
    'Calmness',
    'Candor',
    'Capability',
    'Capable',
    'Careful',
    'Carefulness',
    'Caring',
    'Certainty',
    'Challenge',
    'Change',
    'Character',
    'Charity',
    'Cheerful',
    'Cheerfulness',
    'Citizenship',
    'Clean',
    'Cleanliness',
    'Clear',
    'Clear-Minded',
    'Clear-mindedness',
    'Clever',
    'Cleverness',
    'Clients',
    'Collaboration',
    'Comfort',
    'Commitment',
    'Common',
    'Common Sense',
    'Communication',
    'Community',
    'Compassion',
    'Competence',
    'Competency',
    'Competition',
    'Competitive',
    'Competitiveness',
    'Completion',
    'Composure',
    'Comprehensive',
    'Concentration',
    'Concern for Others',
    'Confidence',
    'Confidential',
    'Confidentiality',
    'Conformity',
    'Connection',
    'Consciousness',
    'Consistency',
    'Content',
    'Contentment',
    'Continuity',
    'Continuous',
    'Continuous Improvement',
    'Contribution',
    'Control',
    'Conviction',
    'Cooperation',
    'Coordination',
    'Cordiality',
    'Correct',
    'Correctness',
    'Courage',
    'Courtesy',
    'Craftiness',
    'Craftsmanship',
    'Creation',
    'Creative',
    'Creativity',
    'Credibility',
    'Cunning',
    'Curiosity',
    'Customer Focus',
    'Customer Satisfaction',
    'Customer Service',
    'Customers',
    'Daring',
    'Decency',
    'Decisive',
    'Decisiveness',
    'Dedication',
    'Delight',
    'Democracy',
    'Democratic',
    'Democraticness',
    'Dependability',
    'Depth',
    'Determination',
    'Determined',
    'Development',
    'Devotion',
    'Devout',
    'Devoutness',
    'Difference',
    'Different',
    'Differentiation',
    'Dignity',
    'Diligence',
    'Direct',
    'Directness',
    'Discipline',
    'Discovery',
    'Discretion',
    'Diversity',
    'Dominance',
    'Down-to-Earth',
    'Dreaming',
    'Drive',
    'Duty',
    'Dynamism',
    'Eagerness',
    'Ease of Use',
    'Economy',
    'Education',
    'Effective',
    'Effectiveness',
    'Efficiency',
    'Efficient',
    'Elegance',
    'Empathy',
    'Employees',
    'Empower',
    'Empowering',
    'Encouragement',
    'Endurance',
    'Energy',
    'Engagement',
    'Enjoyment',
    'Entertainment',
    'Enthusiasm',
    'Entrepreneurship',
    'Environment',
    'Equality',
    'Equitable',
    'Ethical',
    'Ethics',
    'Exceed Expectations',
    'Excellence',
    'Excitement',
    'Exciting',
    'Exhilarating',
    'Experience',
    'Expertise',
    'Exploration',
    'Explore',
    'Expressive',
    'Expressiveness',
    'Extrovert',
    'Exuberance',
    'Fairness',
    'Faith',
    'Faithfulness',
    'Fame',
    'Family',
    'Family Atmosphere',
    'Family-orientedness',
    'Famous',
    'Fashion',
    'Fast',
    'Fearless',
    'Feelings',
    'Ferocious',
    'Fidelity',
    'Fierce',
    'Firm',
    'Fitness',
    'Flair',
    'Flexibility',
    'Flexible',
    'Fluency',
    'Focus',
    'Focus on Future',
    'Foresight',
    'Formal',
    'Fortitude',
    'Freedom',
    'FreedomFun',
    'Fresh',
    'Fresh Ideas',
    'Friendly',
    'Friendship',
    'Friendships',
    'Frugality',
    'Fun',
    'Generosity',
    'Genius',
    'Giving',
    'Global',
    'Goodness',
    'Goodwill',
    'Grace',
    'Gratitude',
    'Great',
    'Greatness',
    'Growth',
    'Guidance',
    'Happiness',
    'Hard',
    'Hard Work',
    'Harmony',
    'Health',
    'Heart',
    'Helpful',
    'Helping',
    'Heroism',
    'History',
    'Holiness',
    'Honesty',
    'Honor',
    'Hope',
    'Hopeful',
    'Hospitality',
    'Humble',
    'Humility',
    'Humor',
    'Hygiene',
    'Imagination',
    'Impact',
    'Impartial',
    'Impious',
    'Improvement',
    'Inclusiveness',
    'Independence',
    'Individuality',
    'Industry',
    'Influence',
    'Informal',
    'Ingenuity',
    'Inner',
    'Innovation',
    'Innovative',
    'Inquisitive',
    'Inquisitiveness',
    'Insight',
    'Insightful',
    'Insightfulness',
    'Inspiration',
    'Inspiring',
    'Integrity',
    'Intellectual',
    'Intellectualism',
    'Intelligence',
    'Intensity',
    'International',
    'Intuition',
    'Intuitive',
    'Invention',
    'Investing',
    'Investment',
    'Inviting',
    'Irreverence',
    'Irreverent',
    'Joy',
    'Justice',
    'Kindness',
    'Knowledge',
    'Lawful',
    'Leadership',
    'Learning',
    'Legacy',
    'Legal',
    'Leisure',
    'Letting',
    'Level-Headed',
    'Liberty',
    'Listening',
    'Lively',
    'Local',
    'Logic',
    'Longevity',
    'Love',
    'Loyalty',
    'Making',
    'Mastery',
    'Maturity',
    'Maximizing',
    'Maximum Utilization',
    'Meaning',
    'Meaningful',
    'Meekness',
    'Mellow',
    'Members',
    'Merit',
    'Meritocracy',
    'Meticulous',
    'Mindful',
    'Mindfulness',
    'Moderation',
    'Modesty',
    'Motivation',
    'Mystery',
    'Nature',
    'Neatness',
    'Nerve',
    'No Bureaucracy',
    'Obedience',
    'Open',
    'Open-Minded',
    'Open-Mindedness',
    'Openness',
    'Optimism',
    'Order',
    'Organization',
    'Original',
    'Originality',
    'Outrageous',
    'Partnership',
    'Passion',
    'Patience',
    'Patient-Centered',
    'Patient-Focused',
    'Patient-Satisfaction',
    'Patients',
    'Patriotism',
    'Peace',
    'People',
    'Perception',
    'Perceptive',
    'Perfection',
    'Performance',
    'Perseverance',
    'Persistence',
    'Personal Development',
    'Personal Growth',
    'Persuasive',
    'Philanthropy',
    'Piety',
    'Play',
    'Playfulness',
    'Pleasantness',
    'Pleasure',
    'Poise',
    'Polish',
    'Popularity',
    'Positive',
    'Positivity',
    'Potency',
    'Potential',
    'Power',
    'Powerful',
    'Practical',
    'Practicality',
    'Pragmatic',
    'Precise',
    'Precision',
    'Prepared',
    'Preparedness',
    'Presence',
    'Preservation',
    'Prestige',
    'Pride',
    'Privacy',
    'Proactive',
    'Proactively',
    'Proactivity',
    'Productivity',
    'Profane',
    'Professionalism',
    'Profitability',
    'Profits',
    'Progress',
    'Prosperity',
    'Prudence',
    'Punctuality',
    'Purity',
    'Pursue',
    'Pursuit',
    'Quality',
    'Quality of Work',
    'Rational',
    'Real',
    'Realistic',
    'Reason',
    'Recognition',
    'Recreation',
    'Refined',
    'Reflection',
    'Reflective',
    'Relationships',
    'Relaxation',
    'Reliability',
    'Reliable',
    'Religion',
    'Resilience',
    'Resolute',
    'Resolution',
    'Resolve',
    'Resourceful',
    'Resourcefulness',
    'Respect',
    'Respect for Others',
    'Respect for the Individual',
    'Responsibility',
    'Responsiveness',
    'Rest',
    'Restraint',
    'Results',
    'Results-Oriented',
    'Reverence',
    'Rigor',
    'Risk',
    'Risk Taking',
    'Rule of Law',
    'Sacrifice',
    'Safety',
    'Sanitary',
    'Satisfaction',
    'Security',
    'Self motivation',
    'Self responsibility',
    'Self-directed',
    'Self-actualization',
    'Self-awareness',
    'Self-control',
    'Self-expression',
    'Self-knowledge',
    'Self-realization',
    'Self-reliance',
    'Self-respect',
    'Selfless',
    'Selflessness',
    'Sense of Humor',
    'Sensitivity',
    'Serenity',
    'Serious',
    'Service',
    'Shared Prosperity',
    'Sharing',
    'Shrewd',
    'Shrewdness',
    'Significance',
    'Silence',
    'Silliness',
    'Simplicity',
    'Sincerity',
    'Skill',
    'Skillfulness',
    'Smart',
    'Society',
    'Solitude',
    'Soundness',
    'Speed',
    'Spirit',
    'Spirituality',
    'Spontaneity',
    'Spontaneous',
    'Stability',
    'Standardization',
    'Status',
    'Stealth',
    'Stewardship',
    'Strategic',
    'Strength',
    'Structure',
    'Succeed',
    'Success',
    'Support',
    'Surprise',
    'Sustainability',
    'Sympathy',
    'Synergy',
    'Systemization',
    'Taking',
    'Talent',
    'Teamwork',
    'Temperance',
    'Thankful',
    'Thankfulness',
    'Thorough',
    'Thoroughness',
    'Thoughtful',
    'Thoughtfulness',
    'Timeliness',
    'Timely',
    'Tolerance',
    'Tough',
    'Toughness',
    'Traditional',
    'Traditionalism',
    'Training',
    'Tranquility',
    'Transparency',
    'Trust',
    'Trustworthiness',
    'Trustworthy',
    'Truth',
    'Truth-seeking',
    'Understanding',
    'Unflappable',
    'Unique',
    'Uniqueness',
    'Unity',
    'Universal',
    'Useful',
    'Usefulness',
    'Utility',
    'Valor',
    'Value',
    'Variety',
    'Versatility',
    'Victorious',
    'Victory',
    'Vigor',
    'Virtue',
    'Vision',
    'Vital',
    'Vitality',
    'Warmth',
    'Watchful',
    'Watchfulness',
    'Wealth',
    'Welcoming',
    'Well-Being',
    'Will',
    'Willfulness',
    'Winning',
    'Wisdom',
    'Wonder',
    'Work',
    'Work/Life Balance',
    'Worldwide',
    'Zeal',
  ],
  needs: [
    'for-admiration',
    'for-advice',
    'for-affection',
    'for-alignment',
    'for-assurance',
    'for-attachment',
    'for-autonomy',
    'for-beauty',
    'for-bravery',
    'for-calm',
    'for-catharsis',
    'for-certainty',
    'for-challenge',
    'for-clarity',
    'for-clarity-in-my-thoughts',
    'for-cleanliness',
    'for-closeness',
    'for-combat',
    'for-compassion',
    'for-competence',
    'for-competition',
    'for-consistency',
    'for-context',
    'for-control',
    'for-courage',
    'for-disconnection',
    'for-effectiveness',
    'for-emotional-release',
    'for-emotional-security',
    'for-empathy',
    'for-emptiness',
    'for-escape',
    'for-excellence',
    'for-exploration',
    'for-fairness',
    'for-fear',
    'for-focus',
    'for-freedom',
    'for-friendship',
    'for-fun',
    'for-glory',
    'for-growth',
    'for-honesty',
    'for-honor',
    'for-inconsistency',
    'for-integration',
    'for-irrelevance',
    'for-justice',
    'for-kindness',
    'for-laughter',
    'for-music',
    'for-nature',
    'for-novelty',
    'for-order',
    'for-physical-touch',
    'for-play',
    'for-pleasure',
    'for-power',
    'for-privacy',
    'for-quiet',
    'for-rawness',
    'for-reassurance',
    'for-reciprocation',
    'for-release',
    'for-relevance',
    'for-respect',
    'for-rest',
    'for-routine',
    'for-sanity',
    'for-self-actualization',
    'for-self-care',
    'for-self-esteem',
    'for-self-love',
    'for-self-respect',
    'for-self-understanding',
    'for-sex',
    'for-significance',
    'for-spontaneity',
    'for-stability',
    'for-status',
    'for-subtly',
    'for-superiority',
    'for-symmetry',
    'for-tenderness',
    'for-things-to-make-sense',
    'for-transcendence',
    'for-uncertainty',
    'for-understanding',
    'for-union',
    'for-validation',
    'for-variety',
    'to-belong',
    'to-build-trust',
    'to-care-for-my-family',
    'to-control',
    'to-create',
    'to-do-my-part',
    'to-dream',
    'to-empower',
    'to-escape',
    'to-escape-from-sadness',
    'to-escape-from-seriousness',
    'to-feel-I’m-growing',
    'to-feel-I’ve-grown',
    'to-feel-affection',
    'to-feel-afraid',
    'to-feel-alignment',
    'to-feel-alive',
    'to-feel-appreciated',
    'to-feel-attached',
    'to-feel-attractive',
    'to-feel-autonomous',
    'to-feel-belonging',
    'to-feel-brave',
    'to-feel-calm',
    'to-feel-capable',
    'to-feel-cared-for',
    'to-feel-certain',
    'to-feel-challenged',
    'to-feel-cherished',
    'to-feel-clean',
    'to-feel-clever',
    'to-feel-close',
    'to-feel-coached',
    'to-feel-comforted',
    'to-feel-compassion',
    'to-feel-competent',
    'to-feel-competitive',
    'to-feel-content',
    'to-feel-contentment',
    'to-feel-controlled',
    'to-feel-controlling',
    'to-feel-courageous',
    'to-feel-creative',
    'to-feel-deeply',
    'to-feel-disconnected',
    'to-feel-distressed',
    'to-feel-dominated',
    'to-feel-effective',
    'to-feel-unburdened',
    'to-feel-empathized-with',
    'to-feel-empowered',
    'to-feel-empty',
    'to-feel-encouraged',
    'to-feel-excellent',
    'to-feel-excited',
    'to-feel-excitement',
    'to-feel-exhausted',
    'to-feel-explored',
    'to-feel-exposed',
    'to-feel-like-a-fool',
    'to-feel-focused',
    'to-feel-free',
    'to-feel-free-from-blame',
    'to-feel-free-from-mistakes',
    'to-feel-fully-integrated',
    'to-feel-giving',
    'to-feel-glorious',
    'to-feel-heard',
    'to-feel-hidden',
    'to-feel-honest',
    'to-feel-humiliated',
    'to-feel-important',
    'to-feel-in-alignment',
    'to-feel-in-control',
    'to-feel-in-order',
    'to-feel-in-the-right',
    'to-feel-inconsistent',
    'to-feel-integrated',
    'to-feel-kindness',
    'to-feel-like-I-matter',
    'to-feel-like-a-friend',
    'to-feel-like-a-good-person',
    'to-feel-like-my-work-matters',
    'to-feel-listened-to',
    'to-feel-loved',
    'to-feel-loved-just-as-I-am',
    'to-feel-moral',
    'to-feel-my-contributions-matter',
    'to-feel-my-services-matter',
    'to-feel-natural',
    'to-feel-needed',
    'to-feel-order',
    'to-feel-original',
    'to-feel-out-of-control',
    'to-feel-perfect',
    'to-feel-physically-touched',
    'to-feel-powerful',
    'to-feel-provided-for',
    'to-feel-pushed-faster',
    'to-feel-pushed-harder',
    'to-feel-reciprocated-for',
    'to-feel-reckless',
    'to-feel-recognized',
    'to-feel-released',
    'to-feel-relevant',
    'to-feel-respected',
    'to-feel-right',
    'to-feel-sad',
    'to-feel-safe',
    'to-feel-sane',
    'to-feel-seen',
    'to-feel-selfless',
    'to-feel-sexual',
    'to-feel-significant',
    'to-feel-soothed',
    'to-feel-special',
    'to-feel-stable',
    'to-feel-subtle',
    'to-feel-superior',
    'to-feel-that-I-matter',
    'to-feel-touched',
    'to-feel-tranquil',
    'to-feel-trusted',
    'to-feel-uncertain',
    'to-feel-uncomfortable',
    'to-feel-understood',
    'to-feel-unique',
    'to-feel-various',
    'to-feel-vulnerable',
    'to-feel-wanted',
    'to-feel-worthy',
    'to-feel-worthy-of-existing',
    'to-feel-young',
    'to-find-excitement',
    'to-finish-what-I-started',
    'to-give',
    'to-give-it-my-all',
    'to-have-a-voice',
    'to-have-my-voice-heard',
    'to-have-an-impact',
    'to-listen',
    'to-love',
    'to-love-another',
    'to-matter',
    'to-meet-high-standards',
    'to-play',
    'to-please-my-family',
    'to-raise-my-standards',
    'to-reduce-my-anxiety',
    'to-say-I-told-you-so',
    'to-see-the-world',
    'to-serve',
    'to-show-gratitude',
    'to-take-care-of-my-family',
    'to-take-risks',
    'to-talk',
  ],
  manuals: [
    'good-at',
    'need-help',
    'preferred-help-style',
    'values',
    'want-learn',
    'respond-under-stress',
    'misunderstand',
    'look-disagree',
    'work-condition',
    'time-to-work',
    'communicate-style',
    'feedback-style',
    'needs',
    'love',
  ],
  feedbacks: [
    'my-strenths',
    'my-weakness',
    'my-blindspots',
    'working-with-me',
    'when-i-was-at-best',
    'handle-stress',
    'how-approachable',
    'how-coachable',
    'how-dependable',
    'how-trustworthy',
  ],
};

export const DefaultReflections = {
  motivation: {
    type: 'motivation',
    data: {
      title: '',
      description: '',
      image: '',
    },
  },
  manual: {
    type: 'manual',
    data: {
      title: '',
      text: '',
      vulnerability: 1,
      tags: [],
      image: '',
    },
  },
  chronotype: {
    type: 'chronotype',
    data: {
      type: 'morning', // morning, flexible, night
      night_sleep_offset_start: 3, // 0 ~ 12
      night_sleep_offset_end: 10, // 0 ~ 12
      day_sleep_offset_start: 5, // 0 ~ 12
      day_sleep_offset_end: 7, // 0 ~ 12
    },
  },
  value: {
    type: 'value',
    data: {
      value: '',
      phrase: '',
      learn: '',
      image: '',
      action: '',
    },
  },
  emotion: {
    type: 'emotion',
    data: {
      emotion: '',
      how: '',
      story: '',
    },
  },
  objective: {
    type: 'objective',
    data: {
      title: '',
      measures: [],
      isDaily: false,
      deadline: new Date().getTime(),
      collaborators: [],
    },
  },
  need: {
    type: 'need',
    data: {
      need: '',
      value: '',
      reason: '',
    },
  },
  personality: {
    type: 'personality',
    data: {
      honest_humility: 0,
      emotionality: 0,
      extraversion: 0,
      agreeableness: 0,
      conscientiousness: 0,
      openness_to_experience: 0,
    },
  },
};

export const ResourceTypes = [
  {
    type: 'book',
    icon: 'book',
  },
  {
    type: 'article',
    icon: 'book-reader',
  },
  {
    type: 'video',
    icon: 'video',
  },
  {
    type: 'podcast',
    icon: 'podcast',
  },
  {
    type: 'class',
    icon: 'question',
  },
  {
    type: 'blog',
    icon: 'blog',
  },
  {
    type: 'event',
    icon: 'rss-square',
  },
  {
    type: 'author',
    icon: 'user-edit',
  },
];

export const EMOTIONS = [
  'anger_enraged_hateful',
  'anger_enraged_hostile',
  'anger_exasperated_agitated',
  'anger_exasperated_frustrated',
  'anger_irritable_annoyed',
  'anger_irritable_aggravated',
  'anger_envious_resentful',
  'anger_envious_jealout',
  'anger_disgusted_contemptuous',
  'anger_disgusted_revolted',
  'sadness_distressed_agonized',
  'sadness_distressed_hurt',
  'sadness_melancholic_depressed',
  'sadness_melancholic_sorrowful',
  'sadness_disappointed_dismayed',
  'sadness_disappointed_displeased',
  'sadness_shameful_regretful',
  'sadness_shameful_guilty',
  'sadness_neglected_isolated',
  'sadness_neglected_lonely',
  'sadness_hopeless_anguished',
  'sadness_hopeless_powerless',
  'surprise_stunned_shocked',
  'surprise_stunned_dismayed',
  'surprise_confused_disillusioned',
  'surprise_confused_perplexed',
  'surprise_amazed_astonished',
  'surprise_amazed_awe-struck',
  'surprise_overcome_speechless',
  'surprise_overcome_astounded',
  'surprise_moved_stimulated',
  'surprise_moved_touched',
  'joy_content_thankful',
  'joy_content_pleased',
  'joy_happy_amused',
  'joy_happy_delighted',
  'joy_cheerful_jovial',
  'joy_cheerful_playful',
  'joy_proud_trimphant',
  'joy_proud_illustrious',
  'joy_optimistic_eager',
  'joy_optimistic_hopeful',
  'joy_enthusiastic_excited',
  'joy_enthusiastic_zealous',
  'joy_elated_euphoric',
  'joy_elated_jubilant',
  'joy_enthralled_enchanted',
  'joy_enthralled_rapturous',
  'love_desirous_passionate',
  'love_desirous_infatuated',
  'love_romantic_attractive',
  'love_romantic_enamored',
  'love_longing_sentimental',
  'love_longing_affectionate',
  'love_tender_caring',
  'love_tender_compassionate',
  'love_peaceful_tranquil',
  'love_peaceful_satisfied',
  'fear_scared_frightened',
  'fear_scared_helpless',
  'fear_terrified_panic',
  'fear_terrified_hysterical',
  'fear_insecure_inferior',
  'fear_insecure_indadequate',
  'fear_nervous_worried',
  'fear_nervous_anxious',
  'fear_horrified_mortified',
  'fear_horrified_dreadful',
];
export const EmotionHow = ['midly', 'moderately', 'intensely', 'hysterically'];

export const AnalyzeDummyData = {
  '20190305': 2,
  '20190506': 6,
  '20200120': 10,
  '20200122': 20,
  '20200123': 30,
  '20200303': 1,
  '20200308': 10,
  '20200313': 9,
  '20200320': 1,
  '20200323': 12,
  '20200325': 5,
};

export const BasicProfileCards = {
  personal: {
    practice: '1',
    title: 'personal_story',
    iconType: 'FontAwesome5',
    icon: 'baby',
    minutes: 5,
    width: 250,
    redirectTo: '',
  },
  feedback: {
    practice: '2-1',
    title: 'feedback_preference',
    iconType: 'Ionicon',
    icon: 'ios-git-compare',
    minutes: 2,
    width: 150,
    redirectTo: '',
  },
  behavior: {
    practice: '2-2',
    title: 'behavior_preference',
    iconType: 'FontAwesome5',
    icon: 'thumbs-up',
    minutes: 2,
    width: 150,
    redirectTo: '',
  },
  risk: {
    practice: '3',
    title: 'risk_tolerance',
    iconType: 'FontAwesome5',
    icon: 'skiing',
    minutes: 2,
    width: 250,
    redirectTo: '',
  },
  attach: {
    practice: '4-1',
    title: 'attachment_style',
    iconType: 'FontAwesome5',
    icon: 'paperclip',
    minutes: 2,
    width: 150,
    redirectTo: '',
  },
  approach: {
    practice: '4-2',
    title: 'approach_to_conflict',
    iconType: 'FontAwesome5',
    icon: 'hand-middle-finger',
    minutes: 4,
    width: 150,
    redirectTo: '',
  },
};
