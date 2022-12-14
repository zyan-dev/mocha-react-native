import React from 'react';
import {Platform} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import YouTube, {YouTubeStandaloneAndroid} from 'react-native-youtube';
import * as _ from 'lodash';
import {selector} from 'Redux/selectors';
import {reflectionActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {H3, H4, ErrorText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCHeader, MCImage, MCIcon} from 'components/common';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
import {BodyStress, BodyStressWhite} from 'assets/images';
import {HeadPhoneSvg} from 'assets/svgs';

const bodyPartButtons = [
  {
    key: 'head',
    width: 60,
    top: 50,
    left: 140,
  },
  {
    key: 'eyes',
    width: 65,
    top: 60,
    left: 55,
  },
  {
    key: 'shoulders',
    width: 90,
    top: 110,
    left: 0,
  },
  {
    key: 'hips',
    width: 60,
    top: 200,
    left: 30,
  },
  {
    key: 'legs',
    width: 60,
    top: 330,
    left: 30,
  },
  {
    key: 'feet',
    width: 60,
    top: 350,
    right: 0,
  },
  {
    key: 'back',
    width: 60,
    top: 230,
    right: 0,
  },
  {
    key: 'stomach',
    width: 80,
    top: 170,
    right: 0,
  },
  {
    key: 'neck',
    width: 60,
    top: 100,
    right: 10,
  },
];

class BodyAwarenessScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      errorVideo: '',
      playVideo: false,
    };
  }
  isNew = false;
  componentWillMount() {
    const {
      stress,
      selectReflection,
      setInitialReflection,
      reflectionDraft,
    } = this.props;
    if (stress) {
      selectReflection(stress);
    } else {
      this.isNew = true;
      if (reflectionDraft['StressResponse']) {
        selectReflection(reflectionDraft['StressResponse']);
      } else {
        setInitialReflection('stress_response');
      }
    }
  }

  componentDidMount() {
    this.setState({playVideo: true});
  }

  onPressBodyItem = key => {
    const {
      selectedReflection: {
        data: {parts},
      },
      updateSelectedReflection,
    } = this.props;
    const index = parts.indexOf(key);
    if (index < 0) parts.push(key);
    else parts.splice(index, 1);
    updateSelectedReflection({parts});
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

  playVideoOnAndroid = () => {
    YouTubeStandaloneAndroid.playVideo({
      apiKey: 'AIzaSyACbgNHAK4l0E-Cf_ceAme85BBXnplHdPs', // Your YouTube Developer API Key
      videoId: 'q7OAlcyE5M8', // YouTube video ID
      autoplay: true, // Autoplay the video
      startTime: 0, // Starting point of video (in seconds)
      lightboxMode: true,
    })
      .then(() => console.log('Standalone Player Exited'))
      .catch(errorMessage => console.error(errorMessage));
  };

  onPressSubmit = () => {
    this.setState({submitted: true});
    if (!this.validateParts()) return;
    this.props.addOrUpdateReflection();
  };

  validateParts = () => {
    const {selectedReflection} = this.props;
    const parts = _.get(selectedReflection, ['data', 'parts'], []);
    return parts.length > 0;
  };

  onBuffer = ({isBuffering}) => {};

  videoError = error => {
    console.log({error});
  };

  render() {
    const {submitted, errorVideo, playVideo} = this.state;
    const {t, theme, selectedReflection} = this.props;
    const parts = _.get(selectedReflection, ['data', 'parts'], undefined);
    if (!parts) return null;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          title={t('tools_tab_stress_response')}
          headerIcon={<HeadPhoneSvg theme={theme} size={30} />}
          onPressBack={() => this.onPressBack()}
          rightIcon="cloud-upload-alt"
          rightText={t('button_save')}
          rightIconColor={theme.colors.outline}
          onPressRight={() => this.onPressSubmit()}
        />
        <MCContent contentContainerStyle={{padding: dySize(20)}}>
          <H3 align="center" weight="bold">
            {t('tools_tab_body_scan_title')}
          </H3>
          <H4 mt={20}>{t('tools_tab_body_scan_description1')}</H4>
          <H4 mt={20}>{t('tools_tab_body_scan_description2')}</H4>
          {Platform.OS === 'android' && (
            <MCButton
              width={335}
              height={200}
              align="center"
              justify="center"
              background={theme.colors.text}
              onPress={() => this.playVideoOnAndroid()}>
              <MCIcon
                name="ios-play"
                color={theme.colors.background}
                size={40}
              />
            </MCButton>
          )}
          {Platform.OS === 'ios' && (
            <YouTube
              apiKey="AIzaSyACbgNHAK4l0E-Cf_ceAme85BBXnplHdPs"
              videoId="q7OAlcyE5M8" // The YouTube video ID
              play
              onError={e => this.setState({errorVideo: e.error})}
              style={{
                alignSelf: 'center',
                width: dySize(320),
                height: dySize(200),
                backgroundColor: 'white',
              }}
            />
          )}
          {errorVideo.length > 0 && <ErrorText>{errorVideo}</ErrorText>}
          <MCView row justify="center" align="center" mt={40} mb={20}>
            <H3 weight="bold">{t('tools_tab_body_stress_title')}</H3>
            <MCIcon type="FontAwesome5Pro-light" name="fragile" size={30} />
          </MCView>
          <H4>{t('tools_tab_body_stress_question')}</H4>
          <H4 mt={10}>{t('select_all_that_apply')}</H4>
          {submitted && !this.validateParts() && (
            <ErrorText>{t('error_input_select_empty')}</ErrorText>
          )}
          <MCView align="center" pv={80}>
            <MCImage
              image={
                theme.colors.theme_name === 'Bright'
                  ? BodyStressWhite
                  : BodyStress
              }
              height={300}
              width={300}
              resizeMode="contain"
            />
            {bodyPartButtons.map(part => {
              const selected = parts.indexOf(part.key) > -1;
              return (
                <MCButton
                  bordered
                  background={theme.colors.background}
                  onPress={() => this.onPressBodyItem(part.key)}
                  align="center"
                  width={part.width}
                  style={{
                    position: 'absolute',
                    top: dySize(part.top),
                    left: dySize(part.left),
                    right: dySize(part.right),
                    borderColor: selected
                      ? theme.colors.outline
                      : theme.colors.border,
                  }}
                  pl={1}
                  pr={1}>
                  <H4
                    color={selected ? theme.colors.outline : theme.colors.text}>
                    {t(`tools_tab_body_stress_${part.key}`)}
                  </H4>
                </MCButton>
              );
            })}
          </MCView>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  selectedReflection: selector.reflections.getSelectedReflection(state),
  stress: selector.reflections.findMySpecialReflections(
    state,
    'StressResponse',
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
  )(BodyAwarenessScreen),
);
