import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {FlatList} from 'react-native-gesture-handler';
import {routerActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {H3, H4, MCEmptyText} from 'components/styled/Text';
import {MCHeader, MCSearchInput, MCImage} from 'components/common';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';
import {getStringIndexOf} from 'services/operators';

class FeedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  onPressUserAvatar = user => {
    NavigationService.navigate('UserProfile', {id: user._id});
  };

  _renderUserItem = ({item}) => {
    const {theme} = this.props;
    const user = item;
    return (
      <MCButton
        row
        align="center"
        width={340}
        pt={10}
        pb={10}
        onPress={() => this.onPressUserAvatar(user)}
        style={{
          borderBottomWidth: 0.2,
          borderColor: theme.colors.border,
        }}>
        <MCImage
          width={60}
          height={60}
          round
          type="avatar"
          image={{uri: user.avatar}}
        />
        <MCView style={{flex: 1}} ml={10} justify="center">
          <H3>{user.name}</H3>
          <H4 padding={0} color={theme.colors.border}>{`@${user.user_id}`}</H4>
        </MCView>
      </MCButton>
    );
  };

  getFilteredUsers = () => {
    const {searchText} = this.state;
    const {allUsers} = this.props;
    if (searchText.length === 0) return [];
    else {
      return allUsers.filter(user => {
        if (user.name && getStringIndexOf(user.name, searchText) > -1)
          return true;
        else if (
          user.user_id &&
          getStringIndexOf(user.user_id, searchText) > -1
        )
          return true;
        else return false;
      });
    }
  };

  render() {
    const {searchText} = this.state;
    const {t, theme, showDrawer} = this.props;
    const data = this.getFilteredUsers();

    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          hasBack={false}
          title={t('feed_headerTitle')}
          rightIcon="bars"
          onPressRight={() => showDrawer(true)}
        />
        <MCView style={{position: 'relative', zIndex: 10}} overflow="visible">
          <MCSearchInput
            width={350}
            text={searchText}
            onChange={text => this.setState({searchText: text})}
            // onBlur={() => this.setState({searchText: ''})}
          />
          {searchText.length > 0 && (
            <MCView style={{marginTop: -10, maxHeight: 300}}>
              <FlatList
                style={{
                  borderWidth: data.length > 0 ? 1 : 0,
                  borderRadius: 4,
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.background,
                  width: dySize(350),
                }}
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{
                  padding: dySize(5),
                }}
                data={this.getFilteredUsers()}
                renderItem={this._renderUserItem}
                ListEmptyComponent={
                  <MCView bordered align="center">
                    <MCEmptyText>{t('no_result')}</MCEmptyText>
                  </MCView>
                }
                keyExtractor={item => item._id}
              />
            </MCView>
          )}
        </MCView>
        {searchText.length === 0 && (
          <MCContent
            style={{zIndex: 9}}
            contentContainerStyle={{
              paddingHorizontal: dySize(12),
              paddingVertical: dySize(5),
            }}>
            <H4 align="center" color={theme.colors.border}>
              {t('no_feeds')}
            </H4>
          </MCContent>
        )}
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  allUsers: state.usersReducer.allUsers,
  theme: state.routerReducer.theme,
});

const mapDispatchToProps = {
  showDrawer: routerActions.setSocialDrawerOpened,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(FeedScreen),
);
