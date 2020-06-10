import React from 'react';
import {FlatList} from 'react-native';
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
import {MCIcon, MCImage} from 'components/common';
import {H1, H2, H3, H4, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {dySize} from 'utils/responsive';
import {ChallengeIconData} from 'utils/constants';
import {combineChallenges} from 'services/operators';
import ChallengeItem from './components/ChallengeItem';
import NavigationService from 'navigation/NavigationService';

class MyChallenges extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPressChallenge = item => {
    this.props.selectChallenge(item);
  };

  _onToggleCheckMeasure = (category, measure) => {
    const {
      selectedChallenge,
      updateSelectedChallenge,
      addOrUpdateChallenge,
      profile,
    } = this.props;
    const challenges = _.cloneDeep(selectedChallenge.challenges);
    const findIndex = challenges.findIndex(
      i => i.category === category && i.measure === measure,
    );
    let completedUsers = _.get(challenges[findIndex], ['completedUsers'], []);
    const userIndex = completedUsers.findIndex(i => i === profile._id);
    if (userIndex < 0) completedUsers.push(profile._id);
    else completedUsers.splice(userIndex, 1);
    challenges[findIndex].completedUsers = completedUsers;
    updateSelectedChallenge({challenges});
    setTimeout(() => {
      addOrUpdateChallenge();
    });
  };

  onPressAddPost = () => {
    const {selectedChallenge} = this.props;
    this.props.setInitialPost(selectedChallenge._id);
    NavigationService.navigate('AddPost');
  };

  onPressAddChallenge = () => {
    this.props.onPressAdd();
  };

  _renderChallengeItem = ({item}) => {
    const {t, theme, selectedChallenge} = this.props;
    if (!selectedChallenge) return null;
    const selected = selectedChallenge._id === item._id;
    return (
      <MCButton
        mr={20}
        mt={20}
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
        <NativeCard width={200} justify="flex-start">
          <H3 weight="bold">{item.title}</H3>
          <MCView row>
            <MCView width={130} align="center">
              <MCView row wrap mb={10}>
                {combineChallenges(item.challenges)
                  .slice(0, 4)
                  .map(i => {
                    return (
                      <MCIcon
                        type="FontAwesome5Pro-Light"
                        name={
                          i.category.indexOf('custom_') < 0
                            ? ChallengeIconData[i.category]
                            : 'mountain'
                        }
                      />
                    );
                  })}
              </MCView>
              <DividerLine width={100} />
              <H3 mt={10}>
                {item.skills.length} {t('outline_skills')}
              </H3>
            </MCView>
            <MCView width={70} align="center">
              <H4>{t('label_days_left')}</H4>
              <H1 weight="bold">{item.duration}</H1>
            </MCView>
          </MCView>
        </NativeCard>
      </MCButton>
    );
  };

  render() {
    const {t, myChallenges, selectedChallenge} = this.props;
    return (
      <MCRootView justify="flex-start" background="transparent">
        <MCView height={170} justify="center">
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
          <MCView row mt={20} width={345}>
            <MCImage
              image={{uri: selectedChallenge.ownerAvatar}}
              type="avatar"
              round
              width={70}
              height={70}
            />
            <MCView ml={10} style={{flex: 1}}>
              <H3 weight="bold" underline>
                {selectedChallenge.ownerName}
              </H3>
              <H2 numberOfLines={1}>{selectedChallenge.title}</H2>
            </MCView>
          </MCView>
          <ChallengeItem
            item={selectedChallenge}
            onToggleCheckMeasure={this._onToggleCheckMeasure}
            onPressAddPost={() => this.onPressAddPost()}
          />
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  profile: state.profileReducer,
  myChallenges: state.challengeReducer.myChallenges,
  selectedChallenge: state.challengeReducer.selectedChallenge,
});

const mapDispatchToProps = {
  selectChallenge: challengeActions.selectChallenge,
  updateSelectedChallenge: challengeActions.updateSelectedChallenge,
  addOrUpdateChallenge: challengeActions.addOrUpdateChallenge,
  setInitialPost: postActions.setInitialPost,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MyChallenges),
);
