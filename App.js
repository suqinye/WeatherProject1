/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  AppRegistry,
  Navigator,
  TouchableOpacity,
  Dimensions
} from 'react-native';
// import { NavigationContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation';
// import { StackNavigator } from 'react-navigation';
// import Test from './app/test/test1';
// import { AppRouter } from './app/navigator/AppRouter';

import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Login from './app/pages/login';
import ApplicationAccount from './app/pages/applicationAccount';
import WeatherHome from './app/pages/Weather/weatherHome';
import AddCity from './app/pages/managementCity/addCity';
import CityHome from './app/pages/managementCity/cityHome';

let {height,width} =  Dimensions.get('window');
const StackNavigation = createStackNavigator({
  WeatherHome: {
    screen: WeatherHome,
    navigationOptions: {
      header:null              
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header:null
    }   
  },
  ApplicationAccount: {
    screen: ApplicationAccount,
    navigationOptions: {
      header:null
    }
  },
  AddCity:{
    screen:AddCity,
    navigationOptions: {
      header:null
    }
  },
  CityHome:{
    screen:CityHome,
    navigationOptions:{
      header:null
    }
  }
  
},
{
  initialRouteName: 'WeatherHome'
}

);
// StackNavigation.navigationOptions = ({ navigation }) => {
//   let tabBarVisible = true;
//   if (navigation.state.index > 0) {
//     tabBarVisible = false;
//   }
//   return {
//     tabBarVisible,
//   };
// };

export default createAppContainer(StackNavigation);
