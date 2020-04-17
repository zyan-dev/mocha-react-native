import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {RNS3} from 'react-native-aws3/lib/RNS3';
import {
  Player,
  Recorder,
  MediaStates,
} from '@react-native-community/audio-toolkit';
import {reflectionActions} from 'Redux/actions';
import {selector} from 'Redux/selectors';
import {MCView, MCRootView, MCContent} from 'components/styled/View';
import {H3, H4, MCIcon, MCTextInput} from 'components/styled/Text';
import {MCHeader, MCTextFormInput, MCTagInput} from 'components/common';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import {s3_Options} from 'utils/config';
import NavigationService from 'navigation/NavigationService';

class PersonalStoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      saving: false,
      audioFilePath: '',
      audioFileUrl: '',
      submitted: false,
      error: '',
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
    this.recorder = new Recorder(`pronounce_${this.props.profile._id}.wav`, {
      bitrate: 256000,
      channels: 2,
      sampleRate: 44100,
      quality: 'max',
    }).prepare((err, fsPath) => {
      this.setState({audioFilePath: fsPath}); // for example
    });
    this.checkRecordPermission();
  }

  checkRecordPermission() {
    if (this.player) {
      this.player.destroy();
    }

    let recordAudioRequest;
    if (Platform.OS == 'android') {
      recordAudioRequest = this._requestRecordAudioPermission();
    } else {
      recordAudioRequest = new Promise(function(resolve, reject) {
        resolve(true);
      });
    }

    recordAudioRequest.then(hasPermission => {
      if (!hasPermission) {
        this.setState({
          error: 'Record Audio Permission was denied',
        });
        return;
      }
    });
  }

  async _requestRecordAudioPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message:
            'Mocha App needs access to your microphone to record your name pronounciation',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  onPressRecord = async () => {
    const {recording} = this.state;
    if (!this.recorder) return;
    if (!recording) {
      this.recorder.record();
      this.setState({recording: true, saving: false, audioFileUrl: ''});
    } else {
      const path = await this.recorder.stop();
      console.log({path});
      this.uploadAudioRecorded(path._path);
    }
  };

  onPressPlayback = () => {
    if (this.player) {
      this.player.destroy();
    }
    this.player = new Player(this.state.audioFilePath).play();
  };

  uploadAudioRecorded = async path => {
    const file = {
      uri: this.state.audioFilePath,
      name: `pronounce_${this.props.profile._id}`,
      type: `audio/wav`,
    };
    this.setState({recording: false, saving: true});
    const response = await RNS3.put(file, s3_Options);
    if (response.status !== 201) {
      showAlert('Failed to upload audio file to S3');
      this.setState({recording: false, saving: false});
      return 'error';
    } else {
      console.log(
        'Audio uploaded successfully!',
        response.body.postResponse.location,
      );
      this.setState({
        saving: false,
        audioFileUrl: response.body.postResponse.location,
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
    const {t, selectedReflection, updateSelectedReflection} = this.props;
    const {recording, saving, audioFileUrl, submitted, error} = this.state;
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
          {error.length > 0 ? (
            <H4 style={{flex: 1}}>{error}</H4>
          ) : (
            <MCView row justify="space-between" align="center">
              <MCButton onPress={() => this.onPressRecord()}>
                <MCIcon name={recording ? 'ios-square' : 'ios-mic'} size={40} />
              </MCButton>
              {recording && <H4 style={{flex: 1}}>Recording...</H4>}
              {saving && <H4 style={{flex: 1}}>Saving...</H4>}
              <MCButton
                onPress={() => this.onPressPlayback()}
                disabled={audioFileUrl.length === 0}>
                <MCIcon name="ios-volume-high" size={40} ml={30} />
              </MCButton>
            </MCView>
          )}

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
  profile: state.profileReducer,
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
