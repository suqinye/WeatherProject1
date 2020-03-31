import React, {Component} from 'react';
import { View, Text, TextInput, StyleSheet, Image, PixelRatio,ImageBackground,Dimensions } from 'react-native';

export default class SettingPage extends Component{
    constructor(props){
        super(props);

    }
    goBack = () => {
        // this.props.navigation.goback();
         this.props.navigation.push('Login');       
       };

    render(){

        return(
            <View>
               
                <View style={{marginTop:30}}>
                <Text  onPress={()=>this.goBack()}>设置页面</Text>
                </View>
            </View>
        )
    }

}