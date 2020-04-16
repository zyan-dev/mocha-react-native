import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {FlatList} from 'react-native-gesture-handler';
import {selector} from 'Redux/selectors';
import {reflectionActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView, MCCard} from 'components/styled/View';
import {MCHeader, MCReadMoreText} from 'components/common';
import {MCButton} from 'components/styled/Button';
import {H3, H4, MCEmptyText, MCIcon} from 'components/styled/Text';
import NavigationService from 'navigation/NavigationService';

class EmotionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressNew = () => {
    this.props.setInitialReflection('emotion');
    NavigationService.navigate('EditEmotion');
  };

  onPressEdit = item => {
    this.props.selectReflection(item);
    NavigationService.navigate('EditEmotion');
  };

  onPressRemove = item => {
    this.props.removeReflection(item);
  };

  _renderListItem = ({item}) => {
    const emotion = item.data;
    const {t} = this.props;
    return (
      <MCView
        key={item.key}
        width={340}
        bordered
        align="center"
        br={10}
        mb={20}>
        <MCCard shadow br={1} width={340} align="center">
          <MCView width={320} row wrap>
            <H4>{t('add_emotion_heading')}</H4>
            <H4 weight="bold">{t(`mocha_emotion_${emotion.emotion}`)}</H4>
            <H4 weight="italic"> {t(`add_emotion_value_${emotion.how}`)}</H4>
          </MCView>
        </MCCard>
        <MCView width={320} mt={10}>
          <MCReadMoreText>
            <H4>{emotion.story}</H4>
          </MCReadMoreText>
        </MCView>
        <MCView row width={320} justify="flex-end">
          <MCButton onPress={() => this.onPressEdit(item)}>
            <MCIcon name="ios-create" />
          </MCButton>
          <MCButton onPress={() => this.onPressRemove(item)}>
            <MCIcon name="ios-trash" />
          </MCButton>
        </MCView>
      </MCView>
    );
  };

  render() {
    const {t, emotions} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          title={t('add_reflection_mood_and_emotion_header')}
          hasRight={true}
          rightIcon="plus"
          onPressRight={() => this.onPressNew()}
        />
        <MCContent>
          <FlatList
            contentContainerStyle={{alignItems: 'center'}}
            data={emotions}
            renderItem={this._renderListItem}
            keyExtractor={item => item._id}
            keyboardShouldPersistTaps="always"
            ListEmptyComponent={<MCEmptyText>{t('no_result')}</MCEmptyText>}
          />
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  emotions: selector.reflections.getMySpecialReflections(state, 'Emotion'),
});

const mapDispatchToProps = {
  setInitialReflection: reflectionActions.setInitialReflection,
  removeReflection: reflectionActions.removeReflection,
  selectReflection: reflectionActions.selectReflection,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(EmotionScreen),
);
