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

export const getUpdatedHabits = (habits, origin) => {
  const todayKey = getCommitKey(new Date());
  let temp = {};
  habits.map(habit => {
    const find = origin.data.habits.find(i => i.title === habit.title);
    if (find) {
      // existing habit
      if (find.completed && !habit.completed) {
        const findKey = getCommitKey(new Date(find.completed));
        temp = {
          ...temp,
          [findKey]: temp[findKey] ? temp[todayKey] - 1 : -1,
        };
      } else if (!find.completed && habit.completed) {
        temp = {
          ...temp,
          [todayKey]: temp[todayKey] ? temp[todayKey] + 1 : 1,
        };
      }
    } else {
      // new habit
      if (habit.completed) {
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

export const getStringWithOutline = (textData, params = {}) => {
  const align = params.align || 'center';
  const bold = params.bold || true;
  const underline = params.underline || false;
  const bigSize = params.bigSize || false;
  const style = params.style || {};
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
      if (boldIndex > 0 && bigSize) {
        snippets.push(
          <H3 underline={underline} align={align}>
            {str.substr(0, boldIndex)}
          </H3>,
        );
      } else if (boldIndex > 0 && !bigSize) {
        snippets.push(
          <H4 underline={underline} align={align}>
            {str.substr(0, boldIndex)}
          </H4>,
        );
      }
      if (bigSize) {
        snippets.push(
          <H3
            weight={bold ? 'bold' : 'regular'}
            underline={underline}
            align={align}>
            {str.substr(boldIndex, boldWord.length)}
          </H3>,
        );
      } else {
        snippets.push(
          <H4
            weight={bold ? 'bold' : 'regular'}
            underline={underline}
            align={align}>
            {str.substr(boldIndex, boldWord.length)}
          </H4>,
        );
      }
      str = str.substr(boldIndex + boldWord.length);
    });
  }
  if (bigSize) {
    snippets.push(
      <H3 underline={underline} align={align}>
        {str}
      </H3>,
    );
  } else {
    snippets.push(
      <H4 underline={underline} align={align}>
        {str}
      </H4>,
    );
  }
  if (bigSize) {
    return (
      <H3
        align={align}
        style={{
          flexWrap: 'wrap',
          display: 'flex',
          flexDirection: 'row',
        }}>
        {snippets.map(snippet => snippet)}
      </H3>
    );
  } else {
    return (
      <H4
        align={align}
        style={{
          flexWrap: 'wrap',
          display: 'flex',
          flexDirection: 'row',
          justify: 'center',
        }}>
        {snippets.map(snippet => snippet)}
      </H4>
    );
  }
};

export const convertChatMessage = (msg, room) => {
  const owner = room.includes.find(i => i._id === msg.userId);
  if (msg.text === 'who_chat_message_created_room') {
    console.log(msg);
    return i18next.t('who_chat_message_created_room', {
      who: `@${owner.name}`,
    });
  } else if (msg.text.indexOf('chat_message_who_added_whom') > -1) {
    const text = msg.text;
    const keys = text.split('&');
    const who = owner ? owner.name : '???';
    let names = [];
    keys.map((key, index) => {
      if (index === 0) return;
      const find = room.includes.find(i => i._id === key);
      if (find) names.push(find.name);
      else names.push('???');
    });
    console.log({names});
    const whom = names.map((name, index) => {
      if (names.length === 1 && index === 0) return `@${name}`;
      if (index === names.length - 1 && index > 0) return ` and @${name}`;
      else return ` @${name}`;
    });
    return i18next.t('chat_message_who_added_whom', {who, whom});
  } else if (msg.text === 'chat_message_deleted') {
    return i18next.t('chat_message_deleted');
  } else if (msg.edited) {
    return i18next.t('chat_message_edited', {text: msg.text});
  } else {
    return msg.text;
  }
};

export const compareTimeStampWithDate = (ts, date) => {
  return Number(ts) === new Date(date).getTime();
};

export const getDateString = ts => {
  const Today = new Date().getTime();
  var REFERENCE = moment(Today); // fixed just for testing, use moment();
  var TODAY = REFERENCE.clone().startOf('day');
  var YESTERDAY = REFERENCE.clone()
    .subtract(1, 'days')
    .startOf('day');
  if (moment(ts).isSame(TODAY, 'd')) {
    return i18next.t('date_today');
  } else if (moment(ts).isSame(YESTERDAY, 'd')) {
    return i18next.t('date_yesterday');
  } else {
    return moment(ts).format('dddd, MMM DD, YYYY');
  }
};
