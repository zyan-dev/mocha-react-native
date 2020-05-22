import React from 'react';
import {connect} from 'react-redux';
import {routerActions, resourceActions} from 'Redux/actions';
import {withTranslation} from 'react-i18next';
import {MCRootView, MCContent} from 'components/styled/View';
import BookResourceScreen from '../Books/Books';

class BookmarkResourcesScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedMember: {},
      sort: true,
    };
  }

  componentDidMount() {
    this.props.setBookmarkedResourcePageIndex(1);
    this.props.getBookmarkedResources(1);
  }

  render() {
    const {selectedMember, sort} = this.state;
    const {t, bookmarkedResources, profile} = this.props;

    return (
      <MCRootView>
        <BookResourceScreen
          selectedMember={selectedMember}
          sort={sort}
          from="bookmark"
          selectedResources={bookmarkedResources}
        />
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  bookmarkedResources: state.resourceReducer.bookmarkedResources,
  resourceBookmarkPageIndex: state.resourceReducer.resourceBookmarkPageIndex,
  profile: state.profileReducer,
});

const mapDispatchToProps = {
  showDrawer: routerActions.setProfileDrawerOpened,
  getBookmarkedResources: resourceActions.getBookmarkedResources,
  setBookmarkedResourcePageIndex:
    resourceActions.setBookmarkedResourcePageIndex,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(BookmarkResourcesScreen),
);
