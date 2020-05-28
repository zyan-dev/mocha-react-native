import React from 'react';
import {connect} from 'react-redux';
import {routerActions, resourceActions} from 'Redux/actions';
import {withTranslation} from 'react-i18next';
import {MCRootView, MCContent} from 'components/styled/View';
import BookResourceScreen from '../Books/Books';

class RecommendedResourcesScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedMember: {},
      sort: true,
    };
  }

  componentDidMount() {
    this.props.setRecommendedResourcePageIndex(1);
  }

  render() {
    const {selectedMember, sort} = this.state;
    const {recommendedResources} = this.props;

    return (
      <MCRootView>
        <BookResourceScreen
          selectedMember={selectedMember}
          sort={sort}
          from="recommended"
          selectedResources={recommendedResources}
        />
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  recommendedResources: state.resourceReducer.recommendedResources,
  resourceRecommendResourceIndex:
    state.resourceReducer.resourceRecommendResourceIndex,
  profile: state.profileReducer,
});

const mapDispatchToProps = {
  showDrawer: routerActions.setProfileDrawerOpened,
  getRecommendedResources: resourceActions.getRecommendedResources,
  setRecommendedResourcePageIndex:
    resourceActions.setRecommendedResourcePageIndex,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(RecommendedResourcesScreen),
);
