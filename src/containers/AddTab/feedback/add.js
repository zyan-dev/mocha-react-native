import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {userActions, feedbackActions} from 'Redux/actions';
import {MCRootView} from 'components/styled/View';
import {MCHeader, MCImage} from 'components/common';
import {H2, H3, MCIcon} from 'components/styled/Text';
import {MCContent, MCView, MCCard} from 'components/styled/View';
import NavigationService from 'navigation/NavigationService';
import {dySize} from 'utils/responsive';

class AddFeedbackScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.setSeletedUsers([]);
  }

  onPressAddUser = () => {
    NavigationService.navigate('SelectUser', {multiple: true});
  };

  onPressAddQuestion = () => {
    NavigationService.navigate('SelectQuestion');
  };

  render() {
    const {
      t,
      selectedUsers,
      deselectUser,
      selectedQuestions,
      deselectQuestion,
      requestFeedback,
    } = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          title={t('add_reflection_feedback_header')}
          hasRight={selectedUsers.length * selectedQuestions.length > 0}
          rightText={t('send')}
          onPressRight={() => requestFeedback()}
        />
        <MCContent contentContainerStyle={{padding: dySize(10)}}>
          <H2 align="center">{t('add_feedback_heading')}</H2>
          <H3 mt={20}>{t('add_feedback_who')}</H3>
          <MCView row wrap mt={10}>
            {selectedUsers.map(user => (
              <MCView mr={10} align="center">
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
                justify="center">
                <MCIcon name="ios-add" size={40} />
              </MCView>
            </TouchableOpacity>
          </MCView>
          <H3 mt={20} mb={10}>
            {t('add_feedback_questionTitle')}
          </H3>
          {selectedQuestions.map(question => (
            <MCCard mb={10} row shadow align="center">
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
              justify="center">
              <MCIcon name="ios-add" size={40} />
            </MCView>
          </TouchableOpacity>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  selectedUsers: state.usersReducer.selectedUsers,
  selectedQuestions: state.feedbackReducer.selectedQuestions,
});

const mapDispatchToProps = {
  deselectUser: userActions.deselectUser,
  deselectQuestion: feedbackActions.deselectQuestion,
  requestFeedback: feedbackActions.requestFeedback,
  setSeletedUsers: userActions.setSeletedUsers,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(AddFeedbackScreen),
);
