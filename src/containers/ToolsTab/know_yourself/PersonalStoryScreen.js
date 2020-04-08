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

class PersonalStoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      recorded: false,
    };
  }

  componentWillMount() {
    const {
      myPersonalStory,
      selectReflection,
      setInitialReflection,
    } = this.props;
    console.log({myPersonalStory});
    if (myPersonalStory) {
      selectReflection(myPersonalStory);
    } else {
      setInitialReflection('personalStory');
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

  onUpdateChildhoodHobbies = (state) => {
    this.props.updateSelectedReflection({childhood_hobbies: state.tagsArray});
  };

  render() {
    const {
      t,
      selectedReflection,
      updateSelectedReflection,
      addOrUpdateReflection,
    } = this.props;
    const {recording, recorded} = this.state;
    const {
      hometown,
      number_of_kids,
      childhood_hobbies,
      first_job,
      biggest_challenge,
    } = selectedReflection.data;
    if (selectedReflection.type.toLowerCase() !== 'personalstory') return null;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          rightIcon="ios-send"
          hasRight={
            hometown.length *
              number_of_kids.length *
              childhood_hobbies.length *
              first_job.length *
              biggest_challenge.length >
            0
          }
          onPressRight={() => addOrUpdateReflection()}
        />
        <MCContent contentContainerStyle={{paddingHorizontal: dySize(20)}}>
          <MCView row justify="center" align="center" mb={20}>
            <H3>{`${t('practice')} 1 - ${t('tools_tab_personal_story')}`}</H3>
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
          <H4>{t('tools_tab_hometown')}</H4>
          <MCTextInput
            br={10}
            value={hometown}
            onChangeText={(text) => updateSelectedReflection({hometown: text})}
          />
          <H4 mt={20}>{t('tools_tab_number_of_kids')}</H4>
          <MCTextInput
            br={10}
            value={number_of_kids}
            keyboardType="numeric"
            onChangeText={(value) =>
              updateSelectedReflection({
                number_of_kids: Math.floor(value).toString(),
              })
            }
          />
          <H4 mt={20}>{t('tools_tab_childhood_hobby')}</H4>
          <MCTagInput
            tags={childhood_hobbies}
            updateState={this.onUpdateChildhoodHobbies}
          />
          <H4 mt={20}>{t('tools_tab_first_job')}</H4>
          <MCTextInput
            br={10}
            value={first_job}
            onChangeText={(value) =>
              updateSelectedReflection({first_job: value})
            }
          />
          <H4 mt={20}>{t('tools_tab_biggest_challenge')}</H4>
          <MCTextInput
            br={10}
            value={biggest_challenge}
            onChangeText={(value) =>
              updateSelectedReflection({biggest_challenge: value})
            }
          />
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedReflection: state.reflectionReducer.selectedReflection,
  myPersonalStory: selector.reflections.findMySpecialReflections(
    state,
    'PersonalStory',
  ),
});

const mapDispatchToProps = {
  selectReflection: reflectionActions.selectReflection,
  setInitialReflection: reflectionActions.setInitialReflection,
  updateSelectedReflection: reflectionActions.updateSelectedReflection,
  addOrUpdateReflection: reflectionActions.addOrUpdateReflection,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(PersonalStoryScreen),
);
