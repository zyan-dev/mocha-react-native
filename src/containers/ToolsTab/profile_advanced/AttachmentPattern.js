import React from 'react';
import {Linking} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import YouTube from 'react-native-youtube';
import * as _ from 'lodash';

import {selector} from 'Redux/selectors';
import {reflectionActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {H4, ErrorText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCHeader, MCIcon} from 'components/common';
import {dySize} from 'utils/responsive';
import {AttachmentOptions} from 'utils/constants';
import NavigationService from 'navigation/NavigationService';

class AttachmentPatternScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardHeight: 'auto',
      submitted: false,
    };
  }

  isNew = false;
  componentWillMount() {
    const {
      attachment,
      selectReflection,
      setInitialReflection,
      reflectionDraft,
    } = this.props;
    if (attachment) {
      selectReflection(attachment);
    } else {
      this.isNew = true;
      if (reflectionDraft['Attachment']) {
        selectReflection(reflectionDraft['Attachment']);
      } else {
        setInitialReflection('attachment');
      }
    }
  }

  onPressEmbededLink = () => {
    Linking.canOpenURL(EmbededLink).then(supported => {
      if (supported) {
        Linking.openURL(EmbededLink);
      } else {
        console.log("Don't know how to open URI: " + EmbededLink);
      }
    });
  };

  onPressOption = option => {
    const {
      selectedReflection: {
        data: {options},
      },
      updateSelectedReflection,
    } = this.props;
    const index = options.indexOf(option);
    if (index < 0) options.push(option);
    else options.splice(index, 1);
    updateSelectedReflection({options});
  };

  setCardWidth = (layout, index) => {
    const {cardHeight} = this.state;
    const {height} = layout;
    if (index === 0 && dySize(cardHeight) !== height) {
      this.setState({cardHeight: height});
    }
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

  onPressSubmit = () => {
    this.setState({submitted: true});
    if (!this.validateOptions()) return;
    this.props.addOrUpdateReflection();
  };

  validateOptions = () => {
    return this.props.selectedReflection.data.options.length > 0;
  };

  render() {
    const {cardHeight, submitted} = this.state;
    const {t, theme, selectedReflection} = this.props;
    const options = _.get(selectedReflection, ['data', 'options'], undefined);

    if (!options) return null;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          title={t('tools_tab_attachment_pattern')}
          headerIcon={
            <MCIcon
              type="FontAwesome5Pro"
              name="paperclip"
              color="#DC3E3E"
              size={25}
            />
          }
          onPressBack={() => this.onPressBack()}
          rightIcon="cloud-upload-alt"
          onPressRight={() => this.onPressSubmit()}
        />
        <MCContent contentContainerStyle={{padding: dySize(20)}}>
          <H4 width={320} ml={5} align="center">
            {t('tools_tab_attachment_description')}
          </H4>

          <H4 width={320} mt={15} ml={5} mb={10}>
            {t('tools_tab_attachment_link_explain')}
          </H4>
          <YouTube
            videoId="2s9ACDMcpjA" // The YouTube video ID
            onError={e => this.setState({errorVideo: e.error})}
            style={{
              alignSelf: 'center',
              width: dySize(320),
              height: dySize(200),
              backgroundColor: 'white',
            }}
          />
          <H4 mt={10} ml={5}>
            {t(`select_all_that_apply`)}
          </H4>
          {!this.validateOptions() && submitted && (
            <ErrorText>{t('error_input_select_empty')}</ErrorText>
          )}
          <MCView row wrap justify="center" mt={20} width={335}>
            {AttachmentOptions.map((option, index) => {
              const vColor =
                options.indexOf(option) < 0
                  ? theme.colors.text
                  : theme.colors.outline;
              return (
                <MCButton
                  key={index}
                  onLayout={event =>
                    this.setCardWidth(event.nativeEvent.layout, index)
                  }
                  onPress={() => this.onPressOption(option)}
                  bordered
                  width={150}
                  ml={5}
                  mr={5}
                  mb={10}
                  br={6}
                  align="center"
                  style={{
                    borderColor: vColor,
                    height: cardHeight,
                  }}>
                  <H4 underline color={vColor}>
                    {t(`tools_tab_attachment_${option}`)}
                  </H4>
                  <H4 color={vColor}>
                    {t(`tools_tab_attachment_${option}_explain`)}
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
  selectedReflection: state.reflectionReducer.selectedReflection,
  attachment: selector.reflections.findMySpecialReflections(
    state,
    'Attachment',
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
  )(AttachmentPatternScreen),
);
