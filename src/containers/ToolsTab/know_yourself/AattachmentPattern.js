import React from 'react';
import {Linking} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import {selector} from 'Redux/selectors';
import {reflectionActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {H3, H4, ErrorText, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCHeader} from 'components/common';
import {dySize} from 'utils/responsive';
import {AttachmentOptions} from '../../../utils/constants';

const EmbededLink = 'https://www.youtube.com/watch?v-2sgACDMcpjA';

class AttachmentPatternScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardHeight: 'auto',
      submitted: false,
    };
  }
  componentWillMount() {
    const {attachment, selectReflection, setInitialReflection} = this.props;
    if (attachment) {
      selectReflection(attachment);
    } else {
      setInitialReflection('attachment');
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
          title={`${t('practice')} 4 - 1`}
          rightIcon="cloud-upload-alt"
          onPressRight={() => this.onPressSubmit()}
        />
        <MCContent contentContainerStyle={{padding: dySize(20)}}>
          <MCView row justify="center" align="center" mb={20}>
            <H3>{t('tools_tab_attachment_pattern')}</H3>
            <MCIcon type="FontAwesome5" name="paperclip" size={30} />
          </MCView>
          <H4 width={320} weight="bold">
            {t('tools_tab_attachment_link_explain')}
          </H4>
          <MCButton onPress={() => this.onPressEmbededLink()}>
            <H4 width={320} weight="italic" underline mb={20}>
              {EmbededLink}
            </H4>
          </MCButton>
          <H4>{t(`select_all_that_apply`)}</H4>
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
});

const mapDispatchToProps = {
  selectReflection: reflectionActions.selectReflection,
  setInitialReflection: reflectionActions.setInitialReflection,
  updateSelectedReflection: reflectionActions.updateSelectedReflection,
  addOrUpdateReflection: reflectionActions.addOrUpdateReflection,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AttachmentPatternScreen),
);
