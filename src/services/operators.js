import {Alert} from 'react-native';
import Toast from 'react-native-root-toast';
import {dySize} from 'utils/responsive';
import moment from 'moment';

export const showAlert = text => {
  // Alert.alert('Mocha App', text, [{text: 'OK', onPress: () => {}}]);
  let toast = Toast.show(text, {
    duration: Toast.durations.SHORT,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onShow: () => {
      // calls on toast\`s appear animation start
    },
    onShown: () => {
      // calls on toast\`s appear animation end.
    },
    onHide: () => {
      // calls on toast\`s hide animation start.
    },
    onHidden: () => {
      // calls on toast\`s hide animation end.
    },
  });
};

// Validates email input
export const validateEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// Validates phone input
export const validatePhone = phone => {
  const re = /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/;
  return re.test(String(phone).toLowerCase());
};

// Capitalizes string
export const capitalizeString = text => {
  let res = '';
  text.split(' ').map((snippet, index) => {
    if (index > 0) {
      res += ' ';
    }
    res = res + snippet.charAt(0).toUpperCase() + snippet.substring(1);
    return true;
  });
  return res;
};

export const genetratedDate = () => {
  const date = new Date();
  const dateStr = `${`00${date.getMonth() + 1}`.slice(
    -2,
  )}-${`00${date.getDate()}`.slice(
    -2,
  )}-${date.getFullYear()}_${`00${date.getHours()}`.slice(
    -2,
  )}:${`00${date.getMinutes()}`.slice(-2)}:${`00${date.getSeconds()}`.slice(
    -2,
  )}`;
  return dateStr;
};

export const profileCardWidth = dySize(375) >= 375 ? 100 : 150;
export const profileCardNumPerRow = dySize(375) >= 375 ? 3 : 2;

export const getAfterDate = days => {
  const date = new Date();
  return new Date(date.getTime() + days * 86400 * 1000);
};

export const getWeekNumber = d => {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  // Return array of year and week number
  return weekNo;
};

export const getCommitKey = date => {
  return moment(date).format('YYYYMMDD');
};
