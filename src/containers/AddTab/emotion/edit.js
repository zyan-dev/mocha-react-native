import React from 'react';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {Picker} from '@react-native-community/picker';
import {reflectionActions} from 'Redux/actions';
import {showAlert} from 'services/operators';
import {
  MCHeader,
  MCImagePicker,
  MCSearchInput,
  MCSearchableDropdown,
} from 'components/common';
import {MCView, MCRootView, MCContent, MCCard} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {H3, H4, MCTextInput, MCIcon} from 'components/styled/Text';
import {dySize} from 'utils/responsive';
import {emotionHow} from 'utils/constants';
import {EMOTIONS} from '../../../utils/constants';

class EditEmotionScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressRight = () => {
    this.props.addOrUpdateReflection();
  };

  render() {
    const {
      t,
      theme,
      selectedReflection,
      updateSelectedReflection,
      reflectionSections,
    } = this.props;
    const {
      data: {emotion, how, story},
    } = selectedReflection;
    return (
      <MCRootView>
        <MCHeader
          title={t('edit_emotion_headerTitle')}
          hasRight={story.length > 0}
          rightIcon={selectedReflection._id ? 'ios-cloud-upload' : 'ios-send'}
          onPressRight={() => this.onPressRight()}
        />
        <MCContent contentContainerStyle={{padding: dySize(10)}}>
          <H4 width={350} align="left">
            {t('emotion_select')}
          </H4>
          <MCSearchableDropdown
            data={EMOTIONS}
            width={350}
            height={50}
            selectedItem={
              <H3>{emotion.length ? t(`mocha_emotion_${emotion}`) : ''}</H3>
            }
            dropDownHeight={200}
            searchable={true}
            onSelect={item => updateSelectedReflection({emotion: item})}>
            {EMOTIONS.map(emotion => (
              <H3>{t(`mocha_emotion_${emotion}`)}</H3>
            ))}
          </MCSearchableDropdown>
          {emotion.length > 0 && (
            <>
              <H4 width={350} align="left" mt={20}>
                {t('emotion_how_select', {
                  emotion: t(`mocha_emotion_${emotion}`),
                })}
              </H4>
              <MCSearchableDropdown
                data={emotionHow}
                width={350}
                height={50}
                searchable={false}
                selectedItem={
                  <H3>{how.length ? t(`add_emotion_value_${how}`) : ''}</H3>
                }
                onSelect={item => updateSelectedReflection({how: item})}>
                {emotionHow.map(how => (
                  <H3>{t(`add_emotion_value_${how}`)}</H3>
                ))}
              </MCSearchableDropdown>
            </>
          )}

          <MCCard p={1} mt={30}>
            <MCCard shadow br={1} style={{width: '100%'}} align="center">
              <H4>
                {t('add_emotion_full', {
                  emotion: t(`mocha_emotion_${emotion}`),
                  state: how,
                })}
              </H4>
            </MCCard>
            <MCView p={10}>
              <MCTextInput
                style={{width: dySize(333)}}
                placeholder={t('add_emotion_story_placeholder')}
                placeholderTextColor="gray"
                multiline
                maxHeight={300}
                value={story}
                onChangeText={text => updateSelectedReflection({story: text})}
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
