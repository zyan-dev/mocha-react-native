import React from 'react';
import {Platform} from 'react-native';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Footer} from 'native-base';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {MCView, NativeCard} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {MCIcon} from 'components/common';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
import {
  BookLightSvg,
  RulerLightSvg,
  UserLightSvg,
  UserCrownSvg,
} from 'assets/svgs';
import {
  profileActions,
  reflectionActions,
  challengeActions,
  feedbackActions,
  routerActions,
  otherActions,
  networkActions,
} from 'Redux/actions';

const TabBarHeight = dySize(70);
const TabIconSize = dySize(30);
const TabWrapper = styled(Footer)`
  height: ${dySize(80)}px;
  background-color: ${props => props.theme.colors.background};
  border-top-width: 0px;
  margin-bottom: ${isIphoneX() ? dySize(-30) : dySize(-10)}px;
  padding-bottom: ${isIphoneX() ? dySize(30) : dySize(10)}px;
`;

class TabView extends React.PureComponent {
  tabIndex = 2;
  lastTime = 0;

  constructor(props) {
    super(props);
    this.state = {
      tabIndex: props.initialIndex,
    };
  }

  componentWillMount() {
    this.props.setMainTabIndex(2);
  }

  componentDidMount() {
    this.mounted = true;
    const {userToken, profile, getUserChallenges} = this.props;
    userToken.length > 0 && getUserChallenges(profile._id);
    setTimeout(() => {
      this.onClickTab(this.props.initialIndex);
    }, 1500);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidUpdate(preProps, prevState) {
    if (preProps.state.index !== this.props.state.index) {
      this.props.setMainTabIndex(this.props.state.index);
      this.onClickTab(this.props.state.index);
      this.setState({tabIndex: this.props.state.indexs});
    }
  }

  onClickTab = index => {
    const {
      profile,
      userToken,
      getMyProfile,
      getMyReflections,
      getMyFeedbacks,
      showSocialDrawer,
      showToolsDrawer,
      showProfileDrawer,
      getUserCommits,
      getOwnersWithResourcePermission,
      setSearchOwnersWithResourcePermissionIndex,
    } = this.props;

    const TabScreens = [
      'TabFeed',
      'TabResource',
      'TabProgress',
      'TabTools',
      'TabProfile',
    ];
    const TabHomeScreens = [
      {name: userToken.length > 0 ? 'Feed' : 'Auth_SendSMS'},
      {name: 'Resources'},
      {name: 'Progress'},
      {name: 'ToolsTabHome'},
      {name: 'Profile'},
    ];

    this.props.setMainTabIndex(index);

    // detect double clicking
    if (this.tabIndex === index && new Date().getTime() - this.lastTime < 800) {
      // double clicked
      NavigationService.navigate(TabHomeScreens[index].name);
      if (index === 3) {
        this.props.changeToolsTab(0);
        showToolsDrawer(false);
      } else if (index === 4) this.props.changeProfileTab('overview');
    } else {
      // one time clicked
      NavigationService.navigate(TabScreens[index]);
    }

    // set values to detect the next double click
    this.tabIndex = index;
    this.lastTime = new Date().getTime();
    showSocialDrawer(false);

    // call APIs
    switch (index) {
      case 0:
        // user clicked Social Tab
        break;
      case 1:
        // user clicked Resource Tab
        userToken.length > 0 && setSearchOwnersWithResourcePermissionIndex(1);
        userToken.length > 0 && getOwnersWithResourcePermission(1);
        break;
      case 2:
        // user clicked Progress Tab
        userToken.length > 0 && this.props.getUserChallenges(profile._id);
        break;
      case 3:
        // user clicked Tools Tab
        showToolsDrawer(false);
        userToken.length > 0 && getMyReflections();
        break;
      case 4:
        // user clicked Profile Tab
        showProfileDrawer(false);
        userToken.length > 0 && getMyProfile();
        userToken.length > 0 && getMyReflections();
        userToken.length > 0 && getMyFeedbacks();
        userToken.length > 0 && getUserCommits(profile._id);
        break;
      default:
        break;
    }
  };

  render() {
    const {t, theme, mainTabIndex, setCrown, hasMissedMessages} = this.props;

    return (
      <TabWrapper>
        <NativeCard>
          <MCView
            row
            width={375}
            align="center"
            height={isIphoneX() ? 60 : 70}
            style={{
              shadowColor: '#000000',
              shadowRadius: 10,
              shadowOpacity: 0.5,
              elevation: 11,
              shadowOffset: {width: 0, height: -10},
              backgroundColor: theme.colors.background,
            }}>
            <MCButton
              rippleCentered
              rippleSize={dySize(100)}
              onPress={() => this.onClickTab(0)}
              align="center"
              style={{flex: 1}}>
              <MCIcon
                size={TabIconSize}
                type="FontAwesome5Pro-Light"
                name="users"
                padding={1}
                color={
                  mainTabIndex === 0 ? theme.colors.outline : theme.colors.text
                }
              />
              {/* Show red badge when user has unread messages */}
              {hasMissedMessages && mainTabIndex !== 0 && (
                <MCView
                  style={{
                    position: 'absolute',
                    top: dySize(0),
                    right: dySize(20),
                  }}
                  width={12}
                  height={12}
                  bordered
                  br={6}
                  background={theme.colors.danger}
                />
              )}
            </MCButton>
            <MCButton
              rippleCentered
              rippleSize={dySize(100)}
              align="center"
              onPress={() => this.onClickTab(1)}
              style={{flex: 1}}>
              <BookLightSvg
                size={TabIconSize}
                theme={theme}
                color={
                  mainTabIndex === 1 ? theme.colors.outline : theme.colors.text
                }
              />
            </MCButton>
            <MCButton
              rippleCentered
              rippleSize={dySize(100)}
              align="center"
              onPress={() => this.onClickTab(2)}
              style={{flex: 1}}>
              <MCIcon
                size={TabIconSize}
                type="FontAwesome5Pro-Light"
                name="arrow-circle-up"
                padding={1}
                color={
                  mainTabIndex === 2 ? theme.colors.outline : theme.colors.text
                }
              />
            </MCButton>
            <MCButton
              rippleCentered
              rippleSize={dySize(100)}
              align="center"
              onPress={() => this.onClickTab(3)}
              style={{flex: 1}}>
              <RulerLightSvg
                size={TabIconSize}
                color={
                  mainTabIndex === 3 ? theme.colors.outline : theme.colors.text
                }
              />
            </MCButton>
            <MCButton
              rippleCentered
              rippleSize={dySize(100)}
              align="center"
              onPress={() => this.onClickTab(4)}
              style={{flex: 1}}>
              {setCrown ? (
                <UserCrownSvg
                  size={TabIconSize}
                  color={
                    mainTabIndex === 4
                      ? theme.colors.outline
                      : theme.colors.text
                  }
                />
              ) : (
                <UserLightSvg
                  size={TabIconSize}
                  color={
                    mainTabIndex === 4
                      ? theme.colors.outline
                      : theme.colors.text
                  }
                />
              )}
            </MCButton>
          </MCView>
        </NativeCard>
      </TabWrapper>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  profile: state.profileReducer,
  userToken: state.profileReducer.userToken,
  mainTabIndex: state.routerReducer.mainTabIndex,
  setCrown: state.otherReducer.setCrown,
  hasMissedMessages: state.chatReducer.hasMissedMessages,
});

const mapDispatchToProps = {
  getMyProfile: profileActions.getMyProfile,
  getMyReflections: reflectionActions.getMyReflections,
  getUserReflections: reflectionActions.getUserReflections,
  getMyFeedbacks: feedbackActions.getMyFeedbacks,
  getUserCommits: otherActions.getUserCommits,
  changeProfileTab: otherActions.changeProfileTab,
  changeToolsTab: otherActions.changeToolsTab,
  showSocialDrawer: routerActions.setSocialDrawerOpened,
  showProfileDrawer: routerActions.setProfileDrawerOpened,
  showToolsDrawer: routerActions.setToolsDrawerOpened,
  setMainTabIndex: routerActions.setMainTabIndex,
  getUserChallenges: challengeActions.getUserChallenges,
  getOwnersWithResourcePermission:
    networkActions.getOwnersWithResourcePermission,
  setSearchOwnersWithResourcePermissionIndex:
    networkActions.setSearchOwnersWithResourcePermissionIndex,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(TabView),
);
