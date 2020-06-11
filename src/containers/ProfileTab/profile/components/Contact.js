import React from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {RNS3} from 'react-native-aws3/lib/RNS3';
import {Player, Recorder} from '@react-native-community/audio-toolkit';
import AudioRecord from 'react-native-audio-record';
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
      microphoneStatus: '',
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
    let file = {
      uri:
        (Platform.OS === 'android' ? 'file://' : '') + this.state.audioFilePath,
      name: `Pronounce/${this.props.profile._id}.mp4`,
      type: `audio/mp4`,
    };
    const response = await RNS3.put(file, s3_Options).progress(e =>
      console.log(e.total),
    );
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
    const {
      editing,
      status,
      recording,
      audioFilePath,
      microphoneStatus,
    } = this.state;
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
                  {editing && (
                    <MCButton
                      onPress={() => this.checkRecordPermission(!recording)}
                      mr={30}>
                      <MCIcon
                        type="FontAwesome5Pro"
                        name={recording ? 'stop-circle' : 'microphone'}
                        size={40}
                      />
                    </MCButton>
                  )}
                  {profile.namepronoun.indexOf('https:') > -1 && (
                    <MCButton onPress={() => this.onTogglePlayback()}>
                      <MCIcon type="FontAwesome5Pro" name="volume" size={40} />
                    </MCButton>
                  )}
                </MCView>
                {status.length > 0 && <H4>{t(status)}</H4>}
                {!editing && profile.namepronoun.indexOf('https:') < 0 && (
                  <MCEmptyText>No record</MCEmptyText>
                )}
                {microphoneStatus.length > 0 && (
                  <MCEmptyText>{microphoneStatus}</MCEmptyText>
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
                  multiline={key === 'neighborhood'}
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
