import React from 'react';
import PropTypes from 'prop-types';
import {withTranslation} from 'react-i18next';
import Collapsible from 'react-native-collapsible';
import {MCCard, MCView} from 'components/styled/View';
import {H3, H4, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCImage, MCModal} from 'components/common';
import {profileCardWidth, profileCardNumPerRow} from 'services/operators';
import CardItem from './CardItem';

class SkillAndFeedback extends React.Component {
  static propTypes = {
    skills: PropTypes.arrayOf(Object),
    feedbacks: PropTypes.arrayOf(Object),
    onPressAllSkills: PropTypes.func,
    onPressNewFeedback: PropTypes.func,
    onPressAllFeedbacks: PropTypes.func,
  };

  static defaultProps = {
    skills: [],
    feedbacks: [],
    onPressAllSkills: () => undefined,
    onPressAllFeedbacks: () => undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      skillCollapsed: true,
      feedbackCollapsed: true,
      selectedFeedback: null,
      showFeedbackModal: false,
    };
  }

  onToggleSkillCollapse = collapsed => {
    this.setState({skillCollapsed: collapsed});
    if (!collapsed) {
      this.setState({feedbackCollapsed: true});
    }
  };

  onToggleFeedbackCollapse = collapsed => {
    this.setState({feedbackCollapsed: collapsed});
    if (!collapsed) {
      this.setState({skillCollapsed: true});
    }
  };

  onPressFeedback = value => {
    this.setState({selectedFeedback: value, showFeedbackModal: true});
  };

  _renderFeedbackItem = item => (
    <MCCard width={profileCardWidth} mr={10} align="center">
      <MCButton
        key={item._id}
        align="center"
        onPress={() => this.onPressFeedback(item)}>
        <MCImage
          width={profileCardWidth - 20}
          height={profileCardWidth - 20}
          image={{uri: item.receiver.avatar}}
        />
        <H4 align="center" numberOfLines={3} width={profileCardWidth - 20}>
          {item.question}
        </H4>
      </MCButton>
    </MCCard>
  );

  render() {
    const {
      t,
      skills,
      feedbacks,
      onPressAllFeedbacks,
      onPressAllSkills,
      onPressNewFeedback,
    } = this.props;
    const {
      selectedFeedback,
      skillCollapsed,
      feedbackCollapsed,
      showFeedbackModal,
    } = this.state;
    return (
      <MCView align="center" mt={20}>
        <MCView width={340} row justify="space-between">
          <CardItem
            icon="ios-hammer"
            text={t('profile_card_skill')}
            onPress={() => this.onToggleSkillCollapse(!skillCollapsed)}
          />
          <CardItem
            icon="ios-people"
            text={t('profile_card_feedback')}
            onPress={() => this.onToggleFeedbackCollapse(!feedbackCollapsed)}
          />
        </MCView>
        <Collapsible collapsed={skillCollapsed}>
          {skills.length > 0 && (
            <MCButton
              width={320}
              row
              justify="space-between"
              onPress={() => onPressAllSkills()}>
              <H3>All Skills</H3>
              <MCIcon name="ios-arrow-forward" />
            </MCButton>
          )}
          {skills.length === 0 && (
            <MCButton
              bordered
              align="center"
              mt={10}
              width={300}
              onPress={() => onPressAllSkills()}>
              <H3>Coming soon!</H3>
            </MCButton>
          )}
        </Collapsible>
        <Collapsible collapsed={feedbackCollapsed}>
          <MCView align="center">
            {feedbacks.length > 0 && (
              <MCButton
                width={320}
                row
                justify="space-between"
                onPress={() => onPressAllFeedbacks()}>
                <H3>All Feedbacks</H3>
                <MCIcon name="ios-arrow-forward" />
              </MCButton>
            )}
            <MCView row width={350} justify="center">
              {feedbacks.length > 0 &&
                feedbacks
                  .slice(0, profileCardNumPerRow)
                  .map(value => this._renderFeedbackItem(value))}
              {feedbacks.length === 0 && (
                <MCButton
                  bordered
                  align="center"
                  mt={10}
                  width={300}
                  onPress={() => onPressNewFeedback()}>
                  <H3>You have not added a Feedback</H3>
                </MCButton>
              )}
            </MCView>
          </MCView>
        </Collapsible>
        {selectedFeedback && (
          <MCModal
            isVisible={showFeedbackModal}
            onClose={() => this.setState({showFeedbackModal: false})}>
            <MCView align="center" width={300} mt={20}>
              <MCImage
                image={{uri: selectedFeedback.receiver.avatar}}
                width={50}
                height={50}
              />
              <H4 mt={10}>{selectedFeedback.receiver.name}</H4>
              <H4 weight="bold" mt={20}>
                {selectedFeedback.question}
              </H4>
              <H4 mt={20}>{selectedFeedback.feedback}</H4>
            </MCView>
          </MCModal>
        )}
      </MCView>
    );
  }
}

export default withTranslation()(SkillAndFeedback);
