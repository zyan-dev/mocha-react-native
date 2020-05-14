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

class AllResourcesScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      focused: ResourceContentRoots[0].key,
      defaultTab: 1,
      showPageIndex: 1,
      selectedMember: {},
      sort: true,
    };
  }

  componentDidMount() {
    if (this.props.profile.userToken.length) {
      this.props.getAllResources();
    }
  }

  onPressItem = item => {
    this.setState({focused: item.key});
  };

  selectMember = user => {
    if (user._id == this.state.selectedMember._id) {
      this.setState({selectedMember: {}});
    } else {
      this.setState({selectedMember: user});
    }
  };

  sortBook = () => {
    this.setState({sort: !this.state.sort});
  };

  _renderListItem = ({item}) => {
    console.log(123, item);
    const {theme} = this.props;
    const {selectedMember} = this.state;
    return (
      <MCButton ml={10} onPress={() => this.selectMember(item)}>
        <MCView
          mr={5}
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
    const {theme, t, allResources} = this.props;
    const {focused, sort, selectedMember} = this.state;

    let members = [];

    allResources.forEach(resource => {
      if (resource.type == focused && resource.data) {
        const temp = {
          _id: resource.ownerId,
          name: resource.ownerName,
          avatar: resource.ownerAvatar,
        };

        members.forEach((member, index) => {
          if (member._id == resource.ownerId) {
            members.splice(index, 1);
          }
        });

        members.push(temp);
      }
    });

    return (
      <MCRootView>
        <MCView row wrap mt={20}>
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
        <MCView row mt={10}>
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
        <MCView row mt={10} width={350} justify="space-between" align="center">
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
          <BookResourceScreen selectedMember={selectedMember} sort={sort} />
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
});

const mapDispatchToProps = {
  getAllResources: resourceActions.getAllResources,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AllResourcesScreen),
);
