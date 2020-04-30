import React from 'react';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {Footer} from 'native-base';
import {MCView} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import {H4} from 'components/styled/Text';
import {UsersSvg, UserSvg, ToolsSvg, ResourceSvg} from 'assets/svgs';
import NavigationService from 'navigation/NavigationService';
import {
  profileActions,
  reflectionActions,
  userActions,
  feedbackActions,
  routerActions,
  otherActions,
} from 'Redux/actions';

const TabBarHeight = 80;
const TabIconBigSize = dySize(40);
const TabIconSmallSize = dySize(25);

const TabWrapper = styled(Footer)`
  height: ${TabBarHeight};
  border-top-width: 0px;
  background-color: ${props => props.theme.colors.background};
  border-top-width: 0px;
  elevation: 0;
`;

class TabView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 2,
    };
  }

  tabIndex = 2;
  lastTime = 0;

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  componentWillReceiveProps(props) {
    if (!this.mounted) return;
    const history = props.state.history;
    if (history.length > 0) {
      switch (history[0].key.split('-')[0]) {
        case 'TabFeed':
          this.setState({tabIndex: 0});
          console.log('Social Tab Pressed!');
          break;
        case 'TabResource':
          this.setState({tabIndex: 1});
          console.log('Add Tab Pressed!');
          break;
        case 'TabTools':
          this.setState({tabIndex: 2});
          console.log('Add Tab Pressed!');
          break;
        case 'TabProfile':
          this.setState({tabIndex: 3});
          console.log('Profile Tab Pressed!');
          break;
        default:
          break;
      }
    }
  }

  onClickTab = index => {
    const {
      userToken,
      getAllUsers,
      getAllTrustMembers,
      getMyProfile,
      getMyReflections,
      getMyFeedbacks,
      showProfileDrawer,
      showSocialDrawer,
    } = this.props;
    const TabScreens = ['TabFeed', 'TabResource', 'TabTools', 'TabProfile'];
    const TabHomeScreens = [
      {name: userToken.length > 0 ? 'Feed' : 'Auth_SendSMS'},
      {name: 'ResourceSearch'},
      {name: 'ToolsTabHome'},
      {name: 'Profile'},
    ];

    this.setState({tabIndex: index});

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
        showProfileDrawer(false);
        break;
      default:
        break;
    }
  };

  render() {
    const {t, theme} = this.props;
    const {tabIndex} = this.state;
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
            <UsersSvg
              size={tabIndex === 0 ? TabIconBigSize : TabIconSmallSize}
              color={theme.colors.text}
            />
            <H4 weight={tabIndex === 0 ? 'bold' : 'regular'}>
              {t('footer_feed')}
            </H4>
          </MCButton>
          <MCButton
            rippleCentered
            rippleSize={dySize(100)}
            align="center"
            justify="center"
            onPress={() => this.onClickTab(1)}
            style={{flex: 1}}
            height={TabBarHeight}>
            <ResourceSvg
              size={tabIndex === 1 ? TabIconBigSize : TabIconSmallSize}
              color={theme.colors.text}
            />
            <H4 weight={tabIndex === 1 ? 'bold' : 'regular'}>
              {t('footer_resources')}
            </H4>
          </MCButton>
          <MCButton
            rippleCentered
            rippleSize={dySize(100)}
            align="center"
            justify="center"
            onPress={() => this.onClickTab(2)}
            style={{flex: 1}}
            height={TabBarHeight}>
            <ToolsSvg
              size={tabIndex === 2 ? TabIconBigSize : TabIconSmallSize}
              color={theme.colors.text}
            />
            <H4 weight={tabIndex === 2 ? 'bold' : 'regular'}>
              {t('footer_tools')}
            </H4>
          </MCButton>
          <MCButton
            rippleCentered
            rippleSize={dySize(100)}
            align="center"
            justify="center"
            onPress={() => this.onClickTab(3)}
            style={{flex: 1}}
            height={TabBarHeight}>
            <UserSvg
              size={tabIndex === 3 ? TabIconBigSize : TabIconSmallSize}
              color={theme.colors.text}
            />
            <H4 weight={tabIndex === 3 ? 'bold' : 'regular'}>
              {t('footer_profile')}
            </H4>
          </MCButton>
        </MCView>
      </TabWrapper>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  userToken: state.profileReducer.userToken,
});

const mapDispatchToProps = {
  getAllUsers: userActions.getAllUsers,
  getAllTrustMembers: userActions.getAllTrustMembers,
  getMyProfile: profileActions.getMyProfile,
  getMyReflections: reflectionActions.getMyReflections,
  getUserReflections: reflectionActions.getUserReflections,
  getMyFeedbacks: feedbackActions.getMyFeedbacks,
  changeProfileTab: otherActions.changeProfileTab,
  changeToolsTab: otherActions.changeToolsTab,
  showSocialDrawer: routerActions.setSocialDrawerOpened,
  showProfileDrawer: routerActions.setProfileDrawerOpened,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(TabView),
);
