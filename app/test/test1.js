/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {Dimensions} from 'react-native';

let ScreenWidth = Math.round(Dimensions.get('window').width);
let ScreenHeight = Math.round(Dimensions.get('window').height);
export default class Test1 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
   
    return (
      <View style={{backgroundColor:'grey',height:'100%'}}>
        <View style={{ flexDirection: 'column',justifyContent:'center',alignItems:'stretch',borderWidth:1,borderColor:'red'}}>
          <View style={{height:50,margin:10,backgroundColor:'purple'}}></View>
          <View style={{height:50,margin:10,backgroundColor:'purple'}}></View>
          <View style={{height:50,margin:10,backgroundColor:'purple'}}></View>
        </View>
        <View style={{height:130,flexDirection: 'row',justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'red'}}>
          <View style={{width:50,height:50,margin:10,backgroundColor:'purple'}}></View>
          <View style={{width:50,height:50,margin:10,backgroundColor:'purple'}}></View>
          <View style={{width:50,height:50,margin:10,backgroundColor:'purple'}}></View>
        </View>
        <View style={{height:130,flexDirection: 'row',justifyContent:'center',alignItems:'flex-end',borderWidth:1,borderColor:'red'}}>
          <View style={{width:50,height:50,margin:10,backgroundColor:'purple'}}></View>
          <View style={{width:50,height:50,margin:10,backgroundColor:'purple'}}></View>
          <View style={{width:50,height:50,margin:10,backgroundColor:'purple'}}></View>
        </View>
        <View style={{height:130,flexDirection: 'row',justifyContent:'center',alignItems:'flex-start',borderWidth:1,borderColor:'red'}}>
          <View style={{width:50,height:50,margin:10,backgroundColor:'purple'}}></View>
          <View style={{width:50,height:50,margin:10,backgroundColor:'purple'}}></View>
          <View style={{width:50,height:50,margin:10,backgroundColor:'purple'}}></View>
        </View>
        <View style={{height:130,flexDirection: 'row',justifyContent:'center',alignItems:'baseline',borderWidth:1,borderColor:'red'}}>
          <View style={{width:50,height:50,margin:10,backgroundColor:'purple'}}></View>
          <View style={{width:50,height:50,margin:10,backgroundColor:'purple'}}></View>
          <View style={{width:50,height:50,margin:10,backgroundColor:'purple'}}></View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: 900,
    height:60,
    flexDirection: 'row',//弹性子元素在父容器中的位置
    alignItems:'flex-start',
    //justifyContent: 'flex-start',//定义了项目在主轴上的对齐方式
   
  },
  
});
