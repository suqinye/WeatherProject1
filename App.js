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
  Navigator
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

const StackNavigation = createStackNavigator({
    Login:{
        screen:Login
        // navigationOptions:{
        //     title:"首页"
        // }
    },
    WeatherHome:{
      screen:WeatherHome
    },
    ApplicationAccount:{
        screen: ApplicationAccount,
        navigationOptions:{
            title:"详情页"
        }
    }
})

export default createAppContainer(StackNavigation);

