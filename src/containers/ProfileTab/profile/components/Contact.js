import React from 'react';
import {Platform} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {RNS3} from 'react-native-aws3/lib/RNS3';
import {Player, Recorder} from '@react-native-community/audio-toolkit';
import {profileActions} from 'Redux/actions';
import {MCView} from 'components/styled/View';
import {H3, H4, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCEditableText, MCIcon} from 'components/common';
import {ContactProfileKeys} from 'utils/constants';
import {s3_Options} from 'utils/config';
import {showAlert} from 'services/operators';

class ContactCard extends React.Component {
  static propTypes = {
    editable: PropTypes.bool,
    profile: PropTypes.object.isRequired,
  };

  static defaultProps = {
    editable: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      status: '',
      recording: false,
      audioFilePath: '',
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
      this.props.updateProfile({namepronoun: audioURL});
      this.setState({status: 'record_saved'});
    }
  };

  onTogglePlayback = () => {
    const {namepronoun} = this.props.profile;
    if (!namepronoun || namepronoun.length === 0) return;
    if (this.player) {
      this.player.destroy();
    }
    this.setState({status: 'record_loading_playback'});
    this.player = new Player(namepronoun, {
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

  toggleEdit = () => {
    const {editing} = this.state;
    if (editing) {
      this.props.updateContactProfile();
    }
    this.setState({editing: !editing});
  };

  onUpdateProfile = (key, value) => {
    this.props.updateProfile({[key]: value});
  };

  render() {
    const {t, theme, editable, profile} = this.props;
    const {editing, status, recording, audioFilePath} = this.state;
    return (
      <MCView mt={30}>
        <MCView row align="center">
          <H3 weight="bold" style={{flex: 1}}>
            {t('profile_subtitle_contact')}
          </H3>
          {editable && (
            <MCButton onPress={() => this.toggleEdit()}>
              <MCIcon
                type="FontAwesome5"
                name={editing ? 'cloud-upload-alt' : 'edit'}
              />
            </MCButton>
          )}
        </MCView>
        {ContactProfileKeys.map(key => {
          if (key === 'phone' && !profile.user_id.length) {
            return null; // If user didn't sign up, user can't edit his phone number on profile screen
          }
          if (key === 'namepronoun') {
            return (
              <MCView key={key} mt={20}>
                <H4 color={theme.colors.border} width={300}>{`${t(
                  `profile_card_${key}`,
                )}: `}</H4>
                <MCView width={300} row align="center">
                  {audioFilePath.length > 0 && editing && (
                    <MCButton
                      onPress={() => this.onToggleRecord(!recording)}
                      mr={30}>
                      <MCIcon
                        type="FontAwesome5Pro"
                        name={recording ? 'stop-circle' : 'microphone'}
                        size={40}
                      />
                    </MCButton>
                  )}
                  {profile.namepronoun.length > 0 && (
                    <MCButton
                      onPress={() => this.onTogglePlayback()}
                      disabled={profile.namepronoun.length === 0}>
                      <MCIcon type="FontAwesome5Pro" name="volume" size={40} />
                    </MCButton>
                  )}
                </MCView>
                {status.length > 0 && <H4>{t(status)}</H4>}
                {!editing && profile.namepronoun.length === 0 && (
                  <MCEmptyText>No record</MCEmptyText>
                )}
              </MCView>
            );
          }
          return (
            <MCView key={key} mt={20}>
              <H4 color={theme.colors.border} width={300}>{`${t(
                `profile_card_${key}`,
              )}: `}</H4>
              <MCView width={300}>
                <MCEditableText
                  multiline
                  text={profile[key]}
                  placeholder={t(`profile_card_${key}_placeholder`)}
                  editable={key === 'phone' ? false : editing}
                  onChange={value => this.onUpdateProfile(key, value)}
                  style={{flex: 1, fontStyle: 'italic', fontWeight: 'bold'}}
                  keyboardType={key === 'email' ? 'email-address' : 'default'}
                />
              </MCView>
            </MCView>
          );
        })}
      </MCView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
});

const mapDispatchToProps = {
  updateProfile: profileActions.setProfileData,
  updateContactProfile: profileActions.updateContactProfile,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ContactCard),
);
