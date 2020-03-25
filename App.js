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
import Home from './app/pages/login';
import Detail from './app/pages/applicationAccount';

const StackNavigation = createStackNavigator({
    Home:{
        screen:Home,
        navigationOptions:{
            title:"首页"
        }
    },
    Detail:{
        screen: Detail,
        navigationOptions:{
            title:"详情页"
        }
    }
})

export default createAppContainer(StackNavigation);

// class App extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
    
//       return (
//         <AppRouter/>
//       );
//       // <View>
        
//       //   <Login></Login>
//       // </View>
//   }
// }
// export default App;
