import React from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {otherActions} from 'Redux/actions';
import i18next from 'i18next';
import {MCView, MCRootView, MCContent} from 'components/styled/View';
import {H4, H5, MCIcon, MCEmptyText} from 'components/styled/Text';
import {MCHeader, MCSearchInput} from 'components/common';
import {ToolsSideTabs} from 'utils/constants';
import {ToolsSvg} from 'assets/svgs';
import {MCButton} from 'components/styled/Button';
import NavigationService from 'navigation/NavigationService';
import {dySize} from 'utils/responsive';

class AddReflectionScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      searchText: '',
    };
  }

  ToolsBodyCards = [
    {
      key: 'profile',
      title: i18next.t('tools_card_title_profile', {
        bold: i18next.t('tools_card_bold_profile_preview'),
      }),
      boldWordKeys: ['profile_preview'],
      duration: '15~30',
      iconType: 'Ionicon',
      icon: 'ios-body',
      navigateTo: 'KnowYourSelf',
    },
    {
      key: 'body1',
      title: i18next.t('tools_card_title_body1'),
      duration: '15~30',
      iconType: 'Ionicon',
      icon: 'ios-body',
    },
    {
      key: 'body2',
      title: i18next.t('tools_card_title_body2'),
      duration: '15~30',
      iconType: 'Ionicon',
      icon: 'ios-body',
    },
    {
      key: 'body3',
      title: i18next.t('tools_card_title_body3'),
      duration: '15~30',
      iconType: 'Ionicon',
      icon: 'ios-body',
    },
  ];

  ToolsMindCards = [
    {
      key: 'mind1',
      title: i18next.t('tools_card_title_mind1'),
      duration: '3',
      iconType: 'FontAwesome5',
      icon: 'brain',
    },
    {
      key: 'mind2',
      title: i18next.t('tools_card_title_mind2'),
      duration: '4',
      iconType: 'FontAwesome5',
      icon: 'brain',
    },
    {
      key: 'mind3',
      title: i18next.t('tools_card_title_mind3'),
      duration: '5',
      iconType: 'FontAwesome5',
      icon: 'brain',
    },
    {
      key: 'mind4',
      title: i18next.t('tools_card_title_mind4'),
      duration: '6',
      iconType: 'FontAwesome5',
      icon: 'brain',
    },
  ];

  ToolsSocialCards = [
    {
      key: 'manual',
      duration: '5-10',
      title: i18next.t('tools_card_title_manual', {
        bold: i18next.t('tools_card_bold_manual'),
      }),
      boldWordKeys: ['manual'],
      iconType: 'Ionicon',
      icon: 'ios-cloud-upload',
      navigateTo: 'UserManuals',
      registerRequired: false,
    },
    {
      key: 'value',
      duration: '5',
      title: i18next.t('tools_card_title_value', {
        bold: i18next.t('tools_card_bold_value'),
      }),
      boldWordKeys: ['value'],
      iconType: 'Ionicon',
      icon: 'ios-key',
      navigateTo: 'Values',
      registerRequired: false,
    },
    {
      key: 'feedback',
      duration: '2 min',
      title: i18next.t('tools_card_title_request_feedback', {
        bold: i18next.t('tools_card_bold_request_feedback'),
      }),
      boldWordKeys: ['request_feedback'],
      iconType: 'Ionicon',
      icon: 'ios-people',
      navigateTo: 'Feedbacks',
      registerRequired: true,
    },
    {
      key: 'goal',
      duration: '4-6',
      title: i18next.t('tools_card_title_goal', {
        bold: i18next.t('tools_card_bold_goal'),
      }),
      boldWordKeys: ['goal'],
      iconType: 'Ionicon',
      icon: 'ios-compass',
      navigateTo: 'Objectives',
      registerRequired: true,
    },
    {
      key: 'mood_and_emotion',
      duration: '2-4',
      title: i18next.t('tools_card_title_mood_and_emotion', {
        bold1: i18next.t('tools_card_bold_mood'),
        bold2: i18next.t('tools_card_bold_emotions'),
      }),
      boldWordKeys: ['mood', 'emotions'],
      iconType: 'FontAwesome5',
      icon: 'comment',
      navigateTo: 'Emotions',
      registerRequired: false,
    },
    {
      key: 'need',
      duration: '2-4',
      title: i18next.t('tools_card_title_need', {
        bold: i18next.t('tools_card_bold_needs'),
      }),
      boldWordKeys: ['needs'],
      iconType: 'FontAwesome5',
      icon: 'signal',
      navigateTo: 'Needs',
      registerRequired: false,
    },
    {
      key: 'tapToCount',
      duration: '<1',
      title: i18next.t('tools_card_title_tap', {
        bold: i18next.t('tools_card_bold_tap'),
      }),
      boldWordKeys: ['tap'],
      iconType: 'FontAwesome5',
      icon: 'flag',
      navigateTo: 'TapToCounts',
      registerRequired: true,
    },
  ];

  onPressTab = index => {
    this.setState({tabIndex: index});
  };

  onPressCard = section => {
    NavigationService.navigate(section.navigateTo);
  };

  onToggleBookmark = (card, exist) => {
    const {addFavoriteTool, removeFavoriteTool} = this.props;
    if (exist) removeFavoriteTool(card);
    else addFavoriteTool(card);
    this.forceUpdate();
  };

  renderCardTitle = card => {
    const {t} = this.props;
    let str = card.title;
    const snippets = [];
    let boldWord = '';
    let boldIndex = 0;
    if (!str) return;
    if (card.boldWordKeys) {
      card.boldWordKeys.map(key => {
        boldWord = t(`tools_card_bold_${key}`);
        boldIndex = str.indexOf(boldWord);
        if (boldIndex > 0) {
          snippets.push(str.substr(0, boldIndex));
        }
        snippets.push(
          <H4 weight="bold" align="center">
            {str.substr(boldIndex, boldWord.length)}
          </H4>,
        );
        str = str.substr(boldIndex + boldWord.length);
      });
    }

    snippets.push(str);
    return (
      <MCView row>
        <H4 align="center">{snippets.map(snippet => snippet)}</H4>
      </MCView>
    );
  };

  getCards = () => {
    const {t, favoriteTools} = this.props;
    const {tabIndex, searchText} = this.state;
    switch (tabIndex) {
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
            card.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1,
        );
        break;
      default:
    }
  };

  onPressCard = card => {
    NavigationService.navigate(card.navigateTo);
  };

  _renderCardItem = ({item}) => {
    const {t, theme, favoriteTools} = this.props;
    const card = item;
    const exist = favoriteTools && favoriteTools.find(i => i.key === card.key);
    return (
      <MCView bordered mb={10} ml={10} br={10}>
        <MCButton
          width={130}
          align="center"
          pt={20}
          onPress={() => this.onPressCard(card)}>
          <MCView height={70}>{this.renderCardTitle(card)}</MCView>
          <MCIcon type={card.iconType} name={card.icon} size={40} />
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
              color={exist ? theme.colors.outline : theme.colors.text}
              size={15}
            />
          </MCButton>
        </MCView>
      </MCView>
    );
  };

  render() {
    const {tabIndex, searchText} = this.state;
    const {t, theme, favoriteTools} = this.props;
    console.log({favoriteTools});
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasBack={false}
          headerIcon={
            <MCView ml={10}>
              <ToolsSvg size={30} color={theme.colors.text} />
            </MCView>
          }
          title={t('footer_tools')}
        />
        <MCView row style={{flex: 1}}>
          <MCView
            width={75}
            style={{borderRightWidth: 1, borderColor: theme.colors.text}}>
            <MCContent
              contentContainerStyle={{width: dySize(80), alignItems: 'center'}}>
              {ToolsSideTabs.map((tab, index) => {
                const tabColor =
                  tabIndex === index ? theme.colors.outline : theme.colors.text;
                return (
                  <MCButton
                    key={index}
                    mb={20}
                    align="center"
                    onPress={() => this.onPressTab(index)}>
                    <MCIcon
                      type={tab.iconType}
                      name={tab.icon}
                      color={tabColor}
                      size={30}
                    />
                    <H5 color={tabColor}>{t(`tools_tab_side_${tab.key}`)}</H5>
                  </MCButton>
                );
              })}
            </MCContent>
          </MCView>
          <MCView style={{flex: 1, alignItems: 'center'}}>
            {tabIndex === 4 && (
              <MCSearchInput
                width={280}
                text={searchText}
                onChange={text => this.setState({searchText: text})}
              />
            )}
            <FlatList
              data={this.getCards()}
              renderItem={this._renderCardItem}
              keyExtractor={item => item.key}
              numColumns={2}
              style={{width: dySize(300)}}
              ListEmptyComponent={
                <MCEmptyText mt={30}>{t('no_result')}</MCEmptyText>
              }
              extraData={favoriteTools}
            />
          </MCView>
        </MCView>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  profile: state.profileReducer,
  favoriteTools: state.otherReducer.favoriteTools,
});

const mapDispatchToProps = {
  addFavoriteTool: otherActions.addFavoriteTool,
  removeFavoriteTool: otherActions.removeFavoriteTool,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AddReflectionScreen),
);
