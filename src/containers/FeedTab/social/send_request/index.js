import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {MCRootView} from 'components/styled/View';
import {MCHeader, MCSearchInput, MCImage} from 'components/common';
import {H3, H4} from 'components/styled/Text';
import {dySize} from 'utils/responsive';
import {selector} from 'Redux/selectors';
import {MCContent, MCCard, MCView} from '../../../../components/styled/View';
import {MCIcon} from '../../../../components/styled/Text';

class SendRequestScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  render() {
    const {t, theme, allUsers} = this.props;
    const {searchText} = this.state;
    return (
      <MCRootView justify="flex-start">
        <MCHeader title={t('user_search_title')} />
        <MCSearchInput
          width={350}
          text={searchText}
          onChange={text => this.setState({searchText: text})}
        />
        <MCContent contentContainerStyle={{paddingHorizontal: dySize(10)}}>
          {allUsers.map(user => {
            return (
              <MCCard row shadow align="center">
                <MCImage width={80} height={80} image={user.avatar} />
                <MCView style={{flex: 1}} justify="center">
                  <H3>{user.name}</H3>
                  {user.networkState === 0 && (
                    <H4 color={theme.colors.border}>
                      {t('contact_request_pending')}
                    </H4>
                  )}
                  {user.networkState === 1 && (
                    <H4 color={theme.colors.border}>
                      {t('contact_request_approved')}
                    </H4>
                  )}
                </MCView>
                {user.networkState === -1 && (
                  <MCIcon
                    name="ios-add-circle-outline"
                    color={theme.colors.toggle_on}
                  />
                )}
              </MCCard>
            );
          })}
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  allUsers: selector.users.getAllMembersWithNetworkState(state),
});

const mapDispatchToProps = {};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(SendRequestScreen),
);
