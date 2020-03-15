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
import NavigationService from '../../../../../navigation/NavigationService';

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
        title: t('tab_feedback_received'),
      },
      {
        key: 'requested',
        title: t('tab_feedback_requested'),
      },
      {
        key: 'pending',
        title: t('tab_feedback_pending'),
      },
      {
        key: 'sent',
        title: t('tab_feedback_sent'),
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
        renderLabel={({route, focused, color}) => {
          const count = this.props[route.key].length;
          return (
            <>
              <H5 color={focused ? theme.colors.text : theme.colors.border}>
                {route.title}
              </H5>
              <H5 pv={1} align="center">
                {`( ${count} )`}
              </H5>
            </>
          );
        }}
      />
    );
    return (
      <View style={{flex: 1}}>
        <MCHeader
          title={t('add_feedback_headerTitle')}
          onPressBack={() => NavigationService.navigate('Profile')}
        />
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
