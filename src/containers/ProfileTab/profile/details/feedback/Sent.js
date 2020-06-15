import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {MCRootView, MCView, MCContent, MCCard} from 'components/styled/View';
import {MCImage, MCReadMoreText, MCTagsView} from 'components/common';
import {H3, H4, H5} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import NavigationService from 'navigation/NavigationService';
import {dySize} from 'utils/responsive';
import {selector} from 'Redux/selectors';
import {FlatList} from 'react-native-gesture-handler';
import moment from 'moment';

class FeedbackSentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderFeedbackItem = ({item}) => {
    const feedback = item;
    const {t, theme} = this.props;
    return (
      <MCView bordered br={10} mb={10}>
        <MCCard shadow br={1} style={{width: '100%'}}>
          <MCView row align="center">
            <MCButton
              onPress={() =>
                NavigationService.navigate('UserProfile', {
                  id: feedback.sender._id,
                })
              }>
              <MCImage
                image={{uri: feedback.sender.avatar}}
                width={30}
                height={30}
                type="avatar"
                round
              />
            </MCButton>
            <H3 ml={10}>{feedback.sender.name || t('unknown_user')}</H3>
          </MCView>
        </MCCard>
        <H3 weight="bold" ph={10} mt={10}>
          {t(feedback.question)}
        </H3>
        <MCView ph={10} pv={10}>
          <MCReadMoreText>
            <H4>{feedback.feedback}</H4>
          </MCReadMoreText>
        </MCView>
        {feedback.question === 'mocha_feedback_best_self' && (
          <MCView row ml={10}>
            <MCTagsView tags={feedback.meta.skills.map(i => t(`skill_${i}`))} />
          </MCView>
        )}
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
    const {sentFeedbacks} = this.props;
    return (
      <MCRootView justify="flex-start" align="flex-start">
        <MCContent
          contentContainerStyle={{
            paddingVertical: dySize(10),
            paddingHorizontal: dySize(15),
          }}>
          <FlatList
            data={sentFeedbacks}
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
  sentFeedbacks: selector.feedbacks.getMyFeedbacks(state).sent,
});

const mapDispatchToProps = {};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(FeedbackSentScreen),
);
