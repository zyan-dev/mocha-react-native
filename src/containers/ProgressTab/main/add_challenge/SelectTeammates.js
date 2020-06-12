import React from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import * as _ from 'lodash';
import {challengeActions} from 'Redux/actions';
import {MCRootView, MCView} from 'components/styled/View';
import {MCHeader, MCImage, MCSearchInput, MCIcon} from 'components/common';
import {H3, MCEmptyText} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import {OvalGreenImage, OvalYellowImage} from 'components/styled/Custom';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';

class SelectTeammatesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchName: '',
    };
  }

  componentDidMount() {
    this.props.getAvailableTeammates({name: '', page: 1});
  }

  onChangeSearchText = text => {
    this.setState({searchName: text});
    this.props.getAvailableTeammates({name: text, page: 1});
  };

  searchNextPageTeammates() {
    const {searchName} = this.state;
    const {pageIndex, pageLimited, loading} = this.props;
    if (pageLimited || loading) return;
    this.props.getAvailableTeammates({name: searchName, page: pageIndex + 1});
  }

  onSelectTeammate = user => {
    const {selectedChallenge, updateSelectedChallenge} = this.props;
    const invites = _.get(selectedChallenge, ['invites'], []);
    const findIndex = invites.findIndex(i => i._id === user._id);
    if (findIndex < 0) {
      invites.push(user);
    } else {
      invites.splice(findIndex, 1);
    }
    updateSelectedChallenge({invites});
  };

  _renderAvatar = ({item}) => {
    const {theme, selectedChallenge} = this.props;
    const user = item;
    const invites = _.get(selectedChallenge, ['invites'], []);
    const selected = invites.find(i => i._id === user._id);
    return (
      <MCButton onPress={() => this.onSelectTeammate(user)}>
        <MCImage
          width={60}
          height={60}
          round
          type="avatar"
          image={{uri: user.avatar}}
          style={{
            marginRight: dySize(20),
            borderWidth: selected ? 2 : 0,
            borderColor: theme.colors.outline,
          }}
        />
      </MCButton>
    );
  };

  _renderSelectedAvatar = ({item}) => {
    const {theme} = this.props;
    const user = item;
    return (
      <MCView align="center" width={100} ml={7.5} mr={7.5} ph={10}>
        <MCImage
          width={80}
          height={80}
          round
          type="avatar"
          image={{uri: user.avatar}}
        />
        <MCButton
          onPress={() => this.onSelectTeammate(user)}
          bordered
          width={30}
          height={30}
          br={15}
          background={theme.colors.card}
          style={{position: 'absolute', top: 0, right: 0, padding: 0}}
          align="center"
          justify="center">
          <MCIcon type="FontAwesome5Pro" name="times" size={10} />
        </MCButton>
        <H3 align="center">{user.name.split(' ')[0]}</H3>
      </MCView>
    );
  };

  render() {
    const {searchName} = this.state;
    const {t, teammates, loading, pageLimited, selectedChallenge} = this.props;
    const invites = _.get(selectedChallenge, ['invites'], []);
    return (
      <MCRootView justify="flex-start">
        <OvalGreenImage />
        <OvalYellowImage />
        <MCHeader
          title={t('title_progress_tab_select_teammates')}
          hasRight
          rightIcon="arrow-right"
          rightText={t('button_next')}
          onPressRight={() => NavigationService.navigate('SelectSkills')}
        />
        <H3 align="center" width={300}>
          {t('progress_title_select_duration')}
        </H3>
        <MCSearchInput
          width={350}
          text={searchName}
          onChange={text => this.onChangeSearchText(text)}
        />
        <MCView height={80}>
          <FlatList
            horizontal
            contentContainerStyle={{
              alignItems: 'center',
              height: dySize(80),
            }}
            data={teammates}
            renderItem={this._renderAvatar}
            keyExtractor={item => item._id}
            ListEmptyComponent={
              <MCEmptyText align="center" style={{width: dySize(350)}}>
                {loading ? t('progress_loading') : t('no_result')}
              </MCEmptyText>
            }
            ListFooterComponent={
              pageLimited && teammates.length ? (
                <MCEmptyText weight="italic">{t('no_more_result')}</MCEmptyText>
              ) : null
            }
            keyExtractor={item => item._id}
            onEndReached={() => this.searchNextPageTeammates()}
            onEndReachedThreshold={0.5}
          />
        </MCView>
        <H3 align="center" width={300} mt={30}>
          {t('progress_title_invite_teammates')}
        </H3>
        <MCView style={{flex: 1}}>
          <FlatList
            numColumns={3}
            contentContainerStyle={{
              width: dySize(375),
              paddingHorizontal: dySize(15),
            }}
            data={invites}
            renderItem={this._renderSelectedAvatar}
            keyExtractor={item => item._id}
            ListEmptyComponent={<MCEmptyText>{t('no_selected')}</MCEmptyText>}
            keyExtractor={item => item._id}
          />
        </MCView>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  selectedChallenge: state.challengeReducer.selectedChallenge,
  teammates: state.challengeReducer.teammates,
  selected_teammates: state.challengeReducer.selected_teammates,
  pageIndex: state.challengeReducer.pageIndex,
  pageLimited: state.challengeReducer.pageLimited,
  loading: state.challengeReducer.loading,
});

const mapDispatchToProps = {
  getAvailableTeammates: challengeActions.getAvailableTeammates,
  updateSelectedChallenge: challengeActions.updateSelectedChallenge,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SelectTeammatesScreen),
);
