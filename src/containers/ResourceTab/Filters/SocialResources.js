import React from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

import {resourceActions} from 'Redux/actions';
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
      selectedResources: [],
    };
  }

  componentDidMount() {
    this.getResourceMembers();
  }

  componentDidUpdate(preProps, preState) {
    if (
      preProps.trustMembers !== this.props.trustMembers ||
      preProps.allResources !== this.props.allResources
    ) {
      this.getResourceMembers();
    }
  }

  getResourceMembers = () => {
    const {allResources, trustMembers} = this.props;
    const {focused} = this.state;

    let members = [],
      resources = [];
    allResources.forEach(resource => {
      resource.data.map(item => {
        if (
          item.type == focused &&
          item.data &&
          trustMembers.findIndex(member => member._id == item.ownerId) > -1
        ) {
          resources.push(item);
          const temp = {
            _id: item.ownerId,
            name: item.ownerName,
            avatar: item.ownerAvatar,
          };

          members.forEach((member, index) => {
            if (member._id == item.ownerId) {
              members.splice(index, 1);
            }
          });

          members.push(temp);
        }
      });
    });
    this.setState({
      members: members,
      selectedMember: members[0],
      selectedResources: resources,
    });
  };

  onPressItem = item => {
    this.setState({focused: item.key});
  };

  selectMember = user => {
    this.setState({selectedMember: user});
  };

  sortBook = () => {
    this.setState({sort: !this.state.sort});
  };

  _renderListItem = ({item}) => {
    const {theme, myNetworks} = this.props;
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
          />
        </MCView>
      </MCButton>
    );
  };

  render() {
    const {theme, t} = this.props;
    const {
      focused,
      sort,
      selectedMember,
      members,
      selectedResources,
    } = this.state;

    return (
      <MCRootView>
        <MCView row wrap mt={5} ph={5}>
          <FlatList
            data={members}
            renderItem={this._renderListItem}
            keyExtractor={item => item._id}
            keyboardShouldPersistTaps="always"
            ListEmptyComponent={<MCEmptyText>{t('no_result')}</MCEmptyText>}
            numColumns={1}
            style={{width: dySize(350)}}
            horizontal={true}
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
            {selectedMember.name
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
            selectedMember={selectedMember ? selectedMember : members[0]}
            sort={sort}
            selectedResources={selectedResources}
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
  allResources: state.resourceReducer.allResources,
  profile: state.profileReducer,
  trustMembers: state.usersReducer.trustMembers,
});

const mapDispatchToProps = {
  getAllResources: resourceActions.getAllResources,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SocialResourcesScreen),
);
