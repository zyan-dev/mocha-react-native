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
const TabIconSize = 30;
const TabWrapper = styled(Footer)`
  height: ${TabBarHeight};
  background-color: ${props => props.theme.colors.background};
  border-top-width: 0px;
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
      {name: 'Resources'},
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
        <NativeCard>
          <MCView
            row
            width={375}
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
              justify="center"
              align="center"
              height={TabBarHeight}
              style={{flex: 1}}>
              <CommentsLightSvg
                theme={theme}
                size={TabIconSize}
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
                size={TabIconSize}
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
                size={TabIconSize}
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
                  size={TabIconSize}
                  color={
                    mainTabIndex === 3
                      ? theme.colors.outline
                      : theme.colors.text
                  }
                />
              ) : (
                <UserLightSvg
                  size={TabIconSize}
                  theme={theme}
                  color={
                    mainTabIndex === 3
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
