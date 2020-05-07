import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  PixelRatio,
  ImageBackground,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import LeftBack from '../components/LeftBack';

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
                 <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <LeftBack  title='返回' onPressBack={()=>this.goBack()}></LeftBack>                  
                   
                    <View style={{justifyContent:'space-between',flex:1,alignItems:'center',flexDirection:'row'}}>                        
                        <View style={{flex:2}}><Text style={{color:'#fff'}}>个人信息</Text></View>
                    </View>
                    
                 </View>
                 <View style={{marginTop:30}}>
                    <View style={{marginTop:10}}>
                        <Text>头像</Text>
                        <Image  source={require('../image/icon_login.png')} style={{width:45,height:45,margin:10}}/>
                    </View>
                 </View>
                 <View style={{marginTop:10}}>
                    <View style={{marginTop:10}}>
                        <Text>昵称</Text>                        
                    </View>
                    <View style={{marginTop:10}}>
                        <Text>昵称</Text>
                        <Image  source={require('../image/icon_rightBack.png')} style={{width: 16, height: 16,margin:5}}/>
                    </View>
                 </View>

            </ImageBackground>
           
        )
    }

}