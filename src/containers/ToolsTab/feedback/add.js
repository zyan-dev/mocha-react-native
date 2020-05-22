import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {userActions, feedbackActions} from 'Redux/actions';
import {MCRootView} from 'components/styled/View';
import {MCHeader, MCImage, MCIcon} from 'components/common';
import {H2, H3} from 'components/styled/Text';
import {MCContent, MCView, MCCard} from 'components/styled/View';
import NavigationService from 'navigation/NavigationService';
import {dySize} from 'utils/responsive';

class AddFeedbackScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };
  }

  componentDidMount() {
    this.props.setSeletedUsers([]);
    this.props.setSeletedQuestions([]);
  }

  onPressAddUser = () => {
    NavigationService.navigate('SelectUser', {multiple: true});
  };

  onPressAddQuestion = () => {
    NavigationService.navigate('SelectQuestion');
  };

  onPressSend = () => {
    this.setState({submitted: true});
    if (!this.validateUsers()) return;
    if (!this.validateQuestions()) return;
    this.props.requestFeedback();
    this.setState({submitted: false});
  };

  validateUsers = () => {
    return this.props.selectedUsers.length > 0;
  };

  validateQuestions = () => {
    return this.props.selectedQuestions.length > 0;
  };

  render() {
    const {submitted} = this.state;
    const {
      t,
      theme,
      selectedUsers,
      deselectUser,
      selectedQuestions,
      deselectQuestion,
    } = this.props;
    const userColor =
      !this.validateUsers() && submitted
        ? theme.colors.danger
        : theme.colors.border;
    const questionColor =
      !this.validateQuestions() && submitted
        ? theme.colors.danger
        : theme.colors.border;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          title={t('add_feedback_heading')}
          hasRight
          rightIcon="paper-plane"
          onPressRight={() => this.onPressSend()}
        />
        <MCContent contentContainerStyle={{padding: dySize(10)}}>
          <H3>{t('add_feedback_who')}</H3>
          <MCView row wrap mt={10}>
            {selectedUsers.map(user => (
              <MCView key={user._id} mr={10} align="center">
                <MCImage
                  round
                  width={60}
                  height={60}
                  image={{uri: user.avatar}}
                />
                <TouchableOpacity onPress={() => deselectUser(user)}>
                  <MCIcon name="ios-remove-circle-outline" size={20} />
                </TouchableOpacity>
              </MCView>
            ))}
            <TouchableOpacity onPress={() => this.onPressAddUser()}>
              <MCView
                bordered
                width={60}
                height={60}
                align="center"
                br={30}
                style={{borderColor: userColor}}
                justify="center">
                <MCIcon name="ios-add" size={40} color={userColor} />
              </MCView>
            </TouchableOpacity>
          </MCView>
          <H3 mt={20} mb={10}>
            {t('add_feedback_questionTitle')}
          </H3>
          {selectedQuestions.map((question, index) => (
            <MCCard key={index} mb={10} row shadow align="center">
              <H3 ml={10} style={{flex: 1}}>
                {t(question)}
              </H3>
              <TouchableOpacity onPress={() => deselectQuestion(question)}>
                <MCIcon name="ios-remove-circle-outline" size={20} />
              </TouchableOpacity>
            </MCCard>
          ))}
          <TouchableOpacity onPress={() => this.onPressAddQuestion()}>
            <MCView
              bordered
              width={60}
              height={60}
              align="center"
              br={30}
              style={{borderColor: questionColor}}
              justify="center">
              <MCIcon name="ios-add" size={40} color={questionColor} />
            </MCView>
          </TouchableOpacity>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  selectedUsers: state.usersReducer.selectedUsers,
  selectedQuestions: state.feedbackReducer.selectedQuestions,
});

const mapDispatchToProps = {
  deselectUser: userActions.deselectUser,
  deselectQuestion: feedbackActions.deselectQuestion,
  requestFeedback: feedbackActions.requestFeedback,
  setSeletedQuestions: feedbackActions.setSeletedQuestions,
  setSeletedUsers: userActions.setSeletedUsers,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AddFeedbackScreen),
);
