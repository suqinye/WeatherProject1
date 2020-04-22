import React, {Component} from 'react';
import { View, 
     Text,
     TextInput,
      StyleSheet, 
      Image,
      TouchableOpacity, 
      PixelRatio,
      ImageBackground,
      
      Dimensions } from 'react-native';
let {height12, width12} = Dimensions.get('window');

export default class MinePage extends Component{
    constructor(props){
        super(props);

    }
    goToLogin = () => {
        // this.props.navigation.goback();
         this.props.navigation.push('Login');       
       };

    render(){

        return(
            <ImageBackground source={require('../image/icon_weatherImgBG.jpg')} 
            style={{flex:1,width:width12,height:height12}}>
               <TouchableOpacity style={{flex:1,alignItems:'center',marginTop:80}} onPress={()=>this.goToLogin()}>
                <View style={{backgroundColor:'#baccED',width:65,height:65,borderRadius:50}}>
                    <Image  source={require('../image/icon_login.png')} style={{width:45,height:45,margin:10}}/>                    
                </View>
                <Text style={{color:'#fff',marginTop:10,fontSize:16}}>登录/注册</Text>
               </TouchableOpacity>

            </ImageBackground>
           
        )
    }

}