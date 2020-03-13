import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';
import {routerActions} from 'Redux/actions';
import {MCRootView} from 'components/styled/View';
import {MCHeader, MCSearchInput} from 'components/common';

class FeedScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  render() {
    const {searchText, showDrawer} = this.props;
    const {t} = this.props;
    return (
      <MCRootView justify="flex-start">
        <MCHeader
          hasRight
          hasBack={false}
          title={t('feed_headerTitle')}
          rightIcon="md-menu"
          onPressRight={() => showDrawer(true)}
        />
        <MCSearchInput
          width={350}
          text={searchText}
          onChange={text => this.setState({searchText: text})}
        />
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  showDrawer: routerActions.setSocialDrawerOpened,
};

export default withTranslation()(
  connect(mapStateToProps, mapDispatchToProps)(FeedScreen),
);
