import React from 'react';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import * as _ from 'lodash';
import {selector} from 'Redux/selectors';
import {reflectionActions} from 'Redux/actions';
import {MCHeader, MCPicker, MCTextFormInput, MCImage} from 'components/common';
import {MCView, MCRootView, MCContent, MCCard} from 'components/styled/View';
import {H3, H4} from 'components/styled/Text';
import {dySize} from 'utils/responsive';
import {EmotionHow, EMOTIONS} from 'utils/constants';
import {MCButton} from 'components/styled/Button';
import NavigationService from 'navigation/NavigationService';
import {EmotionPickerIcon} from 'assets/images';

class EditEmotionScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };
  }

  onPressRight = () => {
    this.setState({submitted: true});
    if (!this.validateStory()) return;
    this.props.addOrUpdateReflection();
  };

  validateStory = () => {
    const {selectedReflection} = this.props;
    const story = _.get(selectedReflection, ['data', 'story'], []);
    return story.length > 0;
  };

  render() {
    const {submitted} = this.state;
    const {t, theme, selectedReflection, updateSelectedReflection} = this.props;
    if (!selectedReflection) return null;
    const emotion = _.get(selectedReflection, ['data', 'emotion'], '');
    const how = _.get(selectedReflection, ['data', 'how'], '');
    const story = _.get(selectedReflection, ['data', 'story'], '');
    return (
      <MCRootView>
        <MCHeader
          title={t('edit_emotion_headerTitle')}
          hasRight
          rightIcon="cloud-upload-alt"
          rightText={t('button_save')}
          rightIconColor={theme.colors.outline}
          onPressRight={() => this.onPressRight()}
        />
        <MCContent contentContainerStyle={{padding: dySize(10)}}>
          <H4 width={350} align="left">
            {t('emotion_select')}
          </H4>
          <MCButton
            bordered
            br={4}
            pt={10}
            pb={10}
            row
            justify="space-between"
            align="center"
            onPress={() =>
              NavigationService.navigate('EmotionPicker', {emotion})
            }>
            <H3>{t(`mocha_emotion_${emotion}`)}</H3>
            <MCImage image={EmotionPickerIcon} width={30} height={30} />
          </MCButton>
          {emotion.length > 0 && (
            <>
              <H4 width={350} align="left" mt={20}>
                {t('emotion_how_select', {
                  emotion: t(`mocha_emotion_${emotion}`),
                })}
              </H4>
              <MCPicker
                items={EmotionHow.map(value => ({
                  label: t(`add_emotion_value_${value}`),
                  value,
                }))}
                value={how}
                onChange={itemValue => {
                  if (itemValue) updateSelectedReflection({how: itemValue});
                  else updateSelectedReflection({how: ''});
                }}
              />
            </>
          )}

          <MCCard p={1} mt={30}>
            <MCCard shadow br={1} style={{width: '100%'}} align="center">
              <MCView row wrap>
                <H4>{t('add_emotion_title_prefix')}</H4>
                <H4 weight="bold">
                  {emotion.length ? t(`mocha_emotion_${emotion}`) : ''}
                </H4>
                <H4 weight="italic">
                  {' '}
                  {how.length ? t(`add_emotion_value_${how}`) : ''}
                </H4>
              </MCView>
            </MCCard>
            <MCView ph={10} pv={10}>
              <MCTextFormInput
                style={{width: dySize(333)}}
                placeholder={t('add_emotion_story_placeholder')}
                placeholderTextColor="gray"
                multiline
                textAlignVertical="top"
                maxHeight={300}
                value={story}
                onChange={text => updateSelectedReflection({story: text})}
                submitted={submitted}
                errorText={t('error_input_required')}
                isInvalid={!this.validateStory()}
              />
            </MCView>
          </MCCard>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  selectedReflection: selector.reflections.getSelectedReflection(state),
  reflectionSections: state.reflectionReducer.reflectionSections,
});

const mapDispatchToProps = {
  updateSelectedReflection: reflectionActions.updateSelectedReflection,
  addOrUpdateReflection: reflectionActions.addOrUpdateReflection,
  addCustomReflectionTitle: reflectionActions.addCustomReflectionTitle,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(EditEmotionScreen),
);
