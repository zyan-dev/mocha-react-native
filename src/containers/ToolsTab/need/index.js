import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {FlatList} from 'react-native-gesture-handler';
import {selector} from 'Redux/selectors';
import {reflectionActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView, MCCard} from 'components/styled/View';
import {MCHeader, MCReadMoreText} from 'components/common';
import {MCButton} from 'components/styled/Button';
import {H4, MCEmptyText, MCIcon} from 'components/styled/Text';
import NavigationService from 'navigation/NavigationService';

class NeedScreen extends React.Component {
  onPressNew = () => {
    this.props.setInitialReflection('need');
    NavigationService.navigate('EditNeed');
  };

  onPressEdit = item => {
    this.props.selectReflection(item);
    NavigationService.navigate('EditNeed');
  };

  onPressRemove = item => {
    this.props.removeReflection(item);
  };

  _renderListItem = ({item}) => {
    const need = item.data;
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
            <H4 pv={1}>{t('add_need_heading')}</H4>
            <H4 pv={1} weight="bold">
              {t(`mocha_need_${need.need}`)}
            </H4>
            <H4 pv={1} weight="italic">
              {' '}
              {t('add_need_is', {state: t(`mocha_need_value_${need.value}`)})}
            </H4>
            <H4 pv={1}>{t('because')}</H4>
          </MCView>
        </MCCard>
        <MCView width={320} mt={10}>
          <MCReadMoreText>
            <H4 ph={5}>{need.reason}</H4>
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
    const {t, needs} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          title={t('add_reflection_need_header')}
          hasRight={true}
          rightIcon="plus"
          onPressRight={() => this.onPressNew()}
        />
        <MCContent>
          <FlatList
            contentContainerStyle={{alignItems: 'center'}}
            data={needs}
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
  needs: selector.reflections.getMySpecialReflections(state, 'Need'),
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
  )(NeedScreen),
);
