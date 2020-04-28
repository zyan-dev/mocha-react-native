import React from 'react';
import Toast from 'react-native-root-toast';
import {MCView} from 'components/styled/View';
import {H3, H4} from 'components/styled/Text';
import {dySize} from 'utils/responsive';
import moment from 'moment';
import i18next from 'i18next';
import {WeekDays} from '../utils/constants';

export const showAlert = text => {
  Toast.show(text, {
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

export const validURL = str => {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return !!pattern.test(str);
};

export const getStringIndexOf = (str1, str2) => {
  return str1.toLowerCase().indexOf(str2.toLowerCase());
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

export const getTodayStartDateStamp = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.getTime();
};

export const getWeekStartDateStamp = () => {
  return getTodayStartDateStamp() - new Date().getDay() * 86400 * 1000;
};

export const getUpdatedMeasures = (measures, origin) => {
  const todayKey = getCommitKey(new Date());
  let temp = {};
  measures.map(measure => {
    const find = origin.data.measures.find(i => i.title === measure.title);
    if (find) {
      // existing measure
      if (find.completed && !measure.completed) {
        const findKey = getCommitKey(new Date(find.completed));
        temp = {
          ...temp,
          [findKey]: temp[findKey] ? temp[todayKey] - 1 : -1,
        };
      } else if (!find.completed && measure.completed) {
        temp = {
          ...temp,
          [todayKey]: temp[todayKey] ? temp[todayKey] + 1 : 1,
        };
      }
    } else {
      // new measure
      if (measure.completed) {
        temp = {
          ...temp,
          [todayKey]: temp[todayKey] ? temp[todayKey] + 1 : 1,
        };
      }
    }
  });
  return temp;
};

export const getTitleByKey = (reflectionType, key) => {
  const prefixArray = {
    value: 'mocha_value_',
    manual: 'mocha_manual_',
  };
  const customAppendKeyArray = {
    value: 'custom_value_title',
    manual: 'custom_manual_title',
  };
  if (key.length === 0) return '';
  else if (key.indexOf(customAppendKeyArray[reflectionType]) < 0) {
    return i18next.t(`${prefixArray[reflectionType]}${key.replace(/ /g, '_')}`);
  } else {
    return key.split(customAppendKeyArray[reflectionType])[1];
  }
};

export const getWeekDay = t => {
  // t can be 0~6 or timestamp
  let weekDay = 0;
  if (t > 7) weekDay = new Date(t).getDay();
  else weekDay = t;
  return WeekDays[weekDay].long.toLowerCase();
};

export const getStringWithOutline = (
  textData,
  center = 'center',
  bold = true,
  underline = false,
  tag = false,
) => {
  // outline can be bold or underline
  let str = textData.title;
  const snippets = [];
  let boldWord = '';
  let boldIndex = 0;
  if (!str) return;
  if (textData.boldWordKeys) {
    textData.boldWordKeys.map(key => {
      boldWord = i18next.t(`outline_${key}`);
      boldIndex = str.indexOf(boldWord);
      if (boldIndex > 0) {
        snippets.push(str.substr(0, boldIndex));
      }
      if (tag) {
        snippets.push(
          <H3
            weight={bold ? 'bold' : 'regular'}
            underline={underline}
            align="center">
            {str.substr(boldIndex, boldWord.length)}
          </H3>,
        );
      } else {
        snippets.push(
          <H4
            weight={bold ? 'bold' : 'regular'}
            underline={underline}
            align="center">
            {str.substr(boldIndex, boldWord.length)}
          </H4>,
        );
      }
      str = str.substr(boldIndex + boldWord.length);
    });
  }

  snippets.push(str);
  if (tag) {
    return (
      <MCView row style={{width: '100%'}}>
        <H3 align={center}>{snippets.map(snippet => snippet)}</H3>
      </MCView>
    );
  } else {
    return (
      <MCView row style={{width: '100%'}}>
        <H4 align={center}>{snippets.map(snippet => snippet)}</H4>
      </MCView>
    );
  }
};
