import React from 'react';
import {View} from 'react-native';
import {withTranslation} from 'react-i18next';
import {connect} from 'react-redux';
import {routerActions, resourceActions} from 'Redux/actions';
import {MCRootView, MCView} from 'components/styled/View';
import {MCHeader, MCIcon} from 'components/common';
import {H4} from 'components/styled/Text';
import {MCButton} from 'components/styled/Button';
import NavigationService from '../../navigation/NavigationService';
import ResourceTabView from './TabView';

class ResourceSearchScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      viewAll: true,
      filterTypes: [],
    };
  }

  onPressFilterOption = () => {
    this.RBSheet && this.RBSheet.open();
  };

  onPressFilterItem = type => {
    const {filterTypes, viewAll} = this.state;
    const index = filterTypes.indexOf(type.type);
    if (index > -1) {
      filterTypes.splice(index, 1);
    } else {
      filterTypes.push(type.type);
    }
    if (type.type === 'all') {
      this.setState({viewAll: true, filterTypes: []});
    } else {
      this.setState({viewAll: false, filterTypes});
    }
    this.forceUpdate();
  };

  onPressRight = () => {
    NavigationService.navigate('AddResource');
  }

  render() {
    const {t, profile} = this.props;

    if (!profile.userToken.length) {
      return (
        <MCRootView>
          <H4 mb={10}>{t('sign_up_required')}</H4>
          <MCButton
            bordered
            onPress={() => NavigationService.navigate('TabFeed')}>
            <H4>{t('sign_up_button')}</H4>
          </MCButton>
        </MCRootView>
      );
    }
    return (
      <View style={{flex: 1}}>
        <MCHeader
          title={t('resources')}
          onPressBack={() => this.onPressFilterOption()}
          hasRight
          rightIcon="bars"
          onPressRight={() => this.onPressRight()}
          hasBack={false}
          headerIcon={
            <MCView ml={10}>
              <MCIcon type="FontAwesome5" name="book-reader" size={30} />
            </MCView>
          }
        />
        <ResourceTabView initialIndex={2} />
        {/* <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={dySize(400)}
          duration={250}
          customStyles={{
            container: {
              backgroundColor: theme.colors.background,
            },
          }}>
          <MCView row wrap justify="center" align="center" mt={20}>
            {[{type: 'all', icon: 'globe'}].concat(ResourceTypes).map(type => {
              let outlined = filterTypes.indexOf(type.type) > -1;
              if (viewAll) outlined = false;
              if (type.type === 'all') outlined = viewAll;
              return (
                <MCButton
                  key={type.type}
                  onPress={() => this.onPressFilterItem(type)}
                  bordered
                  br={8}
                  mr={10}
                  ml={10}
                  mb={10}
                  width={100}
                  height={100}
                  style={{
                    borderColor: outlined
                      ? theme.colors.outline
                      : theme.colors.border,
                    borderWidth: outlined ? 3 : 1,
                  }}
                  justify="center"
                  align="center">
                  <MCIcon type="FontAwesome5" name={type.icon} size={30} />
                  <H4>{t(`resource_type_${type.type}`)}</H4>
                </MCButton>
              );
            })}
          </MCView>
        </RBSheet> */}
      </View>
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
  )(ResourceSearchScreen),
);
