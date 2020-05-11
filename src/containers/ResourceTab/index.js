import React from 'react';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';

import ResourceSearchScreen from './Search';
import AddResourceScreen from './Add';
import BookDetailScreen from './Books/BookDetail';
import {routerActions} from 'Redux/actions';

const Stack = createStackNavigator();

class AddResourceTabStack extends React.Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="ResourceSearch" component={ResourceSearchScreen} />
        <Stack.Screen name="AddResource" component={AddResourceScreen} />
        <Stack.Screen name="BookDetail" component={BookDetailScreen} />
      </Stack.Navigator>
    );
  }
}

const mapStateToProps = state => ({
  isDrawerOpened: state.routerReducer.isProfileDrawerOpened,
});

const mapDispatchToProps = {
  showDrawer: routerActions.setProfileDrawerOpened,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddResourceTabStack);
