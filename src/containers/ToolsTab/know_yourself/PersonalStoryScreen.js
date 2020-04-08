import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import AudioRecord from 'react-native-audio-record';
import {MCView, MCCard, MCRootView, MCContent} from 'components/styled/View';
import {H3, H4, MCIcon} from 'components/styled/Text';
import {MCHeader, MCImage} from 'components/common';
import {BasicProfileCards} from 'utils/constants';
import {MCButton} from 'components/styled/Button';
import NavigationService from 'navigation/NavigationService';
import ProfileBasicCard from './components/ProfileBasicCard';
import {dySize} from 'utils/responsive';

var Sound = require('react-native-sound');
Sound.setCategory('Playback');

class PersonalStoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      recorded: false,
    };
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
      this.whoosh.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    } else {
      this.whoosh = new Sound('pronounce.wav', Sound.MAIN_BUNDLE, (error) => {
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
      this.whoosh.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    }
  };

  render() {
    const {t} = this.props;
    const {recording, recorded} = this.state;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          title={`${t('practice')} 1 - ${t('tools_tab_personal_story')}`}
          hasRight
          rightIconType="FontAwesome5"
          rightIcon="baby"
        />
        <MCContent contentContainerStyle={{padding: dySize(20)}}>
          <H3>{t('tools_tab_how_pronounce')}</H3>
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
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(PersonalStoryScreen),
);
