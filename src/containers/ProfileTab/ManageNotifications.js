import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import moment from 'moment';
import ToggleSwitch from 'toggle-switch-react-native';
import * as _ from 'lodash';
import {notificationActions} from 'Redux/actions';
import {MCHeader, MCDateTimePicker, MCIcon} from 'components/common';
import {H3, H4} from 'components/styled/Text';
import {MCRootView, MCContent, MCView, MCCard} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import NavigationService from 'navigation/NavigationService';

const NotificationKeys = [
  'supportReminder',
  'dailyReflection',
  'feedbackReceived',
  'feedbackRequested',
  'addTrustMember',
  'habit',
  'reaction',
];

class ManageNotifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateKey: undefined,
      showTimePicker: false,
    };
  }
  componentDidMount() {
    this.props.getNotificationSettings();
  }

  saveAndBack = () => {
    this.props.updateNotificationSettings();
    NavigationService.goBack();
  };

  onPressTime = key => {
    this.setState({dateKey: key, showTimePicker: true});
  };

  onToggle = (key, enabled) => {
    const {notifications} = this.props;
    notifications[key] = {
      ...notifications[key],
      enabled,
    };
    this.props.setNotificationSettings(notifications);
  };

  onChangeTime = time => {
    const {dateKey} = this.state;
    const {notifications} = this.props;
    const daily_time = new Date(time).toISOString().split('T')[1];
    notifications[dateKey] = {
      ...notifications[dateKey],
      daily_time,
    };
    this.props.setNotificationSettings(notifications);
    this.hideDatePicker();
  };

  hideDatePicker = () => {
    this.setState({showTimePicker: false});
  };

  render() {
    const {dateKey, showTimePicker} = this.state;
    const {t, theme, notifications} = this.props;
    const todayDate = new Date().toISOString().split('T')[0];
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          title={t('profile_menu_manage_notifications')}
          onPressBack={() => this.saveAndBack()}
        />
        <MCContent>
          <MCView align="center">
            <MCView width={345} mb={100}>
              <H4>{t('notification_topText')}</H4>
              {Object.keys(_.pick(notifications, NotificationKeys)).map(key => {
                const setting = notifications[key];
                if (key === 'supportReminderSecond') return;
                return (
                  <MCCard key={key} shadow mt={10}>
                    <MCView row>
                      <MCView style={{flex: 1}} ph={10}>
                        <H3>{t(`notification_${key}_title`)}</H3>
                        <H4 color={theme.colors.border}>
                          {t(`notification_${key}_description`)}
                        </H4>
                      </MCView>
                      {key !== 'supportReminder' && key !== 'dailyReflection' && (
                        <MCView mt={10} mr={10}>
                          <ToggleSwitch
                            isOn={setting.enabled}
                            onColor={theme.colors.toggle_on}
                            offColor={theme.colors.toggle_off}
                            size="medium"
                            onToggle={isOn => this.onToggle(key, isOn)}
                          />
                        </MCView>
                      )}
                    </MCView>
                    {(key === 'dailyReflection' ||
                      key === 'supportReminder') && (
                      <MCView
                        row
                        align="center"
                        mt={10}
                        style={{
                          borderTopColor: theme.colors.border,
                          borderTopWidth: 1,
                        }}>
                        <MCButton
                          row
                          align="center"
                          style={{flex: 1}}
                          ph={-10}
                          onPress={() => this.onPressTime(key)}>
                          <MCIcon name="md-alarm" />
                          <H4 style={{flex: 1}}>
                            {moment(
                              `${todayDate}T${setting.daily_time}`,
                            ).format('hh:mm A')}
                          </H4>
                        </MCButton>
                        <MCView mt={10} mr={10}>
                          <ToggleSwitch
                            isOn={setting.enabled}
                            onColor={theme.colors.toggle_on}
                            offColor={theme.colors.toggle_off}
                            size="medium"
                            onToggle={isOn => this.onToggle(key, isOn)}
                          />
                        </MCView>
                      </MCView>
                    )}
                    {key === 'supportReminder' && (
                      <MCView
                        row
                        align="center"
                        mt={10}
                        style={{
                          borderTopColor: theme.colors.border,
                          borderTopWidth: 1,
                        }}>
                        <MCButton
                          row
                          align="center"
                          style={{flex: 1}}
                          ph={-10}
                          onPress={() =>
                            this.onPressTime('supportReminderSecond')
                          }>
                          <MCIcon name="md-alarm" />
                          <H4 style={{flex: 1}}>
                            {moment(
                              `${todayDate}T${
                                notifications['supportReminderSecond']
                                  .daily_time
                              }`,
                            ).format('hh:mm A')}
                          </H4>
                        </MCButton>
                        <MCView mt={10} mr={10}>
                          <ToggleSwitch
                            isOn={
                              notifications['supportReminderSecond'].enabled
                            }
                            onColor={theme.colors.toggle_on}
                            offColor={theme.colors.toggle_off}
                            size="medium"
                            onToggle={isOn =>
                              this.onToggle('supportReminderSecond', isOn)
                            }
                          />
                        </MCView>
                      </MCView>
                    )}
                  </MCCard>
                );
              })}
            </MCView>
          </MCView>
        </MCContent>
        {dateKey && (
          <MCDateTimePicker
            isVisible={showTimePicker}
            mode="time"
            minimumDate={new Date('2001-01-01T00:00:00.000Z')}
            date={new Date(`${todayDate}T${notifications[dateKey].daily_time}`)}
            onConfirm={this.onChangeTime}
            onCancel={this.hideDatePicker}
          />
        )}
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  notifications: state.notificationReducer,
});

const mapDispatchToProps = {
  getNotificationSettings: notificationActions.getNotificationSettings,
  setNotificationSettings: notificationActions.setNotificationSettings,
  updateNotificationSettings: notificationActions.updateNotificationSettings,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ManageNotifications),
);
