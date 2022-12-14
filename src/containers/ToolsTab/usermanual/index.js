import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {FlatList} from 'react-native-gesture-handler';
import {selector} from 'Redux/selectors';
import {reflectionActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView, MCCard} from 'components/styled/View';
import {
  MCHeader,
  MCImage,
  MCReadMoreText,
  MCTagsView,
  MCIcon,
} from 'components/common';
import {H3, H4, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import NavigationService from 'navigation/NavigationService';

class UserManualScreen extends React.Component {
  onPressNew = () => {
    this.props.setInitialReflection('manual');
    setTimeout(() => {
      NavigationService.navigate('EditUserManual');
    });
  };

  onPressEdit = item => {
    this.props.selectReflection(item);
    NavigationService.navigate('EditUserManual');
  };

  onPressRemove = item => {
    this.props.removeReflection(item);
  };

  getLabelWithKey = key => {
    const {t} = this.props;
    if (key.indexOf('custom_manual_title') < 0) {
      return t(`mocha_manual_${key}`);
    } else {
      return key.split('custom_manual_title')[1];
    }
  };

  _renderListItem = ({item}) => {
    const {t} = this.props;
    const usermanual = item.data;
    return (
      <MCView
        key={item.key}
        width={340}
        bordered
        align="center"
        br={10}
        mb={20}>
        <MCCard shadow br={1} width={340} align="center" mb={10}>
          <MCView width={320} align="center">
            <H3>{this.getLabelWithKey(usermanual.title)}</H3>
          </MCView>
        </MCCard>
        <MCView width={320}>
          <MCReadMoreText>
            <H4 ml={20}>{usermanual.text}</H4>
          </MCReadMoreText>
        </MCView>
        {usermanual.image.length > 0 && (
          <MCView mt={20}>
            <MCImage
              image={{uri: usermanual.image}}
              width={120}
              height={120}
              br={10}
            />
          </MCView>
        )}
        <MCView width={320} mt={20}>
          <MCTagsView tags={usermanual.tags} />
        </MCView>
        <MCView row width={320} align="center">
          <H4>{`${t('label_vulnerability')}:  ${usermanual.vulnerability}`}</H4>
          <MCView row style={{flex: 1}} justify="flex-end">
            <MCButton onPress={() => this.onPressEdit(item)}>
              <MCIcon name="ios-create" />
            </MCButton>
            <MCButton onPress={() => this.onPressRemove(item)}>
              <MCIcon name="ios-trash" />
            </MCButton>
          </MCView>
        </MCView>
      </MCView>
    );
  };

  render() {
    const {t, usermanuals} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          title={t('title_user_manual')}
          hasRight={true}
          rightIcon="plus"
          onPressRight={() => this.onPressNew()}
        />
        <MCContent>
          <FlatList
            contentContainerStyle={{alignItems: 'center'}}
            data={usermanuals}
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
  usermanuals: selector.reflections.getMySpecialReflections(state, 'Manual'),
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
  )(UserManualScreen),
);
