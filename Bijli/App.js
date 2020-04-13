import React from 'react'
import 'react-native-gesture-handler';
import {createAppContainer,createSwitchNavigator} from 'react-navigation';
import LodingScreen from './src/screens/LodingScreen'
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ProfileScreen from './src/screens/ProfileScreen';
//import MessageScreen from './src/screens/MessageScreen';
import MonthlyScreen from './src/screens/MonthlyScreen';


import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyCf5hSPQnpWidrevDloqb2QAOTBVQOx2Ws",
  authDomain: "bjli-e5d7f.firebaseapp.com",
  databaseURL: "https://bjli-e5d7f.firebaseio.com",
  projectId: "bjli-e5d7f",
  storageBucket: "bjli-e5d7f.appspot.com",
  messagingSenderId: "1017556489005",
  appId: "1:1017556489005:web:6726b2f717cee4b714f9a4",
  measurementId: "G-M41WQQL87V"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const AppTabNavigator = createBottomTabNavigator(
  {
    Home:{
      screen:HomeScreen,
      navigationOptions:{
       tabBarIcon:({tintColor}) => <Icon  name='ios-home' size={24} color={tintColor}/>
      }
    },
   // Message:{
    //  screen:MessageScreen,
   //   navigationOptions:{
    //    tabBarIcon:({tintColor}) => <Icon  name='ios-chatboxes' size={24} color={tintColor}/>
     // }
    //},
    Monthly:{
      screen:MonthlyScreen,
      navigationOptions:{
        tabBarIcon:({tintColor}) => <Icon  name='ios-stats' size={24} color={tintColor}/>
      }
    },
    Profile:{
      screen:ProfileScreen,
      navigationOptions:{
        tabBarIcon:({tintColor}) => <Icon  name='ios-person' size={24} color={tintColor}/>
      }
    },
  },
  {
    tabBarOptions:{
      activeTintColor:"#161F3D",
      inactiveTintColor:"B8BBC4",
      showLabel:true,
    }
  }
);


const AuthStack = createStackNavigator({
  Login:LoginScreen,
  Register:RegisterScreen, 
});

export default createAppContainer(
  createSwitchNavigator(
  {
    App:AppTabNavigator,
    Auth:AuthStack,
    Loding: LodingScreen
  },
  {
    initialRouteName: 'Loding'
  }
  )
);

