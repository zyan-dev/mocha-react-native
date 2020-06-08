import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {FlatList} from 'react-native-gesture-handler';
import {userActions} from 'Redux/actions';
import {MCHeader, MCImage} from 'components/common';
import {H3, H4, MCEmptyText} from 'components/styled/Text';
import {MCCard, MCView, MCRootView} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import PendingUsersScreen from '../social/pending';
import NavigationService from 'navigation/NavigationService';

class PendingRequestScreen extends React.Component {
  componentDidMount() {
    this.props.getTrustMembers({
      status: 0,
      name: '',
      page: 1,
    });
  }

  render() {
    const {t} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader title={t('feed_menu_pending_requests')} />
        <PendingUsersScreen hasTitle={false} />
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  pendingUsers: state.usersReducer.pendingUsers,
  theme: state.routerReducer.theme,
});

const mapDispatchToProps = {
  declineRequest: userActions.declineRequest,
  getTrustMembers: userActions.getTrustMembers,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PendingRequestScreen),
);
