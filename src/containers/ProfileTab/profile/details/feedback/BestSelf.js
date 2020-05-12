import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {feedbackActions} from 'Redux/actions';
import {MCRootView, MCView, MCContent} from 'components/styled/View';
import {MCHeader, MCIcon, MCImage, MCTextFormInput} from 'components/common';
import {H3, H4, ErrorText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import {skills as BestSelfSkills} from 'utils/constants';

class BestSelfSubmitScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      request: props.route.params.request,
      feedback: '',
      skills: [],
      submitted: false,
    };
  }

  onPressSubmit = () => {
    const {request, feedback, skills} = this.state;
    this.setState({submitted: true});
    if (!this.validateFeedback()) return;
    if (!this.validateSkills()) return;
    this.props.submitFeedback({
      id: request._id,
      feedback,
      meta: {skills},
    });
  };

  onChangeFeedback = text => {
    this.setState({feedback: text});
  };

  updateSelectedSkills = skill => {
    const {skills} = this.state;
    const index = skills.indexOf(skill);
    if (index < 0) {
      skills.push(skill);
    } else {
      skills.splice(index, 1);
    }
    this.setState({skills});
  };

  validateSkills = () => {
    return this.state.skills.length > 0;
  };

  validateFeedback = () => {
    return this.state.feedback.length > 0;
  };

  render() {
    const {t, theme} = this.props;
    const {request, feedback, skills, submitted} = this.state;
    return (
      <MCRootView justify="flex-start" align="flex-start">
        <MCHeader
          title={t('title_best_self')}
          headerIcon={<MCIcon type="FontAwesome5Pro" name="hammer" />}
          hasRight
          rightIcon="cloud-upload-alt"
          onPressRight={() => this.onPressSubmit()}
        />
        <MCContent
          contentContainerStyle={{
            paddingBottom: dySize(100),
            paddingHorizontal: dySize(15),
          }}>
          <H4>
            {t('label_send_feedback_to')}{' '}
            <H3 weight="italic">{request.sender.name}</H3>
          </H4>
          <MCView row align="center" mt={20}>
            <MCView align="center" width={70}>
              <MCImage
                image={{uri: request.sender.avatar}}
                width={50}
                height={50}
                round
                type="user"
              />
            </MCView>
            <MCView style={{flex: 1}}>
              <MCView bordered br={6} ph={10} style={{width: '100%'}}>
                <H4>{t('mocha_feedback_my-strenhths')}</H4>
              </MCView>
              <MCView bordered br={6} ph={10} mt={10} style={{width: '100%'}}>
                <H4>{t('mocha_feedback_when-i-was-at-best')}</H4>
              </MCView>
            </MCView>
          </MCView>
          <MCTextFormInput
            mt={30}
            multiline
            value={feedback}
            onChange={text => this.onChangeFeedback(text)}
            placeholder="Write your answer here"
            style={{borderRadius: 6}}
            submitted={submitted}
            errorText={t('error_input_required')}
            isInvalid={!this.validateFeedback()}
          />
          <H4>{t('label_select_from_list')}</H4>
          {submitted && !this.validateSkills() && (
            <ErrorText>{t('error_input_select_empty')}</ErrorText>
          )}
          <MCView row wrap>
            {BestSelfSkills.map((skill, index) => {
              const selected = skills.indexOf(skill) > -1;
              const background = selected
                ? theme.colors.outline
                : theme.colors.card;
              const textColor = selected
                ? theme.colors.background
                : theme.colors.text;
              return (
                <MCButton
                  key={index}
                  onPress={() => this.updateSelectedSkills(skill)}
                  align="center"
                  background={background}
                  bordered
                  pt={1}
                  pb={1}
                  mr={15}
                  mt={10}>
                  <H4 color={textColor}>
                    {t(`resource_book_skills_${skill}`)}
                  </H4>
                </MCButton>
              );
            })}
          </MCView>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
});

const mapDispatchToProps = {
  submitFeedback: feedbackActions.submitFeedback,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(BestSelfSubmitScreen),
);
