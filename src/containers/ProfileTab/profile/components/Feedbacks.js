import React from 'react';
import PropTypes from 'prop-types';
import {FlatList} from 'react-native';
import {withTranslation} from 'react-i18next';
import {MCCard, MCView} from 'components/styled/View';
import {H3, H4, H5, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCModal, MCImage} from 'components/common';
import {dySize} from 'utils/responsive';

class FeedbacksCard extends React.Component {
  static propTypes = {
    onPressDetails: PropTypes.func,
    onPressNew: PropTypes.func,
    editable: PropTypes.bool,
    feedbacks: PropTypes.arrayOf(Object),
  };

  static defaultProps = {
    onPressDetails: () => undefined,
    onPressNew: () => undefined,
    feedbacks: [],
    editable: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedFeedback: null,
      showModal: false,
    };
  }

  onPressItem = (feedback) => {
    this.setState({selectedFeedback: feedback, showModal: true});
  };

  _renderItem = ({item}) => {
    const feedback = item;
    return (
      <MCCard width={140} mr={15} align="center">
        <MCButton
          key={feedback._id}
          align="center"
          onPress={() => this.onPressItem(feedback)}>
          <MCImage
            round
            width={100}
            height={100}
            image={{uri: feedback.receiver.avatar}}
          />
          <H4 align="center" numberOfLines={3} width={120}>
            {feedback.question}
          </H4>
        </MCButton>
      </MCCard>
    );
  };

  render() {
    const {t, feedbacks, editable, onPressNew, onPressDetails} = this.props;
    const {selectedFeedback, showModal} = this.state;
    return (
      <MCView align="center">
        <MCView row align="center" mb={20}>
          <H3 weight="bold" style={{flex: 1}}>
            {t('profile_card_feedback')}
          </H3>
          {editable && (
            <MCButton onPress={() => onPressDetails()}>
              <H5 underline>{t('view_all')}</H5>
            </MCButton>
          )}
        </MCView>
        <FlatList
          data={feedbacks.slice(0, 4)}
          renderItem={this._renderItem}
          keyExtractor={(item) => item._id}
          numColumns={2}
          style={{width: dySize(300)}}
          ListEmptyComponent={
            <MCButton align="center" bordered onPress={() => onPressNew()}>
              <MCEmptyText>{t('profile_card_empty_feedback')}</MCEmptyText>
              <MCEmptyText>{t('profile_card_empty_feedback_1')}</MCEmptyText>
            </MCButton>
          }
        />
        {selectedFeedback && (
          <MCModal
            isVisible={showModal}
            onClose={() => this.setState({showModal: false})}>
            <MCView align="center" width={280} mt={20}>
              <MCImage
                round
                image={{uri: selectedFeedback.receiver.avatar}}
                br={6}
              />
              <H3 weight="bold" mt={10}>
                {selectedFeedback.question}
              </H3>
              <H4>{selectedFeedback.feedback}</H4>
            </MCView>
          </MCModal>
        )}
      </MCView>
    );
  }
}

export default withTranslation()(FeedbacksCard);
