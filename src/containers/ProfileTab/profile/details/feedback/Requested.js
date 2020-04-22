import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {feedbackActions} from 'Redux/actions';
import {MCRootView, MCView, MCContent, MCCard} from 'components/styled/View';
import {MCImage, MCIcon} from 'components/common';
import {H3, H5} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import NavigationService from 'navigation/NavigationService';
import {dySize} from 'utils/responsive';
import {selector} from 'Redux/selectors';
import {FlatList} from 'react-native-gesture-handler';
import moment from 'moment';

class FeedbackRequestedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderFeedbackItem = ({item}) => {
    const feedback = item;
    const {t, theme, removeFeedbackRequest} = this.props;
    return (
      <MCView bordered br={10} mb={20}>
        <MCCard shadow br={1} style={{width: '100%'}}>
          <MCView row align="center">
            <MCButton
              onPress={() =>
                NavigationService.navigate('UserProfile', {
                  id: feedback.receiver._id,
                })
              }>
              <MCImage
                image={{uri: feedback.receiver.avatar}}
                width={30}
                height={30}
                type="avatar"
                round
              />
            </MCButton>
            <H3 ml={10} style={{flex: 1}}>
              {feedback.receiver.name || t('unknown_user')}
            </H3>
            <MCButton onPress={() => removeFeedbackRequest(feedback._id)}>
              <MCIcon name="ios-trash" />
            </MCButton>
          </MCView>
        </MCCard>
        <H3 ph={10} mt={5} mb={5}>
          {feedback.question}
        </H3>
        <H5
          ph={10}
          align="right"
          color={theme.colors.border}
          style={{width: '100%'}}>
          {moment(feedback.updated).format('YYYY-MM-DD hh:mm A')}
        </H5>
      </MCView>
    );
  };

  render() {
    const {requestedFeedbacks} = this.props;
    return (
      <MCRootView justify="flex-start" align="flex-start">
        <MCContent
          contentContainerStyle={{
            paddingVertical: dySize(10),
            paddingHorizontal: dySize(15),
          }}>
          <FlatList
            data={requestedFeedbacks}
            renderItem={this._renderFeedbackItem}
            keyExtractor={item => item._id}
          />
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  requestedFeedbacks: selector.feedbacks.getMyFeedbacks(state).requested,
});

const mapDispatchToProps = {
  removeFeedbackRequest: feedbackActions.removeFeedbackRequest,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(FeedbackRequestedScreen),
);
