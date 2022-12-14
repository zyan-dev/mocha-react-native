import React from 'react';
import {Dimensions, View} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {TabBar, TabView, SceneMap} from 'react-native-tab-view';
import {MCHeader, MCIcon} from 'components/common';
import {MCRootView} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {H3} from 'components/styled/Text';
import {postActions, challengeActions} from 'Redux/actions';
import {getTodayStartDateStamp} from 'services/operators';
import MyChallengesScreen from './MyChallenges';
import ProgressMembersTab from './Members';
import AddChallengeScreen from './AddChallenge';
import NavigationService from 'navigation/NavigationService';
import {OvalGreenImage, OvalYellowImage} from 'components/styled/Custom';

class ProgressScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  componentWillMount() {
    const {resetMyChallenges} = this.props;
    // reset my challenges and set time for the next reset
    resetMyChallenges();
    const resetTimeIn =
      getTodayStartDateStamp() + 86400 * 1000 - new Date().getTime();
    setTimeout(() => {
      resetMyChallenges();
    }, resetTimeIn);
  }

  onChangeTabIndex = i => {
    const {profile} = this.props;
    this.setState({index: i});
    switch (i) {
      case 0:
        this.props.getUserChallenges(profile._id);
        break;
      case 1:
        this.props.getPostTrustMembers({page: 1});
        this.props.getPostsById({id: profile._id, page: 1});
        break;
      case 2:
        break;
      default:
    }
  };

  render() {
    const {t, theme, profile} = this.props;
    const {index} = this.state;
    const routes = [
      {
        key: 'challenge',
        title: 'user',
        iconSize: 20,
      },
      {
        key: 'progress',
        title: 'arrow-circle-up',
        iconSize: 25,
      },
      {
        key: 'add_challenge',
        title: 'mountain',
        iconSize: 20,
      },
    ];
    const renderTabBar = props => (
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: theme.colors.outline}}
        style={{
          backgroundColor: 'transparent',
          borderBottomWidth: 0,
          elevation: 0,
        }}
        renderLabel={({route, focused, color}) => {
          return (
            <MCIcon
              type="FontAwesome5Pro"
              name={route.title}
              size={route.iconSize}
              color={focused ? theme.colors.outline : theme.colors.text}
            />
          );
        }}
      />
    );

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

    return (
      <View style={{flex: 1, backgroundColor: theme.colors.background}}>
        <OvalGreenImage />
        <OvalYellowImage />
        <MCHeader
          title={t(`title_progress_tab_${routes[index].key}`)}
          hasBack={false}
        />
        <TabView
          navigationState={{index, routes}}
          renderScene={SceneMap({
            challenge: () => (
              <MyChallengesScreen
                onPressAdd={() => this.setState({index: 2})}
              />
            ),
            progress: ProgressMembersTab,
            add_challenge: AddChallengeScreen,
          })}
          onIndexChange={i => this.onChangeTabIndex(i)}
          initialLayout={Dimensions.get('window')}
          renderTabBar={renderTabBar}
          swipeEnabled={false}
        />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  profile: state.profileReducer,
});
const mapDispatchToProps = {
  getPostsById: postActions.getPostsById,
  getPosts: postActions.getPosts,
  getPostTrustMembers: postActions.getPostTrustMembers,
  getUserChallenges: challengeActions.getUserChallenges,
  resetMyChallenges: challengeActions.resetMyChallenges,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProgressScreen),
);
