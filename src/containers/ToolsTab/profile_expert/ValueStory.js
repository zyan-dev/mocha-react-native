import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import {selector} from 'Redux/selectors';
import {reflectionActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {H4, H5} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCHeader, MCIcon, MCImage, MCTextFormInput} from 'components/common';
import {dySize} from 'utils/responsive';
import {KeySvg} from 'assets/svgs';
import {ValueCardTextColor, ValueCardBackgrounds} from 'utils/constants';

class PersonalizeValueScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };
  }
  componentWillMount() {
    const {valueStory, selectReflection, setInitialReflection} = this.props;
    if (valueStory) {
      selectReflection(valueStory);
    } else {
      setInitialReflection('value_story');
    }
  }

  onChangeValueStory = text => {
    const {value} = this.props.route.params;
    const {updateSelectedReflection, selectedReflection} = this.props;
    const {story} = selectedReflection.data;
    updateSelectedReflection({
      story: {
        ...story,
        [value.value]: text,
      },
    });
  };

  onPressSubmit = () => {
    this.setState({submitted: true});
    if (!this.validateStory()) return null;
    this.props.addOrUpdateReflection();
  };

  validateStory = () => {
    const {value} = this.props.route.params;
    const {selectedReflection} = this.props;
    const story = _.get(selectedReflection, ['data', 'story'], {});
    return story[value.value] && story[value.value].length > 0;
  };

  renderSelectedValueCard = () => {
    const {value} = this.props.route.params;
    const {t, theme} = this.props;
    return (
      <MCButton
        key={value.value + theme.colors.theme_name}
        mb={15}
        style={{
          width: dySize(250),
          height: dySize(360),
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: theme.colors.card,
          backgroundColor: ValueCardBackgrounds[0],
          borderRadius: 10,
          borderWidth: dySize(6),
          padding: dySize(5),
        }}>
        <H4
          align="center"
          color={ValueCardTextColor}
          style={{letterSpacing: 5}}>
          {t(`value_category_${value.category}`).toUpperCase()}
        </H4>
        <H4 weight="bold" align="center" color={ValueCardTextColor}>
          {t(`tools_tab_value_${value.value}`)}
        </H4>
        <MCView style={{flex: 1}} align="center" justify="center">
          {value.image && (
            <MCImage
              image={value.image}
              width={dySize(200)}
              height={dySize(160)}
              resizeMode="contain"
            />
          )}
          {value.icon && (
            <MCIcon
              type="FontAwesome5"
              name={value.icon}
              size={50}
              color={ValueCardTextColor}
            />
          )}
        </MCView>
        <H5
          align="center"
          style={{letterSpacing: 5}}
          color={ValueCardTextColor}>
          {t(`value_name_${value.name}`).toUpperCase()}
        </H5>
        <H5 color={ValueCardTextColor} weight="italic" align="center">
          {t(`value_name_${value.name}_description`)}
        </H5>
      </MCButton>
    );
  };

  render() {
    const {submitted} = this.state;
    const {t, theme, selectedReflection} = this.props;
    const {value} = this.props.route.params;
    if (!selectedReflection) return null;
    const story = _.get(selectedReflection, ['data', 'story'], {});
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          title={t('tools_tab_discover_your_values')}
          headerIcon={<KeySvg theme={theme} size={25} />}
          rightIcon="cloud-upload-alt"
          onPressRight={() => this.onPressSubmit()}
        />
        <MCContent
          contentContainerStyle={{padding: dySize(20), paddingBottom: 100}}>
          <H4>{t('tools_tab_value_story_title')}</H4>
          <MCView mt={40} align="center">
            {this.renderSelectedValueCard()}
          </MCView>
          <H4>{t('label_examples')}</H4>
          <H4>{t('tools_tab_value_story_guide_1')}</H4>
          <H4>{t('tools_tab_value_story_guide_2')}</H4>
          <H4>{t('tools_tab_value_story_guide_3')}</H4>
          <MCTextFormInput
            mt={20}
            onChange={text => this.onChangeValueStory(text)}
            multiline
            submitted={submitted}
            isInvalid={!this.validateStory()}
            value={story[value.value]}
            placeholder="Add a personal story here"
            errorText={t('error_input_required')}
          />
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  selectedReflection: selector.reflections.getSelectedReflection(state),
  valueStory: selector.reflections.findMySpecialReflections(
    state,
    'ValueStory',
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
  )(PersonalizeValueScreen),
);
