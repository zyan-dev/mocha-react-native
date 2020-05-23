import React from 'react';
import {connect} from 'react-redux';
import {withTranslation} from 'react-i18next';

import {resourceActions} from 'Redux/actions';
import {MCContent, MCRootView, MCView} from 'components/styled/View';
import {MCButton} from 'components/styled/Button';
import {H3, H4, H5} from 'components/styled/Text';
import {MCIcon} from 'components/common';
import {ResourceContentRoots} from 'utils/constants';
import BookResourceScreen from '../Books/Books';

class MyResourceScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      focused: ResourceContentRoots[0].key,
      defaultTab: 1,
      showPageIndex: 1,
      selectedMember: {},
      sort: true,
    };
  }

  componentDidMount() {
    this.props.setMyResourcePageIndex(1);
  }

  onPressItem = item => {
    this.setState({focused: item.key});
  };

  selectMember = user => {
    this.setState({selectedMember: user});
  };

  sortBook = () => {
    this.setState({sort: !this.state.sort});
  };

  render() {
    const {t, theme, profile, myResources, resourceMyPageIndex} = this.props;
    const {focused, sort} = this.state;
    let resources = [];
    myResources.forEach(resource => {
      if (resource.type == 'books' && resource.data) {
        if (profile._id == resource.owner) {
          resources.push(resource);
        }
      }
    });

    return (
      <MCRootView>
        <MCView row>
          {ResourceContentRoots.map(item => (
            <MCButton onPress={() => this.onPressItem(item)}>
              <MCIcon
                type="FontAwesome5Pro"
                name={item.icon}
                size={20}
                color={focused == item.key && theme.colors.outline}
              />
            </MCButton>
          ))}
        </MCView>
        <MCView row width={350} justify="space-between" align="center">
          <H4 weight="bold" underline>
            {t('resource_type_my')} {t('bookshelf')}
          </H4>
          <MCButton onPress={() => this.sortBook()}>
            <MCView row>
              <H4>{t('resource_type_book_impact')}</H4>
              <MCIcon
                type="FontAwesome5Pro"
                name={sort ? 'sort-amount-down' : 'sort-amount-up'}
                size={20}
              />
            </MCView>
          </MCButton>
        </MCView>
        {focused == 'books' ? (
          <BookResourceScreen
            selectedMember={profile}
            sort={sort}
            from="my-resource"
            selectedResources={resources}
          />
        ) : (
          <MCContent>
            <MCView align="center">
              <H3>Coming Soon</H3>
            </MCView>
          </MCContent>
        )}
      </MCRootView>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.routerReducer.theme,
  myResources: state.resourceReducer.myResources,
  resourceMyPageIndex: state.resourceReducer.resourceMyPageIndex,
  profile: state.profileReducer,
});

const mapDispatchToProps = {
  getMyResources: resourceActions.getMyResources,
  setMyResourcePageIndex: resourceActions.setMyResourcePageIndex,
};

export default withTranslation()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(MyResourceScreen),
);
