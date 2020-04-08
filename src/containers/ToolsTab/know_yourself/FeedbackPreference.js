import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import AudioRecord from 'react-native-audio-record';
import {reflectionActions} from 'Redux/actions';
import {selector} from 'Redux/selectors';
import {MCView, MCCard, MCRootView, MCContent} from 'components/styled/View';
import {H3, H4, MCIcon} from 'components/styled/Text';
import {MCHeader, MCImage} from 'components/common';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import {MCTextInput} from '../../../components/styled/Text';
import {MCTagInput} from '../../../components/common';

var Sound = require('react-native-sound');
Sound.setCategory('Playback');

class FeedbackPreferenceScreen extends React.Component {
  componentWillMount() {
    const {
      myFeedbackPreference,
      selectReflection,
      setInitialReflection,
    } = this.props;
    if (myFeedbackPreference) {
      selectReflection(myFeedbackPreference);
    } else {
      setInitialReflection('feedback_preference');
    }
  }

  render() {
    const {
      t,
      selectedReflection,
      updateSelectedReflection,
      addOrUpdateReflection,
    } = this.props;
    if (selectedReflection.type.toLowerCase() !== 'feedbackpreference')
      return null;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          rightIcon="ios-send"
          hasRight={false}
          onPressRight={() => addOrUpdateReflection()}
        />
        <MCContent contentContainerStyle={{paddingHorizontal: dySize(20)}}>
          <H3>coming soon</H3>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedReflection: state.reflectionReducer.selectedReflection,
  myFeedbackPreference: selector.reflections.findMySpecialReflections(
    state,
    'FeedbackPreference',
  ),
});

const mapDispatchToProps = {
  selectReflection: reflectionActions.selectReflection,
  setInitialReflection: reflectionActions.setInitialReflection,
  updateSelectedReflection: reflectionActions.updateSelectedReflection,
  addOrUpdateReflection: reflectionActions.addOrUpdateReflection,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(FeedbackPreferenceScreen),
);
