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
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer,StackNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs'; 
import Login from './app/pages/login';
import AppAccount from './app/pages/applicationAccount';
import WeatherHome from './app/pages/Weather/weatherHome';
import AddCity from './app/pages/City/addCity';
import CityHome from './app/pages/City/cityHome';
import PersonalInformation from './app/pages/personalInformation';
import MinePage from './app/pages/minePage';
import EmptyPage from './app/components/emptyPage';
import ChangePassword from './app/pages/changePassword';
import { Form } from 'native-base';
// import Main from './app/pages/main';


//底部导航栏的图片
// let icon_selectNav1 = require('./app/image/icon_selectNav1.png');//
// let icon_noSelectNav1 = require('./app/image/icon_noSelectNav1.png');//
// let icon_selectNav2 = require('./app/image/icon_selectNav2.png');//
// let icon_noSelectNav2 = require('./app/image/icon_noSelectNav2.png');//
let {height,width} =  Dimensions.get('window');
let navigation = null ;


const StackNavigation = createStackNavigator({
  WeatherHome: {
    screen: WeatherHome,//主页
    navigationOptions: {
      header:null              
    }
  },
  Login: {
    screen: Login,//登录页
    navigationOptions: {
      header:null
    }   
  },
  AppAccount: {
    screen: AppAccount,//注册ye
    navigationOptions: {
      header:null
    }
  },
 
  AddCity:{
    screen:AddCity,//添加城市页
    navigationOptions: {
      header:null
    }
  },
  CityHome:{
    screen:CityHome,//城市管理页
    navigationOptions:{
      header:null
    }
  },
  PersonalInformation:{
    screen:PersonalInformation,//设置页面
    navigationOptions:{
      header:null
    }

  },
  MinePage:{
    screen:MinePage,//我的页面
    navigationOptions:{
      header:null
    }
  },
  EmptyPage:{
    screen:EmptyPage,//无数据页面
    navigationOptions:{
      header:null
    }
  },
  ChangePassword:{
    screen:ChangePassword,
    navigationOptions:{
      header:null
    }
  }
  
},
{
  initialRouteName: 'WeatherHome',
  headerMode: 'screen'
}

);


export default createAppContainer(StackNavigation);
