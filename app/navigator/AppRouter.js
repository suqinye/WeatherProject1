import React, { Component } from 'react';
//导入
import {createAppContainer} from 'react-navigation-stack';
import Login from '../pages/login';
import ApplicationAccount from '../pages/applicationAccount';
import { createBottomTabNavigator } from 'react-navigation-tabs';


export default class AppRouter extends Component {
  constructor(props){
    super(peops);

  }
  _tabNavigator(){
    return(
      createBottomTabNavigator({
        Page1: {screen: Login},
        Page2: {screen: ApplicationAccount}

      })
    );
  }
    
 
 render(){
   let Tab =createAppContainer(this._tabNavigator());
   return(
     <Tab/>
   );

 }
}

