//登录页
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
     ToolbarAndroid,
     AppRegistry,
     Alert,    
     TouchableOpacity, 
     } from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../components/storage';
import Toast, {DURATION} from 'react-native-easy-toast';
import { StackNavigator } from 'react-navigation';
import Button from '../components/Button';
import Loading from '../components/Loading';
// import AppAccount from './applicationAccount';

let {height,width} =  Dimensions.get('window');
let _this= null;
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            userName:'',
            password:''
        };
        _this = this;
    }
    // 登录，跳转到天气首页
    goToWeatherHomePage=()=>{
       
       //{content:'当前是Page2'}为传递的参数
       this.props.navigation.push('WeatherHome',{content:'当前是WeatherHome页面'});
    }
//跳转到注册账号页面
    goTOapplicationAccountPage(){
        
        this.props.navigation.push('AppAccount');
       

    }
    //跳转到忘记密码
    goToForgetpasswordPage=()=>{
        this.props.navigation.push('ForgetPassword');

    }
    
     handleCheck(){
        let {userName,password}=this.state;       

        if(userName == ''){
            this.refs.toast.show("账号不能为空！",1000);         
        }
        else if(password == ''){
            this.refs.toast.show("密码不能为空!",500);
        }else{
            Storage.set('userName',userName);
            Storage.set('password',password);
           console.log('_save success: ',userName,password);
            _this.goToWeatherHomePage(userName,password);
        }
        

    }
    render (){
       
        //screenHeight,screenWidth
        return(

            <ImageBackground source={require('../image/icon_weather.jpg')} style={{ flex: 1,width: width, height: height}}>
                <TouchableOpacity onPress={this.goBack} style={{flexDirection:'row',alignItems: 'center',marginLeft:10,marginTop:8}}>
                    <Image
                    source={require('../image/icon_left_back.png')}
                    style={{width: 15, height: 15}}></Image>
                    <Text style={{textAlign: 'center', fontSize: 15, color: '#fff'}}>返回</Text>
                </TouchableOpacity>
                <View style={{alignItems:'center',flexDirection:'column'}}>
                    <View style={{marginTop:20,width:'80%',height:'100%'}}>
                        <Text style={{marginTop:100,fontSize:20,color:'#555'}}>欢迎来到冷暖天气</Text>
                        <Text style={{marginTop:10,fontSize:14,color:'#888'}}>知天气，利出行，天天好心情</Text>
                        <View style={{height:48,marginTop:30,borderBottomWidth:1,borderColor:'#ddd'}}>
                            <TextInput
                            ref=" textAccVale"
                            autoFocus={true}
                            placeholder="请输入手机号"
                            placeholderTextColor="#ddd"
                            onChangeText={(text) => this.setState({userName:text})}
                            >

                            </TextInput>
                        </View>
                        <View style={{height:48,borderBottomWidth:1,borderColor:'#ddd'}}>
                            <TextInput
                            ref=" textPssVal"
                            placeholder="请输入密码"
                            placeholderTextColor="#ddd"
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({password})}
                            >

                            </TextInput>
                        </View>                   
                        <View style={{marginTop:30}}>
                            <Button title="登录" onPressLogin={()=>this.handleCheck()}/>
                        </View>
                        <View style={{marginTop:70,flex:1,flexDirection:'row',justifyContent:'space-between',fontSize:15}}>
                            <View>
                                <Text style={{color:'#FFF'}} onPress={()=>this.goTOapplicationAccountPage()}>注册账号</Text>
                            </View>
                            <View> 
                                <Text style={{color:'#FFF'}} onPress={()=>this.goToForgetpasswordPage()}>忘记密码</Text>
                            </View>
                        </View>
                    </View>

                </View>
               
                <Toast ref="toast"/>
                <Loading ref="loading" />
            </ImageBackground>
        )
    }
    goBack = () => {
        this.props.navigation.goBack();
      
      };

}
const styles = StyleSheet.create({

})