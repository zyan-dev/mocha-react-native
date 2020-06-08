import React from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';

import {resourceActions, networkActions} from 'Redux/actions';
import {MCContent, MCRootView, MCView} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {H3, H4, H5, MCEmptyText} from 'components/styled/Text';
import {MCImage, MCIcon} from 'components/common';
import {ResourceContentRoots} from 'utils/constants';
import BookResourceScreen from '../Books/Books';
import {dySize} from 'utils/responsive';

class SocialResourcesScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      focused: ResourceContentRoots[0].key,
      defaultTab: 1,
      showPageIndex: 1,
      selectedMember: {},
      sort: true,
      members: [],
    };
  }

  componentDidMount() {
    const {setTrustMemberResourcePageIndex} = this.props;
    setTrustMemberResourcePageIndex(1);
    this.getResourceMembers();
  }

  componentDidUpdate(preProps, preState) {
    if (
      preProps.networksWithResourcePermission !==
      this.props.networksWithResourcePermission
    ) {
      this.getResourceMembers();
    }
  }

  getResourceMembers = () => {
    const {
      networksWithResourcePermission,
      getTrustMemberResources,
      selectTrustMember,
    } = this.props;
    const {selectedMember} = this.state;

    if (
      networksWithResourcePermission.length > 0 &&
      _.isEmpty(selectedMember)
    ) {
      this.setState({selectedMember: networksWithResourcePermission[0]});
      getTrustMemberResources({
        pageIndex: 1,
        trustMember: networksWithResourcePermission[0]._id,
      });

      selectTrustMember(networksWithResourcePermission[0]._id);
    }
  };

  onPressItem = item => {
    this.setState({focused: item.key});
  };

  selectMember = user => {
    const {getTrustMemberResources, selectTrustMember} = this.props;
    this.setState({selectedMember: user});
    selectTrustMember(user._id);
    getTrustMemberResources({
      pageIndex: 1,
      trustMember: user._id,
    });
  };

  sortBook = () => {
    this.setState({sort: !this.state.sort});
  };

  searchNextPage = () => {
    const {
      networksPageLimited,
      networkPageIndex,
      pageSearching,
      getOwnersWithResourcePermission,
    } = this.props;

    if (networksPageLimited || pageSearching) return;
    getOwnersWithResourcePermission(networkPageIndex + 1);
  };

  _renderListItem = ({item}) => {
    const {theme} = this.props;
    const {selectedMember} = this.state;

    return (
      <MCButton onPress={() => this.selectMember(item)}>
        <MCView
          br={27}
          width={54}
          height={54}
          bordered={selectedMember._id == item._id}
          style={{
            borderColor: theme.colors.outline,
            borderWidth: selectedMember._id == item._id ? 2 : 0,
          }}>
          <MCImage
            key={item._id}
            image={{uri: item.avatar}}
            round
            width={50}
            height={50}
            type="avatar"
          />
        </MCView>
      </MCButton>
    );
  };

  render() {
    const {
      theme,
      t,
      trustMemberResources,
      networksWithResourcePermission,
    } = this.props;
    const {focused, sort, selectedMember} = this.state;

    return (
      <MCRootView justify="flex-start">
        <FlatList
          data={networksWithResourcePermission}
          renderItem={this._renderListItem}
          keyExtractor={item => item._id}
          keyboardShouldPersistTaps="always"
          ListEmptyComponent={<MCEmptyText>{t('no_members')}</MCEmptyText>}
          numColumns={1}
          style={{
            width: dySize(350),
            maxHeight: dySize(60),
            marginTop: dySize(10),
          }}
          horizontal={true}
          onEndReached={() => this.searchNextPage()}
          onEndReachedThreshold={0.5}
        />
        <MCView row>
          {ResourceContentRoots.map(item => (
            <MCButton onPress={() => this.onPressItem(item)}>
              <MCIcon
                type="FontAwesome5Pro"
                name={item.icon}
                size={20}
                color={focused == item.key && theme.colors.outline}
              />
            </MCButton>
          ))}
        </MCView>
        <MCView row width={350} justify="space-between" align="center">
          <H4 weight="bold" underline>
            {selectedMember && selectedMember.name
              ? `${selectedMember.name}'s`
              : t('resource_type_all')}{' '}
            {t('bookshelf')}
          </H4>
          <MCButton onPress={() => this.sortBook()}>
            <MCView row>
              <H4>{t('resource_type_book_impact')}</H4>
              <MCIcon
                type="FontAwesome5Pro"
                name={sort ? 'sort-amount-down' : 'sort-amount-up'}
                size={20}
              />
            </MCView>
          </MCButton>
        </MCView>
        {focused == 'books' ? (
          <BookResourceScreen
            selectedMember={selectedMember}
            sort={sort}
            from="trust-member"
            selectedResources={trustMemberResources}
          />
        ) : (
          <MCContent>
            <MCView align="center">
              <H3>Coming Soon</H3>
            </MCView>
          </MCContent>
        )}
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  profile: state.profileReducer,
  trustMemberResources: state.resourceReducer.trustMemberResources,
  resourceTrustMemberPageIndex:
    state.resourceReducer.resourceTrustMemberPageIndex,
  resourceTrustMemberLimited: state.resourceReducer.resourceTrustMemberLimited,
  networksPageLimited: state.networkReducer.networksPageLimited,
  networkPageIndex: state.networkReducer.networkPageIndex,
  pageSearching: state.networkReducer.pageSearching,
  networksWithResourcePermission:
    state.networkReducer.networksWithResourcePermission,
});

const mapDispatchToProps = {
  getTrustMemberResources: resourceActions.getTrustMemberResources,
  setTrustMemberResourcePageIndex:
    resourceActions.setTrustMemberResourcePageIndex,
  selectTrustMember: resourceActions.selectTrustMember,
  getOwnersWithResourcePermission:
    networkActions.getOwnersWithResourcePermission,
};
export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SocialResourcesScreen),
);
