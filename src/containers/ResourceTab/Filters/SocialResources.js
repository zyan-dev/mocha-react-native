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
    const {setMemberResourcePageIndex} = this.props;
    setMemberResourcePageIndex(1);
    this.getMemberResources();
  }

  componentDidUpdate(preProps, preState) {
    if (
      preProps.networksWithResourcePermission !==
      this.props.networksWithResourcePermission
    ) {
      this.getMemberResources();
    }
  }

  getMemberResources = () => {
    const {getSelectedMemberResources, selectMember, profile} = this.props;
    const {selectedMember} = this.state;

    if (_.isEmpty(selectedMember)) {
      this.setState({selectedMember: profile});
      getSelectedMemberResources({
        pageIndex: 1,
        member: profile._id,
      });

      selectMember(profile._id);
    }
  };

  onPressItem = item => {
    this.setState({focused: item.key});
  };

  selectMember = user => {
    const {getSelectedMemberResources, selectMember} = this.props;
    this.setState({selectedMember: user});
    selectMember(user._id);
    getSelectedMemberResources({
      pageIndex: 1,
      member: user._id,
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
      selectedMemberResources,
      networksWithResourcePermission,
      profile,
    } = this.props;
    const {focused, sort, selectedMember} = this.state;

    return (
      <MCRootView justify="flex-start">
        <MCView row align="center">
          <MCButton
            onPress={() => this.selectMember(profile)}
            mt={15}
            ml={10}
            mr={30}>
            <MCView
              br={27}
              width={54}
              height={54}
              bordered={selectedMember._id == profile._id}
              style={{
                borderColor: theme.colors.outline,
                borderWidth: selectedMember._id == profile._id ? 2 : 0,
              }}>
              <MCImage
                key={profile._id}
                image={{uri: profile.avatar}}
                round
                width={50}
                height={50}
                type="avatar"
              />
            </MCView>
          </MCButton>
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
        </MCView>

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
            selectedResources={selectedMemberResources}
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
  selectedMemberResources: state.resourceReducer.selectedMemberResources,
  resourceMemberPageIndex: state.resourceReducer.resourceMemberPageIndex,
  resourceTrustMemberLimited: state.resourceReducer.resourceTrustMemberLimited,
  networksPageLimited: state.networkReducer.networksPageLimited,
  networkPageIndex: state.networkReducer.networkPageIndex,
  pageSearching: state.networkReducer.pageSearching,
  networksWithResourcePermission:
    state.networkReducer.networksWithResourcePermission,
});

const mapDispatchToProps = {
  getSelectedMemberResources: resourceActions.getSelectedMemberResources,
  setMemberResourcePageIndex: resourceActions.setMemberResourcePageIndex,
  selectMember: resourceActions.selectMember,
  getOwnersWithResourcePermission:
    networkActions.getOwnersWithResourcePermission,
};
export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SocialResourcesScreen),
);
