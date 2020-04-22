import React, {Component} from 'react';
import { View, Text, TextInput, StyleSheet, Image, PixelRatio,ImageBackground,Dimensions } from 'react-native';
let {height, width} = Dimensions.get('window');

export default class SettingPage extends Component{
    constructor(props){
        super(props);

    }
    goBack = () => {
        this.props.navigation.goBack();
         //this.props.navigation.push('Login');       
       };

    render(){

        return(

            <ImageBackground source={require('../image/icon_weatherImgBG.jpg')} style={{flex:1,height:height,width:width}}>
                 {/* <View style={{marginTop:30}}>
                    <Text  onPress={()=>this.goBack()}>设置页面</Text>
                 </View>
                 <View>
                     <View>
                         <Image source={require('../image/icon_login.png')} style={{width:25,height:25}}></Image>


                     </View>
                 </View> */}

            </ImageBackground>
           
        )
    }

}