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
     TouchableOpacity } from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import { StackNavigator } from 'react-navigation';
import Button from '../components/Button';
import Loading from '../components/Loading';
// import AppAccount from './applicationAccount';
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
        // let formData =new FormData();
        // formData.append("userName",_this.state.userName);       
        // formData.append("password",_this.state.password) ;
        // let url = "http://localhost:8080/AwesomeProject";
        //  NetUitl.postJson(url,formData,(responseText) => {
        //   alert(responseText);
        //   this.goToWeatherHomePage();
    // }) 

        
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
    // static navigationOptions = {
    //     title: 'Login',
    //   };
    handleCheck=()=>{
        let {userName,password}=this.state;
        if(userName == ''){
            this.refs.toast.show("账号不能为空！",1000);         
        }
        else if(password == ''){
            this.refs.toast.show("密码不能为空!",500);
        }else{
            _this.goToWeatherHomePage();
        }
        

    }
    render (){
        let {height,width} =  Dimensions.get('window');
        //screenHeight,screenWidth
        return(

            <ImageBackground source={require('../image/icon_weather.jpg')} style={{ flex: 1,alignItems:'center',flexDirection:'column',width: width, height: height}}>

                <View style={{margin:30,width:'80%',height:'100%'}}>
                    <Text style={{marginTop:100,fontSize:20,color:'#555'}}>欢迎来到冷暖天气</Text>
                    <Text style={{marginTop:10,fontSize:14,color:'#888'}}>每天好心情</Text>
                    <View style={{height:48,justifyContent:'center',marginTop:30,borderBottomWidth:1,borderColor:'#ddd'}}>
                        <TextInput
                        ref=" textAccVale"
                        autoFocus={true}
                        placeholder="请输入手机号"
                        placeholderTextColor="#ddd"
                        onChangeText={(text) => this.setState({userName:text})}
                        >

                        </TextInput>
                    </View>
                    <View style={{height:48,justifyContent:'center',borderBottomWidth:1,borderColor:'#ddd'}}>
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
                <Toast ref="toast"/>
                <Loading ref="loading" />
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