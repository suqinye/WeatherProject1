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
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs'; 
import Login from './app/pages/login';
import AppAccount from './app/pages/applicationAccount';
import WeatherHome from './app/pages/Weather/weatherHome';
import ForgetPassword from './app/pages/forgetPassword';
import AddCity from './app/pages/City/addCity';
import CityHome from './app/pages/City/cityHome';
import SettingPage from './app/pages/setting';
import MinePage from './app/pages/minePage';
import { Form } from 'native-base';
// import Main from './app/pages/main';


//底部导航栏的图片
let icon_selectNav1 = require('./app/image/icon_selectNav1.png');//
let icon_noSelectNav1 = require('./app/image/icon_noSelectNav1.png');//
let icon_selectNav2 = require('./app/image/icon_selectNav2.png');//
let icon_noSelectNav2 = require('./app/image/icon_noSelectNav2.png');//
let {height,width} =  Dimensions.get('window');
let navigation = null ;
export default class App extends Component{
  constructor(props){
    super(props);
    this.state={
      selectedTab:'WeatherHome'
    }
    navigation = this.props.navigation;

  }


topNavigation (){
   let topTabs = createBottomTabNavigator({
    Home:createStackNavigator(
      { //天气首页 
        WeatherHome:{screen:WeatherHome,
              navigationOptions: {
                header:null
              } },
        CityHome: {  screen:CityHome}, //城市管理页 
        AddCity:{screen:AddCity,navigationOptions:{header:null}}
      },
      {
        navigationOptions:{
          headerTitle:'天气',
          tabBarLabel: '天气',
          header:null,
          tabBarIcon: ({ focused, tintColor }) => (
            <Image
              source={focused ?icon_selectNav1 :icon_noSelectNav1}
              style={{ width: 26, height: 26, tintColor: tintColor }}
            />
          )

        }
      }
      ),
      Mine:createStackNavigator(
      { 
        MinePage:{screen:MinePage, navigationOptions: {header:null } },//我的页面
        Login:{screen:Login, navigationOptions: {header:null }},//登录页面
        ForgetPassword:{screen:ForgetPassword, navigationOptions: {header:null }},//忘记密码页面
        AppAccount:{screen:AppAccount, navigationOptions: {header:null }}//注册账号页面
      },
      {
        navigationOptions:{
          headerTitle:'我的',
          tabBarLabel: '我的',
          header:null,
          tabBarIcon: ({ focused, tintColor }) => (
            <Image
              source={focused ?icon_selectNav2 :icon_noSelectNav2}
              style={{ width: 26, height: 26, tintColor: tintColor }}
            />
          )

        }
      }
      )     
 


   },
   {
    //7.整个底部条的属性
    tabBarOptions: {
      activeTintColor: '#4BC1D2',
      inactiveTintColor: '#000',
      showIcon: true,
      showLabel: true,
      upperCaseLabel: false,
      pressColor: '#823453',
      pressOpacity: 0.8,
      style: {
        backgroundColor: '#fff',
        paddingBottom: 0,
        borderTopWidth: 0.5,
        borderTopColor: '#ccc',
      },
      labelStyle: {
        fontSize: 12,
        margin: 1
      },
      indicatorStyle: { height: 0 }, //8.android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了
    },
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    backBehavior: 'none',
 })
  //9.组合成一个最终展示界面
  return createAppContainer(topTabs)
}


render(){
  let Page = this.topNavigation()
  return(
    <Page/>
  )
}
}


// const StackNavigation = createStackNavigator({
//   WeatherHome: {
//     screen: WeatherHome,//主页
//     navigationOptions: {
//       header:null              
//     }
//   },
//   Login: {
//     screen: Login,//登录页
//     navigationOptions: {
//       header:null
//     }   
//   },
//   AppAccount: {
//     screen: AppAccount,//注册ye
//     navigationOptions: {
//       header:null
//     }
//   },
//   ForgetPassword:{
//     screen:ForgetPassword,//忘记密码页
//     navigationOptions:{
//       header:null
//     }
//   },
//   AddCity:{
//     screen:AddCity,//添加城市页
//     navigationOptions: {
//       header:null
//     }
//   },
//   CityHome:{
//     screen:CityHome,//城市管理页
//     navigationOptions:{
//       header:null
//     }
//   },
//   SettingPage:{
//     screen:SettingPage//设置页面

//   },
//   MinePage:{
//     screen:MinePage//我的页面
//   },

  
  
// },
// {
//   initialRouteName: 'WeatherHome',
//   headerMode: 'screen'
// }

// );


// export default createAppContainer(StackNavigation);
