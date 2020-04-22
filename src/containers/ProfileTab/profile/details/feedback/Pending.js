import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {FlatList} from 'react-native-gesture-handler';
import moment from 'moment';
import {feedbackActions} from 'Redux/actions';
import {MCRootView, MCView, MCContent, MCCard} from 'components/styled/View';
import {MCImage, MCIcon} from 'components/common';
import {H3, H5, MCTextInput} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import NavigationService from 'navigation/NavigationService';
import {dySize} from 'utils/responsive';
import {selector} from 'Redux/selectors';

class FeedbackPendingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: {
        id: '', // feedback id
        feedback: '', // feedback text
      },
    };
  }

  onPressEditIcon = feedback => {
    const {editing} = this.state;
    const {submitFeedback} = this.props;
    if (editing.id === feedback._id) {
      // user pressed send icon
      submitFeedback(editing);
    } else {
      this.setState({editing: {id: feedback._id, feedback: ''}});
    }
  };

  onPressCancelIcon = () => {
    this.setState({editing: {id: '', feedback: ''}});
  };

  onChangeFeedback = text => {
    const {editing} = this.state;
    this.setState({
      editing: {
        id: editing.id,
        feedback: text,
      },
    });
  };

  _renderFeedbackItem = ({item}) => {
    const feedback = item;
    const {t, theme} = this.props;
    const {editing} = this.state;
    return (
      <MCView bordered br={10} mb={20}>
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
            <H3 ml={10} style={{flex: 1}}>
              {feedback.sender.name || t('unknown_user')}
            </H3>
            {editing.id === feedback._id && (
              <MCButton onPress={() => this.onPressCancelIcon()}>
                <MCIcon name="ios-close-circle-outline" />
              </MCButton>
            )}
            <MCButton onPress={() => this.onPressEditIcon(feedback)}>
              <MCIcon
                name={editing.id === feedback._id ? 'paper-plane' : 'edit'}
                type="FontAwesome"
              />
            </MCButton>
          </MCView>
        </MCCard>
        <H3 ph={10} mt={5} mb={5}>
          {feedback.question}
        </H3>
        {editing.id === feedback._id && (
          <MCView row ml={10} mr={10}>
            <MCTextInput
              multiline
              textAlignVertical="top"
              maxLength={1024}
              style={{width: '100%'}}
              onChangeText={text => this.onChangeFeedback(text)}
            />
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
  requestedFeedbacks: selector.feedbacks.getMyFeedbacks(state).pending,
});

const mapDispatchToProps = {
  submitFeedback: feedbackActions.submitFeedback,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(FeedbackPendingScreen),
);
