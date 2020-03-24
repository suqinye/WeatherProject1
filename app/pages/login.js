
import React, {Component} from 'react';
import { View, Text, TextInput, StyleSheet, Image, PixelRatio,ImageBackground,Dimensions } from 'react-native';
import Button from '../components/Button';
let con_bgImage = require('../image/icon_weather.jpg');
// let Dimensions = require('Dimensions');
let _this= null;
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            userName:'',
            passWord:'',
        };
        _this = this;
    }

    handleSubmit(){
        console.log('username:' + this.state.text);
        console.log('password:' + this.state.password);
    }
    
    render (){
        let {height,width} =  Dimensions.get('window');
        //screenHeight,screenWidth
        return(

            <ImageBackground source={require('../image/icon_weather.jpg')} style={{ flex: 1,alignItems:'center',flexDirection:'column',width: width, height: height}}>

                <View style={{margin:30,width:'80%',height:'100%'}}>
                    
                    <View style={{height:48,justifyContent:'center',marginTop:100,borderBottomWidth:1,borderColor:'#c4c4c4'}}>
                        <TextInput
                        placeholder="用户名"
                        placeholderTextColor="#c4c4c4"
                        onChangeText={(text) => this.setState({text})}
                        >

                        </TextInput>
                    </View>
                    <View style={{height:48,justifyContent:'center',borderBottomWidth:1,borderColor:'#c4c4c4'}}>
                        <TextInput
                        placeholder="密码"
                        placeholderTextColor="#c4c4c4"
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({password})}
                        >

                        </TextInput>
                    </View>
                    <View style={{marginTop:30}}>
                        <Button text="登录" onPress={this.handleSubmit.bind(this)}/>
                    </View>
                </View>
            </ImageBackground>
        )
    }

}
const styles = StyleSheet.create({

    edit:{
        height: 40,
        fontSize: 13,
        backgroundColor: '#FFF',
        paddingLeft: 15,
        paddingRight: 15,
    }
})