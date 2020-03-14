import React from 'react';
import {Dimensions, View} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {TabBar, TabView, SceneMap} from 'react-native-tab-view';
import {feedbackActions} from 'Redux/actions';
import {H5} from 'components/styled/Text';
import {selector} from 'Redux/selectors';
import FeedbackReceivedScreen from './Received';
import FeedbackRequestedScreen from './Requested';
import FeedbackPendingScreen from './Pending';
import FeedbackSentScreen from './Sent';
import MCHeader from '../../../../../components/common/MCHeader';

class FeedbackScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  render() {
    const {t, theme, received, requested, pending, sent} = this.props;
    const {index} = this.state;
    const routes = [
      {
        key: 'received',
        title: t('tab_feedback_received', {count: received.length}),
      },
      {
        key: 'requested',
        title: t('tab_feedback_requested', {count: requested.length}),
      },
      {
        key: 'pending',
        title: t('tab_feedback_pending', {count: pending.length}),
      },
      {
        key: 'sent',
        title: t('tab_feedback_sent', {count: sent.length}),
      },
    ];
    const renderTabBar = props => (
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: theme.colors.text}}
        style={{
          backgroundColor: theme.colors.background,
          borderBottomWidth: 0,
          borderColor: 'red',
        }}
        renderLabel={({route, focused, color}) => (
          <H5 color={focused ? theme.colors.text : theme.colors.border}>
            {route.title}
          </H5>
        )}
      />
    );
    return (
      <View style={{flex: 1}}>
        <MCHeader title={t('add_feedback_headerTitle')} />
        <TabView
          navigationState={{index, routes}}
          renderScene={SceneMap({
            received: FeedbackReceivedScreen,
            requested: FeedbackRequestedScreen,
            pending: FeedbackPendingScreen,
            sent: FeedbackSentScreen,
          })}
          onIndexChange={i => this.setState({index: i})}
          initialLayout={Dimensions.get('window')}
          renderTabBar={renderTabBar}
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  requested: selector.feedbacks.getMyFeedbacks(state).requested,
  received: selector.feedbacks.getMyFeedbacks(state).received,
  pending: selector.feedbacks.getMyFeedbacks(state).pending,
  sent: selector.feedbacks.getMyFeedbacks(state).sent,
});
const mapDispatchToProps = {
  getMyFeedbacks: feedbackActions.getMyFeedbacks,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(FeedbackScreen),
);
