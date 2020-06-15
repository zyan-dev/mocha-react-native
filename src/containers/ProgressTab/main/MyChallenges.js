import React from 'react';
import {Alert, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import {challengeActions, postActions} from 'Redux/actions';
import {
  MCRootView,
  NativeCard,
  MCView,
  DividerLine,
  MCContent,
} from 'components/styled/View';
import {MCImage} from 'components/common';
import {H1, H3, H4, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import {combineChallenges, getChallengeIcon, getDayOf} from 'services/operators';
import ChallengeItem from './components/ChallengeItem';
import NavigationService from 'navigation/NavigationService';

class MyChallenges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressChallenge = item => {
    this.props.focusChallenge(item);
  };

  _onToggleCheckMeasure = (category, measure) => {
    const {
      focusedChallenge,
      updateFocusedChallenge,
      addOrUpdateChallenge,
      profile,
    } = this.props;
    const challenges = _.cloneDeep(focusedChallenge.challenges);
    const findIndex = challenges.findIndex(
      i => i.category === category && i.measure === measure,
    );
    let completedUsers = _.get(challenges[findIndex], ['completedUsers'], []);
    const userIndex = completedUsers.findIndex(i => i === profile._id);
    if (userIndex < 0) completedUsers.push(profile._id);
    else completedUsers.splice(userIndex, 1);
    challenges[findIndex].completedUsers = completedUsers;
    updateFocusedChallenge({challenges});
    setTimeout(() => {
      addOrUpdateChallenge('focused');
    });
  };

  onPressAddPost = () => {
    const {focusedChallenge} = this.props;
    this.props.setInitialPost(focusedChallenge._id);
    NavigationService.navigate('AddPost');
  };

  onPressAddChallenge = () => {
    this.props.onPressAdd();
  };

  onPressEditChallenge = () => {
    this.props.selectChallenge(this.props.focusedChallenge);
    setTimeout(() => {
      NavigationService.navigate('SelectChallenges');
    });
  };

  onPressRemoveChallenge = () => {
    const {t, focusedChallenge} = this.props;
    Alert.alert(
      t('alert_title_mocha'),
      t('alert_remove_challenge', {title: focusedChallenge.title}),
      [
        {
          text: t('button_cancel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: t('button_ok'),
          onPress: () => {
            this.props.removeChallenge(focusedChallenge._id);
          },
        },
      ],
      {cancelable: false},
    );
  };

  _renderChallengeItem = ({item}) => {
    const {t, theme, focusedChallenge} = this.props;
    if (!focusedChallenge) return null;
    const selected = focusedChallenge._id === item._id;
    return (
      <MCButton
        mr={20}
        pt={1}
        pb={1}
        pl={1}
        pr={1}
        br={10}
        onPress={() => this.onPressChallenge(item)}
        style={{
          borderWidth: 2,
          borderColor: selected ? theme.colors.outline : 'transparent',
        }}>
        <NativeCard width={250} justify="flex-start" pv={1}>
          <H3 weight="bold">{item.title}</H3>
          <MCView row>
            <MCView width={150} align="center">
              <MCView row wrap mb={10}>
                {combineChallenges(item.challenges)
                  .slice(0, 4)
                  .map(i => {
                    return getChallengeIcon(i.category, theme.colors.text);
                  })}
              </MCView>
              <DividerLine width={120} />
              <H4 mt={10}>
                {item.skills.length} {t('outline_skills')}
              </H4>
            </MCView>
            <MCView width={100} align="center">
              <H4>{t('label_days_left')}</H4>
              <H1 weight="bold">{item.duration - getDayOf(item.created)}</H1>
            </MCView>
          </MCView>
        </NativeCard>
      </MCButton>
    );
  };

  render() {
    const {t, profile, myChallenges, focusedChallenge} = this.props;
    return (
      <MCRootView justify="flex-start" background="transparent">
        <MCView height={150} justify="center">
          <FlatList
            horizontal
            style={{width: dySize(345)}}
            contentContainerStyle={{
              height: dySize(150),
              alignItems: 'center',
            }}
            data={myChallenges}
            renderItem={this._renderChallengeItem}
            keyExtractor={item => item._id}
            ListEmptyComponent={
              <MCView width={345} align="center">
                <MCButton
                  onPress={() => this.onPressAddChallenge()}
                  bordered
                  br={10}
                  pl={40}
                  pr={40}
                  pv={10}>
                  <MCEmptyText>{t('no_challenge')}</MCEmptyText>
                </MCButton>
              </MCView>
            }
            keyExtractor={item => item._id}
          />
        </MCView>
        <DividerLine width={335} />
        <MCContent
          contentContainerStyle={{alignItems: 'center', paddingBottom: 50}}>
          {focusedChallenge && (
            <>
              <MCView row mt={20} width={345}>
                <MCImage
                  image={{uri: focusedChallenge.ownerAvatar}}
                  type="avatar"
                  round
                  width={70}
                  height={70}
                />
                <MCView ml={10} style={{flex: 1}}>
                  <H4 weight="bold" underline>
                    {focusedChallenge.ownerName}
                  </H4>
                  <H4 numberOfLines={1}>{focusedChallenge.title}</H4>
                </MCView>
                {focusedChallenge.ownerId === profile._id && (
                  <>
                    <MCButton
                      onPress={() => this.onPressEditChallenge()}
                      pt={1}
                      pb={1}>
                      <MCIcon name="ios-create" padding={1} />
                    </MCButton>
                    <MCButton
                      onPress={() => this.onPressRemoveChallenge()}
                      pt={1}
                      pb={1}>
                      <MCIcon name="ios-trash" padding={1} />
                    </MCButton>
                  </>
                )}
              </MCView>
              <ChallengeItem
                item={focusedChallenge}
                onToggleCheckMeasure={this._onToggleCheckMeasure}
                onPressAddPost={() => this.onPressAddPost()}
              />
            </>
          )}
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  profile: state.profileReducer,
  myChallenges: state.challengeReducer.myChallenges,
  focusedChallenge: state.challengeReducer.focusedChallenge,
});

const mapDispatchToProps = {
  focusChallenge: challengeActions.focusChallenge,
  updateFocusedChallenge: challengeActions.updateFocusedChallenge,
  addOrUpdateChallenge: challengeActions.addOrUpdateChallenge,
  selectChallenge: challengeActions.selectChallenge,
  removeChallenge: challengeActions.removeChallenge,
  setInitialPost: postActions.setInitialPost,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MyChallenges),
);
