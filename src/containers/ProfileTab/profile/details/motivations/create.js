import React from 'react';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {reflectionActions} from 'Redux/actions';
import {MCHeader, MCImagePicker} from 'components/common';
import {MCView, MCRootView} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import {H3} from 'components/styled/Text';
import {profileActions} from 'Redux/actions';
import {MCContent} from '../../../../../components/styled/View';
import NavigationService from '../../../../../navigation/NavigationService';
import {MCTextInput} from '../../../../../components/styled/Text';

class CreateMotivationScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressRight = () => {
    this.props.addOrUpdateMotivation();
  };

  render() {
    const {
      t,
      selectedMotivation: {
        data: {title, description, image},
      },
      updateSelectedMotivation,
    } = this.props;
    return (
      <MCRootView>
        <MCHeader
          title={t('motivation_headerTitle')}
          hasRight={title.length * description.length > 0}
          rightText={
            updateSelectedMotivation._id ? t('button_update') : t('button_add')
          }
          onPressRight={() => this.onPressRight()}
        />
        <MCContent contentContainerStyle={{padding: dySize(10)}}>
          <H3>{t('motivation_title')}</H3>
          <MCTextInput
            onChangeText={text => updateSelectedMotivation({title: text})}
          />
          <H3 mt={20}>{t('motivation_description')}</H3>
          <MCTextInput
            multiline
            onChangeText={text => updateSelectedMotivation({description: text})}
          />
          <MCView align="center" mt={50}>
            <MCImagePicker
              width={150}
              height={150}
              image={image}
              onSelectImage={img => updateSelectedMotivation({image: img.path})}
              type="picture"
              br={10}
            />
            <H3 align="center" width={240} mt={30}>
              {t('motivation_image_placeholder')}
            </H3>
          </MCView>
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  selectedMotivation: state.reflectionReducer.selectedMotivation,
});

const mapDispatchToProps = {
  updateSelectedMotivation: reflectionActions.updateSelectedMotivation,
  addOrUpdateMotivation: reflectionActions.addOrUpdateMotivation,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(CreateMotivationScreen),
);
