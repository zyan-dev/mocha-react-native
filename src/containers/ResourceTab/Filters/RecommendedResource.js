import React from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {routerActions, resourceActions} from 'Redux/actions';
import {withTranslation} from 'react-i18next';
import {MCButton} from 'components/styled/Button';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {H3, H4, H5, MCEmptyText} from 'components/styled/Text';
import {MCImage, MCIcon} from 'components/common';
import BookResourceScreen from '../Books/Books';
import {dySize} from 'utils/responsive';
import {ResourceContentRoots} from 'utils/constants';
class RecommendedResourcesScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedMember: {
        data: [],
      },
      sort: true,
      focused: ResourceContentRoots[0].key,
    };
  }

  componentDidMount() {
    this.props.setRecommendedOwnersPageIndex(1);
  }

  componentDidUpdate(preProps, preState) {
    if (preProps.recommededOwners !== this.props.recommededOwners) {
      if (this.props.recommededOwners.length === 0) {
        this.setState({
          selectedMember: {
            data: [],
          },
        });
      } else {
        this.props.recommededOwners.forEach(v => {
          if (v.ownerId == this.state.selectedMember.ownerId) {
            return this.setState({selectedMember: v});
          } else {
            this.setState({
              selectedMember: {
                data: [],
              },
            });
          }
        });
      }
    }
  }

  onPressItem = item => {
    this.setState({focused: item.key});
  };

  selectMember = user => {
    this.setState({selectedMember: user});
  };

  searchNextPage = () => {
    const {
      resourceRcommendOwnersLimited,
      resourceRecommendOwnersIndex,
      pageSearching,
      getRecommendedOwners,
    } = this.props;
    if (resourceRcommendOwnersLimited || pageSearching) return;
    getRecommendedOwners(resourceRecommendOwnersIndex + 1);
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
          bordered={selectedMember.ownerId == item.ownerId}
          style={{
            borderColor: theme.colors.outline,
            borderWidth: selectedMember.ownerId == item.ownerId ? 2 : 0,
          }}>
          <MCImage
            key={item.ownerId}
            image={{uri: item.ownerAvatar}}
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
    const {selectedMember, sort, focused} = this.state;
    const {t, recommededOwners, theme} = this.props;

    return (
      <MCRootView>
        <MCView row align="center">
          <MCView mt={10} mr={20}>
            <MCButton onPress={() => this.selectMember('global')}>
              <MCIcon
                type="FontAwesome5Pro"
                name="globe"
                size={50}
                color={selectedMember === 'global' && theme.colors.outline}
              />
            </MCButton>
          </MCView>

          <FlatList
            data={recommededOwners}
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
        {selectedMember === 'global' ? (
          <MCContent>
            <MCView row justify="center">
              <H4 align="center">Odyssey Recommendations Coming Soon!</H4>
            </MCView>
          </MCContent>
        ) : focused == 'books' ? (
          <BookResourceScreen
            selectedMember={selectedMember}
            sort={sort}
            from="recommended"
            selectedResources={selectedMember.data}
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
  recommededOwners: state.resourceReducer.recommededOwners,
  resourceRecommendOwnersIndex:
    state.resourceReducer.resourceRecommendOwnersIndex,
  resourceRcommendOwnersLimited:
    state.resourceReducer.resourceRcommendOwnersLimited,
});

const mapDispatchToProps = {
  getRecommendedOwners: resourceActions.getRecommendedOwners,
  setRecommendedOwnersPageIndex: resourceActions.setRecommendedOwnersPageIndex,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(RecommendedResourcesScreen),
);
