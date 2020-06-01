import React from 'react';
import {Dimensions, View, Image} from 'react-native';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {withTranslation} from 'react-i18next';
import {TabBar, TabView, SceneMap} from 'react-native-tab-view';
import {routerActions, userActions, chatActions} from 'Redux/actions';
import {MCHeader, MCIcon} from 'components/common';
import {MCView, MCRootView} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {H3} from 'components/styled/Text';
import PendingUsersScreen from './pending';
import SocialChatScreen from './chat';
import SocialSearchScreen from './search';
import {PeopleArrowSvg} from 'assets/svgs';
import {OvalYellow, OvalGreen} from 'assets/images';
import NavigationService from 'navigation/NavigationService';

export const OvalGreenImage = styled(Image)`
  position: absolute;
  top: -20px;
  left: -20px;
  height: 128px;
  width: 62px;
  opacity: 0.2;
`;

export const OvalYellowImage = styled(Image)`
  position: absolute;
  top: 100px;
  right: 0px;
  height: 149px;
  width: 33px;
  opacity: 0.2;
`;

class FeedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  componentDidMount() {
    const {profile, getMyChatRooms} = this.props;
    if (profile.userToken) getMyChatRooms();
  }

  onPressRight = () => {
    const {index} = this.state;
    if (index === 1) {
      NavigationService.navigate('CreateChatRoom');
    }
  };

  onChangeTabIndex = i => {
    this.setState({index: i});
    switch (i) {
      case 1:
        this.props.getMyChatRooms();
        break;
      case 2:
        this.props.getTrustMembers({
          status: 0,
          name: '',
          page: 1,
        });
        break;
      default:
        break;
    }
  };

  render() {
    const {index} = this.state;
    const {t, theme, profile, showDrawer} = this.props;
    if (!profile.userToken) {
      return (
        <MCRootView>
          <H3 mb={10}>{t('sign_up_required')}</H3>
          <MCButton
            bordered
            pl={20}
            pr={20}
            onPress={() => NavigationService.navigate('VerificationStack')}>
            <H3>{t('button_go_to_signup')}</H3>
          </MCButton>
        </MCRootView>
      );
    }
    const routes = [
      {
        key: 'search',
        icon: 'search',
      },
      {
        key: 'chat',
        icon: 'comments-alt',
      },
      {
        key: 'pending',
        icon: 'people-arrows',
      },
    ];
    const renderTabBar = props => (
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: theme.colors.outline}}
        style={{
          backgroundColor: 'transparent',
          borderBottomWidth: 0,
        }}
        renderLabel={({route, focused, color}) => {
          const iconColor = focused ? theme.colors.outline : theme.colors.text;
          if (route.key === 'pending') {
            return <PeopleArrowSvg color={iconColor} size={25} />;
          }
          return (
            <>
              <MCIcon
                type="FontAwesome5Pro"
                name={route.icon}
                color={iconColor}
              />
              {this.props.hasMissedMessages &&
                route.key === 'chat' &&
                !focused && (
                  <MCView
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                    }}
                    width={12}
                    height={12}
                    bordered
                    br={6}
                    background={theme.colors.danger}
                  />
                )}
            </>
          );
        }}
      />
    );
    return (
      <View style={{flex: 1, backgroundColor: theme.colors.background}}>
        <OvalGreenImage source={OvalGreen} resizeMode="stretch" />
        <OvalYellowImage source={OvalYellow} resizeMode="stretch" />
        <MCHeader
          hasRight={index === 1}
          title={t('feed_headerTitle')}
          leftIcon="bars"
          onPressBack={() => showDrawer(true)}
          onPressRight={() => this.onPressRight()}
          rightIcon={index === 1 ? 'plus' : ''}
        />
        <TabView
          navigationState={{index, routes}}
          renderScene={SceneMap({
            search: SocialSearchScreen,
            chat: SocialChatScreen,
            pending: PendingUsersScreen,
          })}
          onIndexChange={i => this.onChangeTabIndex(i)}
          initialLayout={Dimensions.get('window')}
          renderTabBar={renderTabBar}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  searchedUsers: state.usersReducer.searchedUsers,
  searchPageLimited: state.usersReducer.searchPageLimited,
  searchPageIndex: state.usersReducer.searchPageIndex,
  pageSearching: state.usersReducer.pageSearching,
  theme: state.routerReducer.theme,
  profile: state.profileReducer,
  hasMissedMessages: state.chatReducer.hasMissedMessages,
});

const mapDispatchToProps = {
  showDrawer: routerActions.setSocialDrawerOpened,
  findUserByName: userActions.findUserByName,
  setSearchPageIndex: userActions.setSearchPageIndex,
  getTrustMembers: userActions.getTrustMembers,
  getMyChatRooms: chatActions.getMyChatRooms,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(FeedScreen),
);
