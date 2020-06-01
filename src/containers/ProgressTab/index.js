import React from 'react';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';

import ProgressScreen from './Home';
import AddPostScreen from './AddPost';
import PostDetailScreen from './PostDetail';
import {routerActions} from 'Redux/actions';

const Stack = createStackNavigator();

class ProgressTabStack extends React.Component {
  render() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Progress" component={ProgressScreen} />
        <Stack.Screen name="AddPost" component={AddPostScreen} />
        <Stack.Screen name="PostDetail" component={PostDetailScreen} />
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
)(ProgressTabStack);
