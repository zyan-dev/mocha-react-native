import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {FlatList} from 'react-native-gesture-handler';
import {selector} from 'Redux/selectors';
import {reflectionActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView, MCCard} from 'components/styled/View';
import {MCHeader, MCImage, MCReadMoreText, MCTagsView} from 'components/common';
import {H3, H4, MCEmptyText, MCIcon} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import NavigationService from 'navigation/NavigationService';

class ValueScreen extends React.Component {
  onPressNew = () => {
    this.props.setInitialReflection('value');
    NavigationService.navigate('EditValue');
  };

  onPressEdit = item => {
    this.props.selectReflection(item);
    NavigationService.navigate('EditValue');
  };

  onPressRemove = item => {
    this.props.removeReflection(item);
  };

  _renderListItem = ({item}) => {
    const value = item.data;
    return (
      <MCView
        key={item.key}
        width={320}
        bordered
        align="center"
        br={10}
        mb={20}
        ml={20}
        mr={20}>
        {value.image.length > 0 && (
          <MCView>
            <MCImage image={{uri: value.image}} width={340} height={180} />
          </MCView>
        )}
        <MCCard shadow br={1} width={340} align="center">
          <MCView width={300} align="center">
            <H3>{value.value}</H3>
          </MCView>
        </MCCard>
        <MCView width={300} mt={10} mb={20}>
          <MCReadMoreText>
            <H4>{value.phrase}</H4>
          </MCReadMoreText>
        </MCView>
        <MCView row width={300} justify="flex-end">
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
    const {t, values} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          title={t('add_value_headerTitle')}
          hasRight={true}
          rightText={t('add_addButton')}
          onPressRight={() => this.onPressNew()}
        />
        <MCContent>
          <FlatList
            contentContainerStyle={{alignItems: 'center'}}
            data={values}
            renderItem={this._renderListItem}
            keyExtractor={item => item._id}
            keyboardShouldPersistTaps="always"
            ListEmptyComponent={<MCEmptyText>No results</MCEmptyText>}
          />
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  values: selector.reflections.getMyValues(state),
});

const mapDispatchToProps = {
  setInitialReflection: reflectionActions.setInitialReflection,
  removeReflection: reflectionActions.removeReflection,
  selectReflection: reflectionActions.selectReflection,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(ValueScreen),
);
