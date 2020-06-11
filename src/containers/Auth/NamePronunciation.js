import React from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {RNS3} from 'react-native-aws3/lib/RNS3';
import {Player} from '@react-native-community/audio-toolkit';
import AudioRecord from 'react-native-audio-record';
import {profileActions, authActions, chatActions} from 'Redux/actions';
import {MCRootView, MCView, MCContent} from 'components/styled/View';
import {H3, H4} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCIcon, MCHeader} from 'components/common';
import {
  WideOvalGreenImage,
  WideOvalYellowImage,
} from 'components/styled/Custom';
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
    const options = {
      sampleRate: 16000, // default 44100
      channels: 1, // 1 or 2, default 1
      bitsPerSample: 16, // 8 or 16, default 16
      audioSource: 6, // android only (see below)
      wavFile: 'test.wav', // default 'audio.wav'
    };
    AudioRecord.init(options);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  checkRecordPermission(recording) {
    if (Platform.OS === 'ios') {
      check(PERMISSIONS.IOS.MICROPHONE)
        .then(result => {
          if (result !== RESULTS.GRANTED) {
            request(PERMISSIONS.IOS.MICROPHONE).then(result => {
              // …
              if (result !== RESULTS.GRANTED) {
                this.setState({
                  microphoneStatus:
                    'You can not record your audio. Pleas go to app setting to enable manually',
                });
              } else {
                this.prepareRecorder(recording);
              }
            });
          } else {
            this.prepareRecorder(recording);
          }
        })
        .catch(error => {
          // …
        });
    } else {
      check(PERMISSIONS.ANDROID.RECORD_AUDIO)
        .then(result => {
          if (result !== RESULTS.GRANTED) {
            request(PERMISSIONS.ANDROID.RECORD_AUDIO).then(result => {
              // …
              if (result !== RESULTS.GRANTED) {
                this.setState({
                  microphoneStatus:
                    'You can not record your audio. Pleas go to app setting to enable manually',
                });
              } else {
                this.prepareRecorder(recording);
              }
            });
          } else {
            this.prepareRecorder(recording);
          }
        })
        .catch(error => {
          // …
        });
    }
  }

  prepareRecorder = async recording => {
    if (recording) {
      this.setState({recording, status: 'recording'});
      AudioRecord.start();
    } else {
      this.setState({recording, status: 'record_saving'});
      console.log('stopping recording...');
      const audioFile = await AudioRecord.stop();
      console.log({audioFile});
      this.setState({audioFilePath: audioFile}, () => {
        this.uploadAudioRecorded();
      });
    }
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

  uploadAudioRecorded = async () => {
    const file = {
      uri:
        (Platform.OS === 'android' ? 'file://' : '') + this.state.audioFilePath,
      name: `Pronounce/${this.props.profile._id}.wav`,
      type: `audio/wav`,
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
        <WideOvalGreenImage />
        <WideOvalYellowImage />
        <MCContent
          contentContainerStyle={{
            alignItems: 'center',
            paddingHorizontal: dySize(60),
          }}>
          <H3 mt={70} align="center">
            {t('name_pronun_almost_done', {name: name.split(' '[0])})}
          </H3>
          <H3 mt={15} align="center">
            {t('name_pronun_easy_hard')}
          </H3>
          <H3 mt={70} align="center">
            {t('name_pronun_how_say')}
          </H3>
          <MCView row align="center">
            <MCButton onPress={() => this.checkRecordPermission(!recording)}>
              <MCIcon
                type="FontAwesome5Pro"
                name={recording ? 'stop-circle' : 'microphone'}
                size={40}
              />
            </MCButton>
            {audioFilePath.length > 0 && (
              <MCButton
                ml={60}
                onPress={() => this.onTogglePlayback()}
                disabled={audioURL.length === 0}>
                <MCIcon type="FontAwesome5Pro" name="volume" size={40} />
              </MCButton>
            )}
          </MCView>

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
