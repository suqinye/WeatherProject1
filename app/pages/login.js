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
import { StackNavigator } from 'react-navigation';
import Button from '../components/Button';
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
    // 登录，跳转到首页
    onLoginSuccess=()=>{
        // let formData =new FormData();
        // formData.append("userName",_this.state.userName);       
        // formData.append("password",_this.state.password) ;
        // let url = "http://localhost:8080/AwesomeProject";
        //https://github.com/facebook/react-native
        //  NetUitl.postJson(url,formData,(responseText) => {
        //   alert(responseText);
        //   this.onLoginSuccess();
    // }) 

        
       //{content:'当前是Page2'}为传递的参数
       this.props.navigation.push('WeatherHome',{content:'当前是WeatherHome页面'});
    }
//跳转到注册账号页面
    goTOapplicationAccountPage=()=>{

        // return(
        //     <View style={{margin:30,width:'80%',height:'100%'}}>
        //             <Text style={{fontSize:18,color:'#000'}}>账号密码登录</Text>
        //             <View style={{height:48,justifyContent:'center',marginTop:100,borderBottomWidth:1,borderColor:'#c4c4c4'}}>
        //                 <TextInput
        //                 placeholder="手机号"
        //                 placeholderTextColor="#c4c4c4"
        //                 onChangeText={(userName) => this.setState({userName})}
        //                 >

        //                 </TextInput>
        //             </View>
        //             <View style={{height:48,justifyContent:'center',borderBottomWidth:1,borderColor:'#c4c4c4'}}>
        //                 <TextInput
        //                 placeholder="密码"
        //                 placeholderTextColor="#c4c4c4"
        //                 secureTextEntry={true}
        //                 onChangeText={(password) => this.setState({password:password})}
        //                 >

        //                 </TextInput>
        //             </View>
        //             <View style={{marginTop:30}}>
        //                 <Button title="登录" onPressSubmit={this.onLoginSuccess.bind(this)} />
        //             </View>
        //         </View>
            
        // )

    }
    //忘记密码
    goToForgetpasswordPage=()=>{
        

    }
    // static navigationOptions = {
    //     title: 'Login',
    //   };
    handleCheck=()=>{
        let {userName,password}=this.state;
        // if(userName == ''){
        //     alert("账号不能为空！");
           
        // }else if(password == ''){
        //     alert("密码不能为空!");
        // }else{
        //     this.onLoginSuccess();
        // }
        this.onLoginSuccess();

    }
    render (){
        let {height,width} =  Dimensions.get('window');
        //screenHeight,screenWidth
        return(

            <ImageBackground source={require('../image/icon_weather.jpg')} style={{ flex: 1,alignItems:'center',flexDirection:'column',width: width, height: height}}>

                <View style={{margin:30,width:'80%',height:'100%'}}>
                    <Text style={{marginTop:100,fontSize:18,color:'#000'}}>欢迎进入XX天气</Text>
                    <View style={{height:48,justifyContent:'center',marginTop:50,borderBottomWidth:1,borderColor:'#c4c4c4'}}>
                        <TextInput
                        ref=" textAccVale"
                        autoFocus={true}
                        placeholder="请输入手机号"
                        placeholderTextColor="#fff"
                        onChangeText={(text) => this.setState({userName:text})}
                        >

                        </TextInput>
                    </View>
                    <View style={{height:48,justifyContent:'center',borderBottomWidth:1,borderColor:'#c4c4c4'}}>
                        <TextInput
                        ref=" textPssVal"
                        placeholder="请输入密码"
                        placeholderTextColor="#fff"
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({password})}
                        >

                        </TextInput>
                    </View>                   
                    <View style={{marginTop:30}}>
                        <Button title="登录"  onPress={this.handleCheck}/>
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