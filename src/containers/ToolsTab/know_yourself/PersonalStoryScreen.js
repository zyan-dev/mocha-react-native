import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import AudioRecord from 'react-native-audio-record';
import {reflectionActions} from 'Redux/actions';
import {selector} from 'Redux/selectors';
import {MCView, MCRootView, MCContent} from 'components/styled/View';
import {H3, H4, MCIcon, MCTextInput} from 'components/styled/Text';
import {MCHeader, MCTextFormInput, MCTagInput} from 'components/common';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';

var Sound = require('react-native-sound');
Sound.setCategory('Playback');

class PersonalStoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      recorded: false,
      submitted: false,
    };
  }

  isNew = false;

  componentWillMount() {
    const {
      myPersonalStory,
      selectReflection,
      reflectionDraft,
      setInitialReflection,
    } = this.props;
    if (myPersonalStory) {
      selectReflection(myPersonalStory);
    } else {
      this.isNew = true;
      if (reflectionDraft['PersonalStory']) {
        selectReflection(reflectionDraft['PersonalStory']);
      } else {
        setInitialReflection('personalStory');
      }
    }
  }

  componentDidMount() {
    const options = {
      sampleRate: 16000, // default 44100
      channels: 1, // 1 or 2, default 1
      bitsPerSample: 16, // 8 or 16, default 16
      audioSource: 6, // android only (see below)
      wavFile: 'pronounce.wav', // default 'audio.wav'
    };
    AudioRecord.init(options);
  }

  onPressRecord = () => {
    const {recording} = this.state;
    if (!recording) {
      AudioRecord.start();
      this.setState({recording: true, recorded: false});
    } else {
      AudioRecord.stop();
      this.setState({recording: false, recorded: true});
    }
  };

  onPressPlayback = () => {
    if (this.whoosh) {
      this.whoosh.stop();
      this.whoosh.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    } else {
      this.whoosh = new Sound('pronounce.wav', Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        // loaded successfully
        console.log(
          'duration in seconds: ' +
            this.whoosh.getDuration() +
            'number of channels: ' +
            this.whoosh.getNumberOfChannels(),
        );
      });
      this.whoosh.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }
  };

  onUpdateChildhoodHobbies = state => {
    this.props.updateSelectedReflection({childhood_hobbies: state.tagsArray});
  };

  onPressBack = () => {
    const {selectedReflection, saveReflectionDraft} = this.props;
    if (this.isNew) {
      saveReflectionDraft({
        [selectedReflection.type]: selectedReflection,
      });
    }
    NavigationService.goBack();
  };
  validateTown = () => {
    return this.props.selectedReflection.data.hometown.length > 0;
  };

  validateJob = () => {
    return this.props.selectedReflection.data.first_job.length > 0;
  };

  validateChallenge = () => {
    return this.props.selectedReflection.data.biggest_challenge.length > 0;
  };

  onPressSubmit = () => {
    this.setState({submitted: true});
    if (!this.validateTown()) return;
    if (!this.validateJob()) return;
    if (!this.validateChallenge()) return;
    this.props.addOrUpdateReflection();
  };

  render() {
    const {
      t,
      selectedReflection,
      updateSelectedReflection,
      addOrUpdateReflection,
    } = this.props;
    const {recording, recorded, submitted} = this.state;
    const {
      hometown,
      number_of_kids,
      childhood_hobbies,
      first_job,
      biggest_challenge,
    } = selectedReflection.data;
    if (selectedReflection.type.toLowerCase() !== 'personalstory') return null;
    const isErrorTown = !this.validateTown();
    const isErrorJob = !this.validateJob();
    const isErrorChallenge = !this.validateChallenge();
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          title={`${t('practice')} 1`}
          onPressBack={() => this.onPressBack()}
          rightIcon="cloud-upload-alt"
          hasRight
          onPressRight={() => this.onPressSubmit()}
        />
        <MCContent contentContainerStyle={{paddingHorizontal: dySize(20)}}>
          <MCView row justify="center" align="center" mb={20}>
            <H3>{t('tools_tab_personal_story')}</H3>
            <MCIcon type="FontAwesome5" name="baby" size={30} />
          </MCView>
          <H4>{t('tools_tab_how_pronounce')}</H4>
          <MCView row justify="center" align="center">
            <MCButton onPress={() => this.onPressRecord()}>
              <MCIcon name={recording ? 'ios-square' : 'ios-mic'} size={40} />
            </MCButton>
            <MCButton
              onPress={() => this.onPressPlayback()}
              disabled={!recorded}>
              <MCIcon name="ios-volume-high" size={40} ml={30} />
            </MCButton>
          </MCView>
          <MCTextFormInput
            label={t('tools_tab_hometown')}
            value={hometown}
            onChange={text => updateSelectedReflection({hometown: text})}
            submitted={submitted}
            errorText={t('error_input_required')}
            isInvalid={isErrorTown}
          />
          <MCTextFormInput
            label={t('tools_tab_number_of_kids')}
            value={number_of_kids}
            keyboardType="numeric"
            onChange={value =>
              updateSelectedReflection({
                number_of_kids: Math.floor(value).toString(),
              })
            }
          />
          <H4>{t('tools_tab_childhood_hobby')}</H4>
          <MCTagInput
            tags={childhood_hobbies}
            updateState={this.onUpdateChildhoodHobbies}
          />
          <MCTextFormInput
            mt={20}
            label={t('tools_tab_first_job')}
            value={first_job}
            onChangeText={value => updateSelectedReflection({first_job: value})}
            submitted={submitted}
            errorText={t('error_input_required')}
            isInvalid={isErrorJob}
          />
          <MCTextFormInput
            label={t('tools_tab_biggest_challenge')}
            value={biggest_challenge}
            onChangeText={value =>
              updateSelectedReflection({biggest_challenge: value})
            }
            submitted={submitted}
            errorText={t('error_input_required')}
            isInvalid={isErrorChallenge}
          />
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  selectedReflection: state.reflectionReducer.selectedReflection,
  myPersonalStory: selector.reflections.findMySpecialReflections(
    state,
    'PersonalStory',
  ),
  reflectionDraft: state.reflectionReducer.draft,
});

const mapDispatchToProps = {
  selectReflection: reflectionActions.selectReflection,
  setInitialReflection: reflectionActions.setInitialReflection,
  updateSelectedReflection: reflectionActions.updateSelectedReflection,
  addOrUpdateReflection: reflectionActions.addOrUpdateReflection,
  saveReflectionDraft: reflectionActions.saveReflectionDraft,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PersonalStoryScreen),
);
