import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {MCRootView} from 'components/styled/View';
import {userActions} from 'Redux/actions';
import {MCHeader, MCSearchInput, MCImage, MCModal} from 'components/common';
import {H3, H4} from 'components/styled/Text';
import {dySize} from 'utils/responsive';
import {selector} from 'Redux/selectors';
import NavigationService from 'navigation/NavigationService';
import {MCContent, MCCard, MCView} from '../../../../components/styled/View';
import {MCIcon} from '../../../../components/styled/Text';
import {MCButton} from '../../../../components/styled/Button';

class SendRequestScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      selectedUser: null,
      showModal: false,
    };
  }

  onPressUser = user => {
    if (user.networkState > -1) {
      return;
    }
    this.setState({selectedUser: user, showModal: true});
  };

  sendRequest = () => {
    const {selectedUser} = this.state;
    this.props.sendContactRequest({to: selectedUser._id});
    this.setState({showModal: false});
  };

  onPressUserAvatar = user => {
    NavigationService.navigate('UserProfile', {id: user._id});
  };

  render() {
    const {t, theme, allUsers, myProfile} = this.props;
    const {searchText, selectedUser, showModal} = this.state;
    return (
      <MCRootView justify="flex-start">
        <MCHeader title={t('user_search_title')} />
        <MCSearchInput
          width={350}
          text={searchText}
          onChange={text => this.setState({searchText: text})}
        />
        <MCContent contentContainerStyle={{paddingHorizontal: dySize(10)}}>
          {allUsers.map(user => {
            const userName = user.user_id;
            const fullName = user.name;
            const filterString = searchText.toLowerCase();
            if (!userName || !fullName || user._id === myProfile._id) {
              return;
            } else if (
              userName.toLowerCase().indexOf(filterString) < 0 &&
              fullName.toLowerCase().indexOf(filterString) < 0
            ) {
              return;
            }
            return (
              <MCCard row align="center" shadow mt={10} p={0}>
                <MCButton onPress={() => this.onPressUserAvatar(user)}>
                  <MCImage
                    width={80}
                    height={80}
                    round
                    type="avatar"
                    image={{uri: user.avatar}}
                  />
                </MCButton>
                <MCView style={{flex: 1}} ml={10} justify="center">
                  <H3>{user.name}</H3>
                  <H4
                    padding={0}
                    color={theme.colors.border}>{`@${user.user_id}`}</H4>
                </MCView>
                {user.networkState === -1 && (
                  <MCButton onPress={() => this.onPressUser(user)}>
                    <MCIcon
                      name="ios-add-circle-outline"
                      color={theme.colors.toggle_on}
                      size={30}
                    />
                  </MCButton>
                )}
                {user.networkState === 0 && (
                  <MCButton>
                    <MCIcon
                      name="ios-hourglass"
                      color={theme.colors.border}
                      size={30}
                    />
                  </MCButton>
                )}
                {user.networkState === 1 && (
                  <MCButton>
                    <MCIcon
                      name="ios-checkmark-circle-outline"
                      color={theme.colors.border}
                      size={30}
                    />
                  </MCButton>
                )}
              </MCCard>
            );
          })}
        </MCContent>
        {selectedUser && (
          <MCModal
            isVisible={showModal}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            onClose={() => this.setState({showModal: false})}>
            <MCView align="center" width={320} p={20}>
              <MCImage
                width={60}
                height={60}
                image={{uri: selectedUser.avatar}}
                round
              />
              <H3 weight="bold">{selectedUser.name}</H3>
              <H4 align="center">{t('contact_request_modal_question')}</H4>
              <MCButton bordered mt={20} onPress={() => this.sendRequest()}>
                <H3 width={100} align="center">
                  {t('yes')}
                </H3>
              </MCButton>
            </MCView>
          </MCModal>
        )}
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  myProfile: state.profileReducer,
  allUsers: selector.users.getAllMembersWithNetworkState(state),
});

const mapDispatchToProps = {
  sendContactRequest: userActions.sendContactRequest,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(SendRequestScreen),
);
