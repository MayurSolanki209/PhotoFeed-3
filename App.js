import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
//import { Ionicons } from '@expo/vector-icons';
import {Ionicons} from 'react-native-vector-icons/Ionicons';


import { f, database, storage, auth } from './config/config.js';
import UserAuth from './app/components/auth.js';

import feed from './app/screens/feed.js';
import ask from './app/screens/ask.js';
import profile from './app/screens/profile.js';
import userProfile from './app/screens/userProfile.js';
import comments from './app/screens/comments.js';
import settings from './app/screens/settings.js';


const TabStack = createBottomTabNavigator(
  {
    Feed    : {screen : feed},
    Ask    : {screen : ask},
    Profile : {screen : profile}
  }
);

const MainStack = createStackNavigator(
  {
    Home        : {screen : TabStack },
    User        : {screen : userProfile},
    Comments    : {screen : comments},
    Settings    : {screen : settings},
  },
  {
    initialRouteName: 'Home',
    mode: 'modal',
    headerMode: 'none'
  }
);



const AppContainer = createAppContainer(MainStack);

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state={
      loggedin : false
    }
  }

  componentDidMount = () => {
    var that = this;
    f.auth().onAuthStateChanged(function(user){
      if(user){
        //Loggend in
        that.setState({
          loggedin : true
        });
      }else {
        that.setState({
          loggedin : false
        });
      }
    });
  }


  render() {
    return (
      <View style={{flex:1, backgroundColor: 'white'}}>
        { this.state.loggedin == true ? (
          < AppContainer />
        ) : (
          <UserAuth message={'Please log in'} />
        ) }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
