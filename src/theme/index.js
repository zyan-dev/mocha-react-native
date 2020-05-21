const commonTheme = {
  border: '#BABABA',
  card: 'rgba(0, 0, 0, 0.2)',
  danger: '#AA3333',
  sidemenu_bg: 'rgba(240, 245, 245, 1)',
  sidemenu_border: 'rgba(0, 0, 0, 0.8)',
  sidemenu_color: '#283148',
  chart_gradient_start_color: '#006622',
  chart_gradient_end_color: '#000000',
  chart_bg: 'rgba(255,255,255,0.2)',
  purchase: '#19D868',
  outline: '#30BE58',
  like: '#F7D24F',
  toggle_on: '#30BE58',
  toggle_off: '#8B8B8B',
};

export const colorThemes = [
  {
    ...commonTheme,
    theme_name: 'Bright',
    text: '#14161A',
    background: '#FFFFFF',
    border: '#BABABA',
    navbar: '#4E4848',
    profileIcon: '#4E4848',
    card: 'rgba(0, 0, 0, 0.1)',
  },
  {
    ...commonTheme,
    theme_name: 'Dark',
    text: '#FFFFFF',
    background: '#1A1D20',
    card: '#192D27',
    profileIcon: '#FFFFFF',
    navbar: '#FFFFFF',
    border: '#B2B2B2',
  },
  {
    ...commonTheme,
    theme_name: 'Blue',
    text: '#F4E8D7',
    background: '#283187',
    profileIcon: '#D0C4B2',
    navbar: '#D0C4B2',
    outline: '#FFFF55',
  },
  // {
  //   ...commonTheme,
  //   theme_name: 'Light',
  //   text: '#FFFFFF',
  //   background: '#336B87',
  //   profileIcon: '#FFFFFF',
  //   navbar: '#FFFFFF',
  //   outline: '#FFFF55',
  // },
];

export const baseTheme = {
  FONT_SIZE_TINY: 8,
  FONT_SIZE_SMALL: 12,
  FONT_SIZE_MEDIUM: 18,
  FONT_SIZE_LARGE: 22,
  FONT_SIZE_EXTRA_LARGE: 26,
  FONT_SIZE_MASSIVE: 32,

  FONT_WEIGHT_LIGHT: '200',
  FONT_WEIGHT_MEDIUM: '500',
  FONT_WEIGHT_BOLD: '700',

  PRIMARY_FONT_FAMILY: 'ProximaNova-Regular',
};
