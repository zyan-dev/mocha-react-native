import React from 'react';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Footer} from 'native-base';
import {MCView} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import {H4} from 'components/styled/Text';
import {
  BookLightSvg,
  CommentsLightSvg,
  RulerLightSvg,
  UserLightSvg,
  UserCrownSvg,
} from 'assets/svgs';
import NavigationService from 'navigation/NavigationService';
import {
  profileActions,
  reflectionActions,
  userActions,
  feedbackActions,
  routerActions,
  otherActions,
} from 'Redux/actions';
import {NativeCard} from '../../components/styled/View';

const TabBarHeight = 80;
const TabIconBigSize = dySize(45);
const TabIconSmallSize = dySize(35);

const TabWrapper = styled(Footer)`
  height: ${TabBarHeight + 100};
  border-top-width: 0px;
  background-color: ${props => props.theme.colors.background};
  border-top-width: 0px;
  elevation: 11;
  shadow-color: black;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.2;
  shadow-radius: 10;
  margin-bottom: -100px;
`;

class TabView extends React.PureComponent {
  tabIndex = 2;
  lastTime = 0;

  componentWillMount() {
    this.props.setMainTabIndex(2);
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onClickTab = index => {
    const {
      profile,
      userToken,
      getAllUsers,
      getAllTrustMembers,
      getMyProfile,
      getMyReflections,
      getMyFeedbacks,
      showProfileDrawer,
      showSocialDrawer,
      getUserCommits,
    } = this.props;
    const TabScreens = ['TabFeed', 'TabResource', 'TabTools', 'TabProfile'];
    const TabHomeScreens = [
      {name: userToken.length > 0 ? 'Feed' : 'Auth_SendSMS'},
      {name: 'ResourceSearch'},
      {name: 'ToolsTabHome'},
      {name: 'Profile'},
    ];

    this.props.setMainTabIndex(index);

    // detect double clicking
    if (this.tabIndex === index && new Date().getTime() - this.lastTime < 800) {
      // double clicked
      NavigationService.navigate(TabHomeScreens[index].name);
      if (index === 2) this.props.changeToolsTab(0);
      else if (index === 3) this.props.changeProfileTab('overview');
    } else {
      // one time clicked
      NavigationService.navigate(TabScreens[index]);
    }

    // set values to detect the next double click
    this.tabIndex = index;
    this.lastTime = new Date().getTime();

    // call APIs
    switch (index) {
      case 0:
        // user clicked Social Tab
        userToken.length > 0 && getAllUsers();
        userToken.length > 0 && getAllTrustMembers();
        showSocialDrawer(false);
        break;
      case 1:
        // user clicked Add Tab
        break;
      case 2:
        // user clicked Tools Tab
        userToken.length > 0 && getMyReflections();
        break;
      case 3:
        // user clicked Profile Tab
        userToken.length > 0 && getMyProfile();
        userToken.length > 0 && getMyReflections();
        userToken.length > 0 && getMyFeedbacks();
        userToken.length > 0 && getUserCommits(profile._id);
        showProfileDrawer(false);
        break;
      default:
        break;
    }
  };

  render() {
    const {t, theme, mainTabIndex, setCrown} = this.props;

    return (
      <TabWrapper>
        <MCView
          row
          width={375}
          style={{backgroundColor: theme.colors.background}}>
          <MCButton
            rippleCentered
            rippleSize={dySize(100)}
            onPress={() => this.onClickTab(0)}
            justify="center"
            align="center"
            height={TabBarHeight}
            style={{flex: 1}}>
            <CommentsLightSvg
              theme={theme}
              size={mainTabIndex === 0 ? TabIconBigSize : TabIconSmallSize}
              color={
                mainTabIndex === 0 ? theme.colors.outline : theme.colors.text
              }
            />
            {/* <H4 weight={mainTabIndex === 0 ? 'bold' : 'regular'}>
              {t('footer_feed')}
            </H4> */}
          </MCButton>
          <MCButton
            rippleCentered
            rippleSize={dySize(100)}
            align="center"
            justify="center"
            onPress={() => this.onClickTab(1)}
            style={{flex: 1}}
            height={TabBarHeight}>
            <BookLightSvg
              size={mainTabIndex === 1 ? TabIconBigSize : TabIconSmallSize}
              theme={theme}
              color={
                mainTabIndex === 1 ? theme.colors.outline : theme.colors.text
              }
            />
            {/* <H4 weight={mainTabIndex === 1 ? 'bold' : 'regular'}>
              {t('footer_resources')}
            </H4> */}
          </MCButton>
          <MCButton
            rippleCentered
            rippleSize={dySize(100)}
            align="center"
            justify="center"
            onPress={() => this.onClickTab(2)}
            style={{flex: 1}}
            height={TabBarHeight}>
            <RulerLightSvg
              size={mainTabIndex === 2 ? TabIconBigSize : TabIconSmallSize}
              color={
                mainTabIndex === 2 ? theme.colors.outline : theme.colors.text
              }
            />
            {/* <H4 weight={mainTabIndex === 2 ? 'bold' : 'regular'}>
              {t('footer_tools')}
            </H4> */}
          </MCButton>
          <MCButton
            rippleCentered
            rippleSize={dySize(100)}
            align="center"
            justify="center"
            onPress={() => this.onClickTab(3)}
            style={{flex: 1}}
            height={TabBarHeight}>
            {setCrown ? (
              <UserCrownSvg
                size={mainTabIndex === 3 ? TabIconBigSize : TabIconSmallSize}
                color={
                  mainTabIndex === 3 ? theme.colors.outline : theme.colors.text
                }
              />
            ) : (
              <UserLightSvg
                size={mainTabIndex === 3 ? TabIconBigSize : TabIconSmallSize}
                theme={theme}
                color={
                  mainTabIndex === 3 ? theme.colors.outline : theme.colors.text
                }
              />
            )}
            {/* <H4 weight={mainTabIndex === 3 ? 'bold' : 'regular'}>
              {t('footer_profile')}
            </H4> */}
          </MCButton>
        </MCView>
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
});

const mapDispatchToProps = {
  getAllUsers: userActions.getAllUsers,
  getAllTrustMembers: userActions.getAllTrustMembers,
  getMyProfile: profileActions.getMyProfile,
  getMyReflections: reflectionActions.getMyReflections,
  getUserReflections: reflectionActions.getUserReflections,
  getMyFeedbacks: feedbackActions.getMyFeedbacks,
  getUserCommits: otherActions.getUserCommits,
  changeProfileTab: otherActions.changeProfileTab,
  changeToolsTab: otherActions.changeToolsTab,
  showSocialDrawer: routerActions.setSocialDrawerOpened,
  showProfileDrawer: routerActions.setProfileDrawerOpened,
  setMainTabIndex: routerActions.setMainTabIndex,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(TabView),
);
