import React from 'react';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {reflectionActions} from 'Redux/actions';
import {MCHeader, MCPicker, MCTextFormInput} from 'components/common';
import {MCView, MCRootView, MCContent, MCCard} from 'components/styled/View';
import {H4} from 'components/styled/Text';
import {dySize} from 'utils/responsive';
import {EmotionHow, EMOTIONS} from 'utils/constants';

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
    return this.props.selectedReflection.data.story.length > 0;
  };

  render() {
    const {submitted} = this.state;
    const {t, selectedReflection, updateSelectedReflection} = this.props;
    const {
      data: {emotion, how, story},
    } = selectedReflection;
    return (
      <MCRootView>
        <MCHeader
          title={t('edit_emotion_headerTitle')}
          hasRight
          rightIcon="cloud-upload-alt"
          onPressRight={() => this.onPressRight()}
        />
        <MCContent contentContainerStyle={{padding: dySize(10)}}>
          <H4 width={350} align="left">
            {t('emotion_select')}
          </H4>
          <MCPicker
            items={EMOTIONS.map(value => ({
              label: t(`mocha_emotion_${value.replace(/ /g, '_')}`),
              value,
            }))}
            onChange={itemValue => {
              if (itemValue) updateSelectedReflection({emotion: itemValue});
              else updateSelectedReflection({emotion: ''});
            }}
            value={emotion}
          />
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
                <H4>{t('add_emotion_full')}</H4>
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
  selectedReflection: state.reflectionReducer.selectedReflection,
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
