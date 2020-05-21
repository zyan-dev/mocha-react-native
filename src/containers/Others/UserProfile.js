import React from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {profileActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {H2, H4, H5} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {MCHeader, MCImage, MCModal, MCIcon} from 'components/common';
import {selector} from 'Redux/selectors';
import OverviewCard from '../ProfileTab/profile/components/Overview';
import ContactCard from '../ProfileTab/profile/components/Contact';
import ValuesCard from '../ProfileTab/profile/components/Values';
import PurposesCard from '../ProfileTab/profile/components/Purposes';
import MotivationCard from '../ProfileTab/profile/components/Motivations';
import LanguagesCard from '../ProfileTab/profile/components/Languages';
import SkillsCard from '../ProfileTab/profile/components/Skills';
import UserManualsCard from '../ProfileTab/profile/components/UserManuals';
import HabitCard from '../ProfileTab/profile/components/habits';
import DreamCard from '../ProfileTab/profile/components/Dream';
import CoreValuesCard from '../ProfileTab/profile/components/CoreValues';
import ChronotypeCard from '../ProfileTab/profile/components/Chronotype';
import PersonalityCard from '../ProfileTab/profile/components/Personality';
import StressCard from '../ProfileTab/profile/components/Stress';
import RiskToleranceCard from '../ProfileTab/profile/components/RiskTolerance';
import FeedbacksCard from '../ProfileTab/profile/components/Feedbacks';
import QuirksCard from '../ProfileTab/profile/components/Quirks';
import TriggersCard from '../ProfileTab/profile/components/Triggers';
import AttachmentCard from '../ProfileTab/profile/components/Attachment';
import ApproachCard from '../ProfileTab/profile/components/Approach';
import ComfortCard from '../ProfileTab/profile/components/Comfort';
import MeaningLifeCard from '../ProfileTab/profile/components/MeaningLife';
import CoachingFeedbackCard from '../ProfileTab/profile/components/FeedbackCoaching';
import CriticismFeedbackCard from '../ProfileTab/profile/components/FeedbackCriticism';
import PraiseFeedbackCard from '../ProfileTab/profile/components/FeedbackPraise';
import QualitiesBehaviorCard from '../ProfileTab/profile/components/BehaviorQualities';
import ChallengesBehaviorCard from '../ProfileTab/profile/components/BehaviorChallenges';
import NutritionCard from '../ProfileTab/profile/components/Nutrition';
import HydrationCard from '../ProfileTab/profile/components/Hydration';
import NavigationService from 'navigation/NavigationService';
import {profileIcons} from 'utils/constants';
import {dySize} from 'utils/responsive';
import {FaucetWhiteSvg, FutureSvg, SkullCowSvg} from 'assets/svgs';

const opacityArray = [1, 0.5, 0.2];

class UserProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'overview',
      showAvatarModal: false,
      viewableItems: [],
      focusedIndex: 0,
    };
  }

  viewabilityConfig = {
    waitForInteraction: false,
    itemVisiblePercentThreshold: 20,
  };

  componentDidMount() {
    const {id} = this.props.route.params;
    this.props.getUserProfile(id, true);
  }

  onPressProfileIcon = (icon, index) => {
    this.setState({selected: icon.key});
    this.setState({focusedIndex: index});
    this.contentScroll &&
      this.contentScroll.scrollToIndex({animated: false, index});
  };

  onPressAllHabits = tabIndex => {
    NavigationService.navigate('UserHabit', {
      id: this.props.profile._id,
      tabIndex,
    });
  };

  onPressHeaderAvatar = () => {
    this.setState({showAvatarModal: true});
  };

  onViewableItemsChanged = ({viewableItems, changed}) => {
    if (viewableItems.length === 0) return;
    const findIndex = profileIcons.findIndex(
      i => i.key === viewableItems[0].key,
    );
    this.setState(
      {
        viewableItems,
        focusedIndex: findIndex,
        selected: profileIcons[findIndex].key,
      },
      () => {
        this.iconScroll &&
          this.iconScroll.scrollToIndex({
            animated: true,
            index: findIndex,
            viewPosition: 0.5,
          });
      },
    );
  };

  _renderProfileSections = ({item}) => {
    const {
      theme,
      profile,
      chronotype,
      nutrition,
      hydration,
      stress,
      stressRecovery,
      strength,
      coreValues,
      valueStory,
      dream,
      dailyHabits,
      weeklyHabits,
      values,
      feedbacks,
      motivations,
      manuals,
      personality,
      coaching,
      criticism,
      praise,
      qualities,
      challenges,
      approach,
      attachment,
      comfort,
      meaning,
      commits,
    } = this.props;
    const key = item.key;
    if (item.disabled) return null;
    if (key === 'overview')
      return <OverviewCard profile={profile} editable={false} />;
    if (key === 'contact')
      return <ContactCard profile={profile} editable={false} />;
    if (key === 'chronotype')
      return (
        <ChronotypeCard
          theme={theme}
          chronotype={chronotype}
          editable={false}
        />
      );
    if (key === 'nutrition')
      return <NutritionCard editable={false} nutrition={nutrition} />;
    if (key === 'hydration')
      return (
        <HydrationCard theme={theme} editable={false} hydration={hydration} />
      );
    if (key === 'stress_recovery')
      return (
        <StressCard
          theme={theme}
          stress={stress}
          stressRecovery={stressRecovery}
          editable={false}
        />
      );
    if (key === 'strengths')
      return <SkillsCard strength={strength} editable={false} />;
    if (key === 'core_values')
      return (
        <CoreValuesCard
          theme={theme}
          coreValues={coreValues}
          valueStory={valueStory}
          editable={false}
        />
      );
    if (key === 'dreams') return <DreamCard dream={dream} editable={false} />;
    if (key === 'habits')
      return (
        <HabitCard
          commits={commits}
          editable={false}
          dailyHabits={dailyHabits}
          weeklyHabits={weeklyHabits}
          theme={theme}
        />
      );
    if (key === 'coaching_feedback')
      return (
        <CoachingFeedbackCard
          coaching={coaching}
          theme={theme}
          editable={false}
        />
      );
    if (key === 'criticism_feedback')
      return (
        <CriticismFeedbackCard
          criticism={criticism}
          theme={theme}
          editable={false}
        />
      );
    if (key === 'praise_feedback')
      return (
        <PraiseFeedbackCard praise={praise} theme={theme} editable={false} />
      );
    if (key === 'qualities_character')
      return (
        <QualitiesBehaviorCard
          qualities={qualities}
          theme={theme}
          editable={false}
        />
      );
    if (key === 'challenges_concerns')
      return (
        <ChallengesBehaviorCard challenges={challenges} editable={false} />
      );
    if (key === 'approach_to_conflict')
      return <ApproachCard approach={approach} editable={false} />;
    if (key === 'attachment_pattern')
      return <AttachmentCard attachment={attachment} editable={false} />;
    if (key === 'comfort')
      return <ComfortCard comfort={comfort} theme={theme} editable={false} />;
    if (key === 'meaning_life')
      return (
        <MeaningLifeCard meaning={meaning} theme={theme} editable={false} />
      );
    if (key === 'personality')
      return <PersonalityCard personality={personality} editable={false} />;
    if (key === 'values')
      return <ValuesCard values={values} editable={false} />;
    if (key === 'feedbacks')
      return <FeedbacksCard feedbacks={feedbacks} editable={false} />;
    if (key === 'purposes') return <PurposesCard editable={false} />;
    if (key === 'motivations')
      return <MotivationCard motivations={motivations} editable={false} />;
    if (key === 'languages') return <LanguagesCard editable={false} />;
    if (key === 'beliefs')
      return <UserManualsCard manuals={manuals} editable={false} />;
    if (key === 'risks') return <RiskToleranceCard editable={false} />;
    if (key === 'quirks') return <QuirksCard editable={false} />;
    if (key === 'triggers') return <TriggersCard editable={false} />;
  };

  renderProfileIcon = ({item, index}) => {
    const {viewableItems, focusedIndex} = this.state;
    const {theme} = this.props;
    const layout = item;
    const selected =
      viewableItems.length && viewableItems[0].key === layout.key;
    const size = selected ? 30 : 20;
    const color = selected ? theme.colors.outline : theme.colors.text;
    return (
      <MCButton
        key={layout.key}
        width={50}
        height={50}
        align="center"
        justify="center"
        onPress={() => this.onPressProfileIcon(layout, index)}
        style={{opacity: opacityArray[Math.abs(focusedIndex - index) % 3]}}>
        {layout.key === 'hydration' ? (
          <FaucetWhiteSvg size={size} color={color} />
        ) : layout.key === 'dreams' ? (
          <FutureSvg size={size} color={color} />
        ) : layout.key === 'meaning_life' ? (
          <SkullCowSvg size={size} color={color} />
        ) : (
          <MCIcon
            type={layout.iconType}
            name={layout.icon}
            size={size}
            color={color}
          />
        )}
      </MCButton>
    );
  };

  render() {
    const {selected, showAvatarModal, focusedIndex} = this.state;
    const {t, theme, profile} = this.props;
    if (profile.message) {
      return (
        <MCRootView justify="flex-start">
          <MCHeader title={t('other_profile_page_headerText')} />
          <MCView
            align="center"
            justify="center"
            style={{flex: 1, paddingBottom: dySize(100)}}>
            <H4>{t(profile.message)}</H4>
          </MCView>
        </MCRootView>
      );
    }
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          title={profile.name}
          hasRight={selected !== 'overview'}
          rightImage={
            <MCImage
              image={{uri: profile.avatar}}
              round
              width={40}
              height={40}
            />
          }
          onPressRight={() => this.onPressHeaderAvatar()}
        />
        <MCView row style={{flex: 1}}>
          <MCView width={325}>
            <FlatList
              ref={ref => (this.contentScroll = ref)}
              data={profileIcons}
              renderItem={this._renderProfileSections}
              keyExtractor={item => item.key}
              contentContainerStyle={{
                width: dySize(325),
                paddingHorizontal: 10,
                paddingBottom: 200,
              }}
              viewabilityConfig={this.viewabilityConfig}
              onViewableItemsChanged={this.onViewableItemsChanged}
              onScrollToIndexFailed={info => {
                this.contentScroll.scrollToIndex({
                  animated: false,
                  index: info.highestMeasuredFrameIndex,
                });
                setTimeout(() => {
                  this.contentScroll.scrollToIndex({
                    animated: false,
                    index: focusedIndex,
                  });
                }, 1000);
              }}
            />
          </MCView>
          <MCView
            width={55}
            justify="center"
            row
            align="center"
            style={{height: '100%'}}>
            <MCView height={250}>
              <FlatList
                ref={ref => (this.iconScroll = ref)}
                data={profileIcons}
                renderItem={this.renderProfileIcon}
                keyExtractor={item => item.key}
                contentContainerStyle={{
                  width: dySize(55),
                  alignItems: 'center',
                  paddingVertical: dySize(100),
                }}
              />
            </MCView>
          </MCView>
        </MCView>
        <MCModal
          isVisible={showAvatarModal}
          onClose={() => this.setState({showAvatarModal: false})}>
          <MCView align="center" width={280} mt={20}>
            <MCImage
              image={{uri: profile.avatar}}
              round
              width={200}
              height={200}
            />
            <H4>{profile.name}</H4>
            <H5 color={theme.colors.border}>{`@${profile.user_id}`}</H5>
          </MCView>
        </MCModal>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  profile: state.usersReducer.userProfile,
  chronotype: selector.reflections.findUserSpecialReflections(
    state,
    'Chronotype',
  ),
  nutrition: selector.reflections.findUserSpecialReflections(
    state,
    'Nutrition',
  ),
  hydration: selector.reflections.findUserSpecialReflections(
    state,
    'Hydration',
  ),
  stress: selector.reflections.findUserSpecialReflections(
    state,
    'StressResponse',
  ),
  stressRecovery: selector.reflections.findUserSpecialReflections(
    state,
    'StressRecovery',
  ),
  strength: selector.reflections.findUserSpecialReflections(state, 'Strengths'),
  coreValues: selector.reflections.findUserSpecialReflections(
    state,
    'CoreValues',
  ),
  valueStory: selector.reflections.findUserSpecialReflections(
    state,
    'ValueStory',
  ),
  dream: selector.reflections.findUserSpecialReflections(state, 'Dreams'),
  dailyHabits: selector.reflections
    .getUserSpecialReflections(state, 'Habit')
    .filter(({data}) => data.isDaily),
  weeklyHabits: selector.reflections
    .getUserSpecialReflections(state, 'Habit')
    .filter(({data}) => !data.isDaily),
  goals: selector.reflections.getUserSpecialReflections(state, 'Goal'),
  manuals: selector.reflections.getUserSpecialReflections(state, 'Manual'),
  values: selector.reflections.getUserSpecialReflections(state, 'Value'),
  feedbacks: selector.feedbacks.getUserFeedbacks(state).received,
  motivations: selector.reflections.getUserSpecialReflections(
    state,
    'Motivation',
  ),
  personality: selector.reflections.findUserSpecialReflections(
    state,
    'Personality',
  ),
  coaching: selector.reflections.findUserSpecialReflections(
    state,
    'CoachingFeedback',
  ),
  criticism: selector.reflections.findUserSpecialReflections(
    state,
    'CriticismFeedback',
  ),
  praise: selector.reflections.findUserSpecialReflections(
    state,
    'PraiseFeedback',
  ),
  qualities: selector.reflections.findUserSpecialReflections(
    state,
    'Qualities',
  ),
  challenges: selector.reflections.findUserSpecialReflections(
    state,
    'Challenges',
  ),
  approach: selector.reflections.findUserSpecialReflections(state, 'Approach'),
  attachment: selector.reflections.findUserSpecialReflections(
    state,
    'Attachment',
  ),
  comfort: selector.reflections.findUserSpecialReflections(state, 'Comfort'),
  meaning: selector.reflections.findUserSpecialReflections(
    state,
    'MeaningLife',
  ),
  commits: state.otherReducer.commits,
});

const mapDispatchToProps = {
  getUserProfile: profileActions.getUserProfile,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(UserProfileScreen),
);
