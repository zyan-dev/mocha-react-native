import React from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {userActions} from 'Redux/actions';
import {MCRootView, MCView} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {MCSearchInput, MCImage} from 'components/common';
import {H3} from 'components/styled/Text';

class ProgressMembersTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: '',
    };
  }

  onChangeSearchName = text => {
    const {getTrustMembers} = this.props;
    this.setState({searchName: text});
    getTrustMembers({
      status: 1,
      name: text,
      page: 1,
    });
  };

  searchNextPageUsers = () => {
    const {
      userPageLimited,
      userPageSearching,
      userSearchIndex,
      getTrustMembers,
    } = this.props;
    if (userPageLimited || userPageSearching) return;
    getTrustMembers({
      status: 1,
      name: text,
      page: userSearchIndex + 1,
    });
  };

  onPressUser = user => {};

  _renderAvatar = ({item}) => {
    const user = item;
    return (
      <MCButton mr={10} onPress={() => this.onPressUser(user)}>
        <MCImage
          image={{uri: user.avatar}}
          type="avatar"
          width={40}
          height={40}
          round
        />
      </MCButton>
    );
  };

  render() {
    const {t, trustMembers} = this.props;
    const {searchName} = this.state;
    return (
      <MCRootView justify="flex-start">
        <MCSearchInput
          width={350}
          text={searchName}
          onChange={text => this.onChangeSearchName(text)}
          placeholder={t('placeholder_search_by_name')}
        />
        <MCView width={350} height={60} justify="center">
          <FlatList
            data={trustMembers}
            horizontal
            renderItem={this._renderAvatar}
            keyExtractor={item => item._id}
            onEndReached={() => this.searchNextPageUsers()}
            onEndReachedThreshold={0.5}
          />
        </MCView>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  trustMembers: state.usersReducer.trustMembers,
  userSearchIndex: state.usersReducer.searchPageIndex,
  userPageLimited: state.usersReducer.searchPageLimited,
  userPageSearching: state.usersReducer.pageSearching,
});

const mapDispatchToProps = {
  getTrustMembers: userActions.getTrustMembers,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProgressMembersTab),
);
