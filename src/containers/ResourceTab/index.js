import React from 'react';
import Drawer from 'react-native-drawer';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import ResourceSearchScreen from './Search';
import MyResourceScreen from './MyResources';
import AddResourceScreen from './Add';
import FavouriteResourceScreen from './MyFavourites';
import ResourceSideMenu from './SideMenu';
import {routerActions} from 'Redux/actions';
import {dySize} from 'utils/responsive';

const Stack = createStackNavigator();

class AddResourceTabStack extends React.Component {
  render() {
    const {isDrawerOpened, showDrawer} = this.props;
    return (
      <Drawer
        ref={(ref) => (this._drawer = ref)}
        content={<ResourceSideMenu />}
        type="overlay"
        acceptDoubleTap
        open={isDrawerOpened}
        onOpen={() => showDrawer(true)}
        onClose={() => showDrawer(false)}
        tabToClose
        acceptTap
        tweenDuration={100}
        panThreshold={0.08}
        openDrawerOffset={dySize(100)}
        negotiatePan
        side="left"
        tweenHandler={(ratio) => ({main: {opacity: (2 - ratio) / 2}})}>
        <Stack.Navigator headerMode="none">
          <Stack.Screen
            name="ResourceSearch"
            component={ResourceSearchScreen}
          />
          <Stack.Screen name="MyResources" component={MyResourceScreen} />
          <Stack.Screen name="AddResource" component={AddResourceScreen} />
          <Stack.Screen
            name="ResourceBookmarked"
            component={FavouriteResourceScreen}
          />
        </Stack.Navigator>
      </Drawer>
    );
  }
}

const mapStateToProps = (state) => ({
  isDrawerOpened: state.routerReducer.isProfileDrawerOpened,
});

const mapDispatchToProps = {
  showDrawer: routerActions.setProfileDrawerOpened,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddResourceTabStack);
