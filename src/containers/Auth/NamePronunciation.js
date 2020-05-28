import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {RNS3} from 'react-native-aws3/lib/RNS3';
import {Player, Recorder} from '@react-native-community/audio-toolkit';
import {profileActions, authActions, chatActions} from 'Redux/actions';
import {MCRootView, MCView, MCContent} from 'components/styled/View';
import {H3, H4} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCEditableText, MCIcon, MCHeader} from 'components/common';
import {
  WideOvalGreenImage,
  WideOvalYellowImage,
} from 'components/styled/Custom';
import {OvalYellowWide, OvalGreenWide} from 'assets/images';
import NavigationService from 'navigation/NavigationService';
import {dySize} from 'utils/responsive';
import {s3_Options} from 'utils/config';
import {showAlert} from 'services/operators';

class NamePronunciationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      recording: false,
      audioFilePath: '',
      audioURL: '',
    };
  }

  componentDidMount() {
    this.mounted = true;
    this.checkRecordPermission();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  checkRecordPermission() {
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
        showAlert('Record Audio Permission was denied');
        return;
      }
      this.prepareRecorder();
    });
  }

  prepareRecorder = () => {
    const {profile} = this.props;
    // Preparing record
    this.recorder = new Recorder(`name_pronounce.mp4`, {
      bitrate: 256000,
      channels: 2,
      sampleRate: 44100,
      quality: 'max',
    }).prepare((err, fsPath) => {
      if (err) {
        console.log('Recorder Prepare error: ', err);
        this.mounted && this.prepareRecorder();
      } else {
        this.setState({audioFilePath: fsPath}); // for example
      }
    });
  };

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

  onToggleRecord = async recording => {
    if (!this.recorder) return;
    if (recording) {
      this.setState({recording, status: 'recording'});
      if (this.recorder) {
        this.recorder.destroy();
      }
      this.recorder.record(error => {
        if (error) console.log('record start error', error);
      });
    } else {
      this.setState({recording, status: 'record_saving'});
      await this.recorder.stop();
      this.uploadAudioRecorded();
    }
  };

  uploadAudioRecorded = async () => {
    const file = {
      uri: this.state.audioFilePath,
      name: `Pronounce/${this.props.profile._id}.mp4`,
      type: `audio/mp4`,
    };
    const response = await RNS3.put(file, s3_Options);
    if (response.status !== 201) {
      showAlert('Failed to upload audio file to S3');
      this.setState({status: 'record_upload_failed'});
    } else {
      const audioURL = response.body.postResponse.location;
      this.setState({audioURL});
      this.setState({status: 'record_saved'});
    }
  };

  onTogglePlayback = () => {
    const {audioURL} = this.state;
    if (this.player) {
      this.player.destroy();
    }
    this.setState({status: 'record_loading_playback'});
    this.player = new Player(audioURL, {
      autoDestroy: false,
    });
    this.player.prepare(err => {
      this.setState({status: ''});
      if (err) {
        console.log('Player Prepare error: ', err);
      } else {
        console.log('Playering audio..');
        this.player.play();
      }
    });
  };

  onSaveNamePronunciation = () => {
    this.props.updateProfile({namepronoun: this.state.audioURL});
    setTimeout(() => {
      this.props.updateContactProfile();
      NavigationService.navigate('Auth_OurValues');
    });
  };

  render() {
    const {
      t,
      theme,
      profile: {name},
      updateProfile,
    } = this.props;
    console.log({name});
    const {status, recording, audioURL, audioFilePath} = this.state;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          title={t('title_name_pronunciation')}
          hasBack={false}
          hasRight
          rightText={t('header_skip')}
          onPressRight={() => NavigationService.navigate('Auth_OurValues')}
        />
        <WideOvalGreenImage source={OvalGreenWide} resizeMode="stretch" />
        <WideOvalYellowImage source={OvalYellowWide} resizeMode="stretch" />
        <MCContent
          contentContainerStyle={{
            alignItems: 'center',
            paddingHorizontal: dySize(60),
          }}>
          <H3 mt={70}>
            {t('name_pronun_almost_done', {name: name.split(' '[0])})}
          </H3>
          <H3 mt={15} align="center">
            {t('name_pronun_easy_hard')}
          </H3>
          <H3 mt={70} align="center">
            {t('name_pronun_how_say')}
          </H3>
          {audioFilePath.length > 0 && (
            <MCView row align="center">
              <MCButton onPress={() => this.onToggleRecord(!recording)} mr={60}>
                <MCIcon
                  type="FontAwesome5Pro"
                  name={recording ? 'stop-circle' : 'microphone'}
                  size={40}
                />
              </MCButton>
              <MCButton
                onPress={() => this.onTogglePlayback()}
                disabled={audioURL.length === 0}>
                <MCIcon type="FontAwesome5Pro" name="volume" size={40} />
              </MCButton>
            </MCView>
          )}

          {status.length > 0 && <H4>{t(status)}</H4>}
          <MCButton
            br={20}
            height={40}
            mt={40}
            mb={100}
            align="center"
            background={theme.colors.outline}
            pl={20}
            pr={20}
            disabled={audioURL.length === 0}
            onPress={() => this.onSaveNamePronunciation()}>
            <H3 color={theme.colors.background}>{t('button_finish')}</H3>
          </MCButton>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  profile: state.profileReducer,
});

const mapDispatchToProps = {
  completeSignUp: authActions.completeSignUp,
  setProfileData: profileActions.setProfileData,
  firebaseAuthentication: chatActions.firebaseAuthentication,
  updateProfile: profileActions.setProfileData,
  updateContactProfile: profileActions.updateContactProfile,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(NamePronunciationScreen),
);