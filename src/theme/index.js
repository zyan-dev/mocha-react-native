const commonTheme = {
  border: '#AAAAAA',
  card: 'rgba(0, 0, 0, 0.3)',
  danger: '#6E1D12',
  sidemenu_bg: 'rgba(240, 245, 245, 1)',
  sidemenu_border: 'rgba(0, 0, 0, 0.8)',
  sidemenu_color: '#283148',
  chart_gradient_start_color: '#006622',
  chart_gradient_end_color: '#000000',
  chart_bg: 'rgba(255,255,255,0.2)',
};

export const colorThemes = [
  {
    ...commonTheme,
    theme_name: 'Default',
    text: '#F4E8D7',
    background: '#283147',
    profileIcon: '#D0C4B2',
    navbar: '#D0C4B2',
    toggle_on: '#1A5F11',
    toggle_off: '#646A6E',
  },
  {
    ...commonTheme,
    theme_name: 'Light',
    text: '#FFFFFF',
    background: '#336B87',
    profileIcon: '#FFFFFF',
    navbar: '#FFFFFF',
    toggle_on: '#079311',
    toggle_off: '#8B9296',
  },
  {
    ...commonTheme,
    theme_name: 'Stone',
    text: '#555555',
    background: '#DCD9DD',
    border: '#888888',
    navbar: '#4E4848',
    profileIcon: '#4E4848',
    toggle_on: '#079311',
    toggle_off: '#8B9296',
  },
  {
    ...commonTheme,
    theme_name: 'Shadow',
    text: '#FFFFFF',
    background: '#353336',
    profileIcon: '#FFFFFF',
    navbar: '#FFFFFF',
    toggle_on: '#1A5F11',
    toggle_off: '#909090',
  },
];

export const baseTheme = {
  FONT_SIZE_TINY: 8,
  FONT_SIZE_SMALL: 12,
  FONT_SIZE_MEDIUM: 14,
  FONT_SIZE_LARGE: 18,
  FONT_SIZE_EXTRA_LARGE: 24,
  FONT_SIZE_MASSIVE: 34,

  FONT_WEIGHT_LIGHT: '200',
  FONT_WEIGHT_MEDIUM: '500',
  FONT_WEIGHT_BOLD: '700',

  PRIMARY_FONT_FAMILY: 'AvertaDemo-Regular',
  PRIMARY_FONT_FAMILY_BOLD: 'AvertaDemo-ExtraBoldItalic',

  SECONDARY_FONT_FAMILY: 'Product-Sans-Regular',
  SECONDARY_FONT_FAMILY_ITALIC: 'Product-Sans-Italic',
};
