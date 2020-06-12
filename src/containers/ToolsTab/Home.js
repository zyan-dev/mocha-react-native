import React from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {otherActions, routerActions} from 'Redux/actions';
import i18next from 'i18next';
import {MCView, MCRootView, NativeCard} from 'components/styled/View';
import {H3, H4, MCEmptyText} from 'components/styled/Text';
import {MCHeader, MCSearchInput, MCIcon, MCModal} from 'components/common';
import {RulerLightSvg} from 'assets/svgs';
import {ToolsSideTabs} from 'utils/constants';
import {MCButton} from 'components/styled/Button';
import {OvalGreenImage, OvalYellowImage} from 'components/styled/Custom';
import NavigationService from 'navigation/NavigationService';
import {dySize} from 'utils/responsive';
import {getStringWithOutline} from 'services/operators';
import {EmotionWheelSvg} from '../../assets/svgs';

class AddReflectionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      showWelcomeModal: false,
    };
  }

  componentDidMount() {
    if (!this.props.visitedTools) {
      this.setState({showWelcomeModal: true});
      this.props.setFavoriteTools(this.ToolsMindCards);
    }
  }

  WelcomeToolsDescription = {
    title: i18next.t('welcome_tools_description', {
      bold: i18next.t('outline_profile_basic'),
    }),
    boldWordKeys: ['profile_basic'],
  };

  ToolsMindCards = [
    {
      key: 'profile_basic',
      title: i18next.t('outline_profile_basic'),
      duration: '15 - 30',
      iconType: 'FontAwesome5Pro-Light',
      icon: 'chess-pawn-alt',
      navigateTo: 'ProfileBasic',
    },
    {
      key: 'profile_advanced',
      title: i18next.t('outline_profile_advanced'),
      duration: '15 - 30',
      iconType: 'FontAwesome5Pro-Light',
      icon: 'chess-knight-alt',
      navigateTo: 'ProfileAdvance',
    },
    {
      key: 'profile_expert',
      title: i18next.t('outline_profile_expert'),
      duration: '15 - 30',
      iconType: 'FontAwesome5Pro-Light',
      icon: 'chess-queen-alt',
      navigateTo: 'ProfileExpert',
    },
    {
      key: 'mood_and_emotion',
      duration: '1',
      title: i18next.t('tools_card_title_mood_and_emotion', {
        bold1: i18next.t('outline_mood'),
        bold2: i18next.t('outline_emotions'),
      }),
      boldWordKeys: ['mood', 'emotions'],
      iconType: 'FontAwesome5',
      icon: 'tire',
      navigateTo: 'Emotions',
      registerRequired: false,
    },
  ];

  ToolsBodyCards = [
    {
      key: 'body1',
      title: i18next.t('tools_card_title_body1'),
      duration: '3',
      iconType: 'Ionicons',
      icon: 'ios-body',
    },
    {
      key: 'body2',
      title: i18next.t('tools_card_title_body2'),
      duration: '4',
      iconType: 'Ionicons',
      icon: 'ios-body',
    },
    {
      key: 'body3',
      title: i18next.t('tools_card_title_body3'),
      duration: '5',
      iconType: 'Ionicons',
      icon: 'ios-body',
    },
    {
      key: 'body4',
      title: i18next.t('tools_card_title_body4'),
      duration: '6',
      iconType: 'Ionicons',
      icon: 'ios-body',
    },
  ];

  ToolsSocialCards = [
    {
      key: 'manual',
      duration: '5 - 10',
      title: i18next.t('tools_card_title_manual', {
        bold: i18next.t('outline_manual'),
      }),
      boldWordKeys: ['manual'],
      iconType: 'Ionicon',
      icon: 'ios-cloud-upload',
      navigateTo: 'UserManuals',
      registerRequired: false,
    },
    {
      key: 'feedback',
      duration: '2 min',
      title: i18next.t('tools_card_title_request_feedback', {
        bold: i18next.t('outline_request_feedback'),
      }),
      boldWordKeys: ['request_feedback'],
      iconType: 'Ionicon',
      icon: 'ios-people',
      navigateTo: 'Feedbacks',
      registerRequired: true,
    },
    {
      key: 'habit',
      duration: '4 - 6',
      title: i18next.t('tools_card_title_goal', {
        bold: i18next.t('outline_goal'),
      }),
      boldWordKeys: ['goal'],
      iconType: 'FontAwesome5Pro-Regular',
      icon: 'apple-alt',
      navigateTo: 'Habits',
      registerRequired: true,
    },

    {
      key: 'personality',
      title: i18next.t('outline_personality'),
      boldWordKeys: ['personality'],
      duration: '15 - 30',
      iconType: 'FontAwesome5Pro-Light',
      icon: 'fingerprint',
      navigateTo: 'EditPersonality',
    },
    {
      key: 'need',
      duration: '2 - 4',
      title: i18next.t('tools_card_title_need', {
        bold: i18next.t('outline_needs'),
      }),
      boldWordKeys: ['needs'],
      iconType: 'FontAwesome5',
      icon: 'signal',
      navigateTo: 'Needs',
      registerRequired: false,
    },
    {
      key: 'tapToCount',
      duration: '< 1',
      title: i18next.t('tools_card_title_tap', {
        bold: i18next.t('outline_tap'),
      }),
      boldWordKeys: ['tap'],
      iconType: 'FontAwesome5',
      icon: 'flag',
      navigateTo: 'TapToCounts',
      registerRequired: true,
    },
  ];

  onPressCard = section => {
    NavigationService.navigate(section.navigateTo);
  };

  onToggleBookmark = (card, exist) => {
    const {addFavoriteTool, removeFavoriteTool} = this.props;
    if (exist) removeFavoriteTool(card);
    else addFavoriteTool(card);
    this.forceUpdate();
  };

  getCards = () => {
    const {t, favoriteTools, toolsTab} = this.props;
    const {searchText} = this.state;
    switch (toolsTab) {
      case 0:
        return favoriteTools;
        break;
      case 1:
        return this.ToolsBodyCards;
        break;
      case 2:
        return this.ToolsMindCards;
        break;
      case 3:
        return this.ToolsSocialCards;
        break;
      case 4:
        return this.ToolsBodyCards.concat(
          this.ToolsMindCards.concat(this.ToolsSocialCards),
        ).filter(
          card =>
            card.title &&
            card.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1,
        );
        break;
      default:
    }
  };

  onPressCard = card => {
    NavigationService.navigate(card.navigateTo);
  };

  onCloseWelcomeModal = () => {
    this.props.visitToolsTab();
    this.setState({showWelcomeModal: false});
  };

  showSideMenu = () => {
    this.props.setToolsDrawerOpened(true);
  };

  _renderCardItem = ({item}) => {
    const {t, theme, favoriteTools} = this.props;
    const card = item;
    const exist = favoriteTools && favoriteTools.find(i => i.key === card.key);

    return (
      <NativeCard width={155} mt={10} mb={10} mr={10} ml={10} br={10}>
        <MCButton
          width={160}
          align="center"
          pt={20}
          onPress={() => this.onPressCard(card)}>
          <MCView height={80} justify="center" align="center" ph={5}>
            {card.key === 'profile_basic' && (
              <>
                <H4 weight="bold">{t('outline_profile_basic')}</H4>
                <H4>{t('tools_tab_know_yourself')}</H4>
              </>
            )}
            {card.key === 'profile_advanced' && (
              <>
                <H4 weight="bold" align="center">
                  {t('outline_profile_advanced')}
                </H4>
                <H4>{t('tools_tab_know_yourself')}</H4>
              </>
            )}
            {card.key === 'profile_expert' && (
              <>
                <H4 weight="bold">{t('outline_profile_expert')}</H4>
                <H4>{t('tools_tab_know_yourself')}</H4>
              </>
            )}
            {card.key === 'mood_and_emotion' && (
              <>
                <H4 weight="bold">{t('outline_emotions')}</H4>
                <H4>{t('tools_tab_know_yourself')}</H4>
              </>
            )}
            {!this.ToolsMindCards.find(i => i.key === card.key) &&
              getStringWithOutline(card)}
          </MCView>
          <MCView height={80} justify="center" align="center">
            {card.key === 'mood_and_emotion' ? (
              <EmotionWheelSvg size={60} color={theme.colors.outline} />
            ) : (
              <MCIcon
                type={card.iconType}
                name={card.icon}
                size={60}
                color={theme.colors.outline}
              />
            )}
          </MCView>
          <MCView row align="center" mt={20}>
            <MCIcon type="FontAwesome" name="clock-o" />
            <H4>{`${card.duration} ${t('unit_min')}`}</H4>
          </MCView>
        </MCButton>
        <MCView
          width={30}
          height={30}
          row
          justify="flex-end"
          absolute
          style={{top: 0, right: 0}}>
          <MCButton onPress={() => this.onToggleBookmark(card, exist)}>
            <MCIcon
              padding={1}
              name={exist ? 'ios-star' : 'ios-star-outline'}
              color={exist ? theme.colors.like : theme.colors.text}
              size={15}
            />
          </MCButton>
        </MCView>
      </NativeCard>
    );
  };

  render() {
    const {searchText, showWelcomeModal} = this.state;
    const {t, theme, favoriteTools, toolsTab} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasBack={false}
          title={t('footer_tools')}
          rightIcon="bars"
          hasRight
          onPressRight={() => this.showSideMenu()}
        />
        <OvalGreenImage />
        <OvalYellowImage />
        <H3 align="center">
          {t(`tools_tab_side_${ToolsSideTabs[toolsTab].key}`)}
        </H3>
        <MCView row style={{flex: 1}} mt={10}>
          <MCView style={{width: dySize(375), alignItems: 'center'}}>
            {toolsTab === 4 && (
              <MCSearchInput
                width={320}
                text={searchText}
                onChange={text => this.setState({searchText: text})}
              />
            )}
            <FlatList
              data={this.getCards()}
              contentContainerStyle={{
                paddingBottom: dySize(200),
                paddingHorizontal: dySize(12.5),
              }}
              renderItem={this._renderCardItem}
              keyExtractor={item => item.key}
              numColumns={2}
              style={{width: dySize(375), flex: 1}}
              ListEmptyComponent={
                <MCEmptyText mt={30}>{t('no_result')}</MCEmptyText>
              }
              extraData={favoriteTools}
            />
          </MCView>
        </MCView>
        <MCModal
          hasCloseButton={false}
          isVisible={showWelcomeModal}
          onClose={() => this.setState({showModal: false})}>
          <MCView align="center" width={280} mt={20}>
            <H3 mb={10} underline>
              {t('welcome_tools_title')}
            </H3>
            <RulerLightSvg size={30} color={theme.colors.text} />
            <H4 mt={20} pv={1}>
              {t('welcome_tools_take_a_look')}
            </H4>
            {getStringWithOutline(this.WelcomeToolsDescription)}
            <MCButton
              bordered
              mt={20}
              width={80}
              align="center"
              onPress={() => this.onCloseWelcomeModal()}>
              <H3>{t('button_ok')}</H3>
            </MCButton>
          </MCView>
        </MCModal>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  profile: state.profileReducer,
  favoriteTools: state.otherReducer.favoriteTools,
  toolsTab: state.otherReducer.toolsTab,
  visitedTools: state.routerReducer.visitedTools,
});

const mapDispatchToProps = {
  addFavoriteTool: otherActions.addFavoriteTool,
  setFavoriteTools: otherActions.setFavoriteTools,
  removeFavoriteTool: otherActions.removeFavoriteTool,
  visitToolsTab: routerActions.visitToolsTab,
  setToolsDrawerOpened: routerActions.setToolsDrawerOpened,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AddReflectionScreen),
);
