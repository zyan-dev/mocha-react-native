import React from 'react';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';

import ResourceScreen from './Main';
import AddResourceScreen from './Books/Add';
import BookDetailScreen from './Books/BookDetail';
import SelectRecommendMemberScreen from './Books/Recommends';
import {routerActions} from 'Redux/actions';

const Stack = createStackNavigator();

class AddResourceTabStack extends React.Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Resources" component={ResourceScreen} />
        <Stack.Screen name="AddResource" component={AddResourceScreen} />
        <Stack.Screen name="BookDetail" component={BookDetailScreen} />
        <Stack.Screen
          name="SelectRecommendMember"
          component={SelectRecommendMemberScreen}
        />
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
