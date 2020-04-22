import React from 'react';
import {Linking} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
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

const embedLink = 'https://www.youtube.com/watch?v=q7OAlcyE5M8';
const bodyPartButtons = [
  {
    key: 'head',
    width: 80,
    top: 40,
    left: 130,
  },
  {
    key: 'eyes',
    width: 65,
    top: 55,
    left: 55,
  },
  {
    key: 'shoulders',
    width: 80,
    top: 100,
    left: 0,
  },
  {
    key: 'hips',
    width: 60,
    top: 200,
    left: 0,
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
    top: 360,
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
    right: 0,
  },
];

class BodyAwarenessScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
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
      if (reflectionDraft['Stress']) {
        selectReflection(reflectionDraft['Stress']);
      } else {
        setInitialReflection('stress');
      }
    }
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

  onPressSubmit = () => {
    this.setState({submitted: true});
    if (!this.validateParts()) return;
    this.props.addOrUpdateReflection();
  };

  onPressEmbedLink = () => {
    Linking.canOpenURL(embedLink).then(supported => {
      if (supported) {
        Linking.openURL(embedLink);
      } else {
        console.log("Don't know how to open URI: " + embedLink);
      }
    });
  };

  validateParts = () => {
    return this.props.selectedReflection.data.parts.length > 0;
  };

  render() {
    const {submitted} = this.state;
    const {t, theme, selectedReflection} = this.props;
    const parts = _.get(selectedReflection, ['data', 'parts'], undefined);
    if (!parts) return null;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          title={`${t('practice')} 6`}
          onPressBack={() => this.onPressBack()}
          rightIcon="cloud-upload-alt"
          onPressRight={() => this.onPressSubmit()}
        />
        <MCContent contentContainerStyle={{padding: dySize(20)}}>
          <MCView row justify="center" align="center" mb={20}>
            <H3>{t('tools_tab_body_scan_and_stress')}</H3>
            <MCIcon name="ios-body" size={30} />
          </MCView>
          <H3 align="center" weight="bold">
            {t('tools_tab_body_scan_title')}
          </H3>
          <H4 mt={20}>{t('tools_tab_attachment_link_explain')}</H4>
          <MCButton onPress={() => this.onPressEmbedLink()}>
            <H4 underline>{embedLink}</H4>
          </MCButton>
          <MCView row justify="center" align="center" mt={20}>
            <H3 weight="bold" mr={10}>
              {t('tools_tab_body_stress_title')}
            </H3>
            <MCIcon type="FontAwesome5" name="thumbtack" size={30} />
          </MCView>
          <H4>{t('tools_tab_body_stress_question')}</H4>
          <H4 mt={10}>{t('select_all_that_apply')}</H4>
          {submitted && !this.validateParts() && (
            <ErrorText>{t('error_input_select_empty')}</ErrorText>
          )}
          <MCView align="center" pv={80}>
            <MCImage
              image={
                theme.colors.theme_name === 'Stone'
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
                  }}>
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
  selectedReflection: state.reflectionReducer.selectedReflection,
  stress: selector.reflections.findMySpecialReflections(state, 'Stress'),
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
