import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {FlatList} from 'react-native-gesture-handler';
import {routerActions} from 'Redux/actions';
import {MCRootView, MCContent, MCView} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {H3, H4} from 'components/styled/Text';
import {MCHeader, MCSearchInput, MCImage} from 'components/common';
import {dySize} from 'utils/responsive';
import NavigationService from 'navigation/NavigationService';

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
      <MCView
        row
        align="center"
        width={340}
        p={10}
        style={{
          borderBottomWidth: 0.2,
          borderColor: theme.colors.border,
          paddingLeft: 0,
        }}>
        <MCButton onPress={() => this.onPressUserAvatar(user)}>
          <MCImage
            width={60}
            height={60}
            round
            type="avatar"
            image={{uri: user.avatar}}
          />
        </MCButton>
        <MCView style={{flex: 1}} ml={10} justify="center">
          <H3>{user.name}</H3>
          <H4 padding={0} color={theme.colors.border}>{`@${user.user_id}`}</H4>
        </MCView>
      </MCView>
    );
  };

  getFilteredUsers = () => {
    const {searchText} = this.state;
    const {allUsers} = this.props;
    if (searchText.length === 0) return [];
    else {
      return allUsers.filter(user => {
        if (
          user.name &&
          user.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
          return true;
        else if (
          user.user_id &&
          user.user_id.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
          return true;
        else return false;
      });
    }
  };

  render() {
    const {searchText} = this.state;
    const {t, theme, showDrawer} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          hasBack={false}
          title={t('feed_headerTitle')}
          rightIcon="md-menu"
          onPressRight={() => showDrawer(true)}
        />
        <MCView style={{position: 'relative', zIndex: 10}} overflow="visible">
          <MCSearchInput
            width={350}
            text={searchText}
            onChange={text => this.setState({searchText: text})}
            onBlur={() => this.setState({searchText: ''})}
          />
          {searchText.length > 0 && (
            <FlatList
              style={{
                position: 'absolute',
                top: 60,
                left: 0,
                right: 0,
                maxHeight: 300,
                borderWidth: 1,
                borderRadius: 4,
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.background,
              }}
              keyboardShouldPersistTaps="always"
              contentContainerStyle={{
                padding: dySize(5),
              }}
              data={this.getFilteredUsers()}
              renderItem={this._renderUserItem}
              keyExtractor={item => item._id}
            />
          )}
        </MCView>
        <MCContent
          style={{zIndex: 9}}
          contentContainerStyle={{
            paddingHorizontal: dySize(12),
            paddingVertical: dySize(5),
          }}>
          <H4 align="center" color={theme.colors.border}>
            No feeds
          </H4>
        </MCContent>
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
  connect(mapStateToProps, mapDispatchToProps)(FeedScreen),
);
