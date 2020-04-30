import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import NavigationService from 'navigation/NavigationService';
import {userActions} from 'Redux/actions';
import {MCHeader, MCImage, MCSearchInput, MCIcon} from 'components/common';
import {H3, H4} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCRootView, MCContent, MCView, MCCard} from 'components/styled/View';
import {getStringIndexOf} from 'services/operators';

class SelectUserScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      isMultiple: props.route.params.multiple,
      origin_selectedUsers: props.selectedUsers,
      origin_selectedUser: props.selectedUser,
    };
  }

  onPressUserAvatar = user => {
    NavigationService.navigate('UserProfile', {id: user._id});
  };

  selectUser = user => {
    const {isMultiple} = this.state;
    if (isMultiple) {
      this.props.selectUser(user);
    } else {
      this.props.selectSingleUser(user);
    }
  };

  deselectUser = user => {
    const {isMultiple} = this.state;
    if (isMultiple) {
      this.props.deselectUser(user);
    }
  };

  render() {
    const {searchText, isMultiple} = this.state;
    const {
      t,
      theme,
      allUsers,
      myProfile,
      selectedUsers,
      selectedUser,
    } = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader title={t('add_reflection_feedback_header')} />
        <MCSearchInput
          width={350}
          text={searchText}
          onChange={text => this.setState({searchText: text})}
        />
        <MCContent contentContainerStyle={{paddingHorizontal: 10}}>
          {allUsers.map(user => {
            const userName = user.user_id;
            const fullName = user.name;
            const filterString = searchText.toLowerCase();
            if (!userName || !fullName || user._id === myProfile._id) {
              return;
            } else if (
              getStringIndexOf(userName, filterString) < 0 &&
              getStringIndexOf(fullName, filterString) < 0
            ) {
              return;
            }
            const filtered = selectedUsers.filter(
              selected => selected._id === user._id,
            );
            const selected = isMultiple
              ? filtered.length > 0
              : selectedUser._id === user._id;
            return (
              <MCCard
                key={user.user_id}
                row
                align="center"
                shadow
                mt={10}
                p={0}>
                <MCButton onPress={() => this.onPressUserAvatar(user)}>
                  <MCImage
                    width={80}
                    height={80}
                    round
                    type="avatar"
                    image={{uri: user.avatar}}
                  />
                </MCButton>
                <MCButton
                  onPress={() => {
                    selected ? this.deselectUser(user) : this.selectUser(user);
                  }}
                  row
                  justify="space-between"
                  align="center"
                  style={{height: '100%', flex: 1}}>
                  <MCView justify="center">
                    <H3>{user.name}</H3>
                    <H4 padding={0} color={theme.colors.border}>
                      {`@${user.user_id}`}
                    </H4>
                  </MCView>
                  {selected ? (
                    <MCIcon
                      name="ios-checkmark-circle-outline"
                      color={theme.colors.border}
                      size={30}
                    />
                  ) : (
                    <MCIcon
                      name="ios-add-circle-outline"
                      color={theme.colors.toggle_on}
                      size={30}
                    />
                  )}
                </MCButton>
              </MCCard>
            );
          })}
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  selectedUsers: state.usersReducer.selectedUsers,
  selectedUser: state.usersReducer.selectedUser,
  allUsers: state.usersReducer.allUsers,
  myProfile: state.profileReducer,
  theme: state.routerReducer.theme,
});

const mapDispatchToProps = {
  selectUser: userActions.selectUser,
  setSeletedUsers: userActions.setSeletedUsers,
  deselectUser: userActions.deselectUser,
  selectSingleUser: userActions.selectSingleUser,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SelectUserScreen),
);
