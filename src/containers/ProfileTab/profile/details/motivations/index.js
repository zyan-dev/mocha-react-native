import React from 'react';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import {MCHeader, MCImage, MCReadMoreText} from 'components/common';
import {MCView, MCCard, MCRootView, MCContent} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {H3, H4, MCEmptyText, MCIcon} from 'components/styled/Text';
import {reflectionActions} from 'Redux/actions';
import NavigationService from 'navigation/NavigationService';
import {selector} from 'Redux/selectors';

class MotivationListScreen extends React.PureComponent {
  onPressNew = () => {
    this.props.setInitialReflection('motivation');
    NavigationService.navigate('AddMotivation');
  };

  onPressEdit = item => {
    const {
      selectedReflection,
      selectReflection,
      addOrUpdateReflection,
    } = this.props;
    if (selectedReflection && selectedReflection._id === item._id) {
      // save
      addOrUpdateReflection();
    } else {
      // edit
      selectReflection(item);
      NavigationService.navigate('AddMotivation');
    }
  };

  onPressRemove = item => {
    this.props.removeReflection(item);
  };

  _renderListItem = ({item}) => {
    const motivation = item.data;
    return (
      <MCView
        key={item.key}
        width={340}
        bordered
        align="center"
        br={10}
        mb={20}>
        <MCCard shadow br={1} width={340} align="center">
          <MCView width={320}>
            <H3>{motivation.title}</H3>
          </MCView>
        </MCCard>
        <MCView width={320} mt={10} mb={20}>
          <MCReadMoreText>
            <H4 ml={20}>{motivation.description}</H4>
          </MCReadMoreText>
        </MCView>
        {motivation.image.length > 0 && (
          <MCImage image={{uri: motivation.image}} type="picture" />
        )}
        <MCView row align="center" width={320} justify="flex-end">
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
    const {t, motivations} = this.props;
    return (
      <MCRootView>
        <MCHeader
          title={t('motivation_headerTitle')}
          hasRight
          rightIcon="plus"
          onPressRight={() => this.onPressNew()}
        />
        <MCContent>
          <FlatList
            data={motivations}
            renderItem={this._renderListItem.bind(this)}
            keyExtractor={item => item._id}
            keyboardShouldPersistTaps="always"
            ListEmptyComponent={<MCEmptyText>No results</MCEmptyText>}
            contentContainerStyle={{alignItems: 'center'}}
          />
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  motivations: selector.reflections.getMySpecialReflections(
    state,
    'Motivation',
  ),
  selectedReflection: state.reflectionReducer.selectedReflection,
});

const mapDispatchToProps = {
  setInitialReflection: reflectionActions.setInitialReflection,
  removeReflection: reflectionActions.removeReflection,
  selectReflection: reflectionActions.selectReflection,
  updateSelectedReflection: reflectionActions.updateSelectedReflection,
  addOrUpdateReflection: reflectionActions.addOrUpdateReflection,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MotivationListScreen),
);
