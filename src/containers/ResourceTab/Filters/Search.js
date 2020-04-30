import React from 'react';
import {connect} from 'react-redux';
import {routerActions, resourceActions} from 'Redux/actions';
import {withTranslation} from 'react-i18next';
import {MCRootView, MCContent} from 'components/styled/View';
import {MCSearchInput} from 'components/common';

class SearchResourceScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  render() {
    const {searchText} = this.state;
    const {t} = this.props;
    return (
      <MCRootView>
        <MCContent width={350}>
          <MCSearchInput
            placeholder={t('resource_search_placeholder')}
            text={searchText}
            onChange={searchText => this.setState({searchText})}
          />
        </MCContent>
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  bookmarkedResources: state.resourceReducer.bookmarkedResources,
  allResources: state.resourceReducer.allResources,
  profile: state.profileReducer,
});

const mapDispatchToProps = {
  showDrawer: routerActions.setProfileDrawerOpened,
  bookmarkResource: resourceActions.bookmarkResource,
  getAllResources: resourceActions.getAllResources,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SearchResourceScreen),
);
