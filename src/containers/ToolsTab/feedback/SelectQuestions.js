import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import NavigationService from 'navigation/NavigationService';
import {feedbackActions} from 'Redux/actions';
import {MCHeader, MCModal, MCIcon} from 'components/common';
import {H3} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCRootView, MCContent, MCView, MCCard} from 'components/styled/View';
import {MCTextInput} from '../../../components/styled/Text';
import {showAlert} from 'services/operators';

class SelectQuestionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origin_questions: props.selectedQuestions,
      showNewModal: false,
      newQuestion: '',
    };
  }

  onPressBack = () => {
    NavigationService.goBack();
  };

  select = question => {
    this.props.selectQuestion(question);
  };

  deselect = question => {
    this.props.deselectQuestion(question);
  };

  onAddNewQuestion = () => {
    const {newQuestion} = this.state;
    const {t, questions} = this.props;
    const filtered = questions.filter(question => {
      return (
        String(t(question).toLowerCase()) === String(newQuestion.toLowerCase())
      );
    });
    if (newQuestion.length === 0) {
      return;
    } else if (filtered.length > 0) {
      showAlert(t('alert_existing_feedback_question'));
      return;
    }
    this.props.createQuestion(newQuestion);
    this.setState({showNewModal: false});
  };

  render() {
    const {showNewModal} = this.state;
    const {t, theme, questions, selectedQuestions} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          rightIcon="plus"
          rightText={t('button_new')}
          onPressRight={() => this.setState({showNewModal: true})}
          onPressBack={() => this.onPressBack()}
          title={t('add_feedback_select_title')}
        />
        <MCContent contentContainerStyle={{paddingHorizontal: 10}}>
          {questions.map((question, index) => {
            const filtered = selectedQuestions.filter(q => q === question);
            return (
              <MCCard key={index} row align="center" shadow mt={10} p={0}>
                <H3 ml={10} style={{flex: 1}}>
                  {t(question)}
                </H3>
                {filtered.length > 0 ? (
                  <MCButton onPress={() => this.deselect(question)}>
                    <MCIcon
                      name="ios-checkmark-circle-outline"
                      color={theme.colors.border}
                      size={30}
                    />
                  </MCButton>
                ) : (
                  <MCButton onPress={() => this.select(question)}>
                    <MCIcon
                      name="ios-add-circle-outline"
                      color={theme.colors.toggle_on}
                      size={30}
                    />
                  </MCButton>
                )}
              </MCCard>
            );
          })}
        </MCContent>
        <MCModal
          isVisible={showNewModal}
          onClose={() => this.setState({showNewModal: false})}>
          <MCView align="center" width={300} mt={20} ph={10} pv={10}>
            <H3 mb={10}>{t('new_question')}</H3>
            <MCTextInput
              multiline
              textAlignVertical="top"
              width={300}
              onChangeText={text => this.setState({newQuestion: text})}
            />
            <MCButton
              bordered
              mt={20}
              pl={20}
              pr={20}
              onPress={() => this.onAddNewQuestion()}>
              <H3>{t('button_add')}</H3>
            </MCButton>
          </MCView>
        </MCModal>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  selectedQuestions: state.feedbackReducer.selectedQuestions,
  questions: state.feedbackReducer.questions,
  theme: state.routerReducer.theme,
});

const mapDispatchToProps = {
  selectQuestion: feedbackActions.selectQuestion,
  setSeletedQuestions: feedbackActions.setSeletedQuestions,
  deselectQuestion: feedbackActions.deselectQuestion,
  createQuestion: feedbackActions.createQuestion,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SelectQuestionScreen),
);
