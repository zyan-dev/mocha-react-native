import React from 'react';
import {Dimensions, View} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {TabBar, TabView, SceneMap} from 'react-native-tab-view';
import {MCHeader, MCIcon} from 'components/common';
import {MCRootView} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {H3} from 'components/styled/Text';
import {postActions, userActions} from 'Redux/actions';
import ProgressChallengeTab from './MyChallenges';
import ProgressMembersTab from './Members';
import AddChallengeScreen from './AddChallenge';
import NavigationService from 'navigation/NavigationService';
import {OvalYellow, OvalGreen} from 'assets/images';
import {OvalGreenImage, OvalYellowImage} from 'components/styled/Custom';

class ProgressScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
    };
  }

  onPressAddPost = () => {
    this.props.setInitialPost();
    NavigationService.navigate('AddPost');
  };

  onChangeTabIndex = i => {
    const {profile} = this.props;
    this.setState({index: i});
    switch (i) {
      case 0:
        break;
      case 1:
        this.props.getTrustMembers({
          status: 1,
          name: '',
          page: 1,
        });
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
      },
      {
        key: 'progress',
        title: 'users',
      },
      {
        key: 'add_challenge',
        title: 'mountain',
      },
    ];
    const renderTabBar = props => (
      <TabBar
        {...props}
        indicatorStyle={{backgroundColor: theme.colors.text}}
        style={{
          backgroundColor: 'transparent',
          borderBottomWidth: 0,
        }}
        renderLabel={({route, focused, color}) => {
          return (
            <MCIcon
              type="FontAwesome5Pro"
              name={route.title}
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
        <OvalGreenImage source={OvalGreen} resizeMode="stretch" />
        <OvalYellowImage source={OvalYellow} resizeMode="stretch" />
        <MCHeader
          title={t(`title_progress_tab_${routes[index].key}`)}
          hasBack={false}
          hasRight
          rightIcon="plus"
          onPressRight={() => this.onPressAddPost()}
        />
        <TabView
          navigationState={{index, routes}}
          renderScene={SceneMap({
            challenge: ProgressChallengeTab,
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
  setInitialPost: postActions.setInitialPost,
  getPostsById: postActions.getPostsById,
  getPosts: postActions.getPosts,
  getTrustMembers: userActions.getTrustMembers,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProgressScreen),
);
