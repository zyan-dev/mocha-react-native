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

  render() {
    const {selectedMember, sort} = this.state;
    const {t, allResources, profile} = this.props;
    const bookedResources = allResources.filter(
      resource =>
        resource.bookedBy && resource.bookedBy.indexOf(profile._id) > -1,
    );

    return (
      <MCRootView>
        <BookResourceScreen
          selectedMember={selectedMember}
          sort={sort}
          from="global"
          selectedResources={bookedResources}
        />
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
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
  )(BookmarkResourcesScreen),
);
