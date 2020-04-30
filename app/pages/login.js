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
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../components/storage';
import Toast, {DURATION} from 'react-native-easy-toast';
import { StackNavigator } from 'react-navigation';
import Button from '../components/Button';
import Loading from '../components/Loading';
import LeftBack from '../components/LeftBack';
// import AppAccount from './applicationAccount';

let {height,width} =  Dimensions.get('window');
let _this= null;
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={           
            userName:'',
            password:'',
            logonSuccess:true,//登录成功
            isRegistered:false
           
        };
        _this = this;
    }
    componentDidMount(){
        if(this.props.navigation.state.params!=undefined){
            let {user,psd} = this.props.navigation.state.params;                       
            this.setState({              
                userName:user,//用户名
                password:psd,//密码
                isRegistered:true//已注册
            })
        }
        
    }    
    render (){       
        //screenHeight,screenWidth
        return(

            <ImageBackground source={require('../image/icon_weather.jpg')} style={{ flex: 1,width: width, height: height}}>
                <View  style={{marginTop:10,marginLeft:8}}><LeftBack title='返回' onPress={()=>this.goBack()}></LeftBack></View> 
                <View style={{alignItems:'center',flexDirection:'column'}}>
                    <View style={{marginTop:20,width:'80%',height:'100%'}}>
                        <Text style={{marginTop:100,fontSize:20,color:'#555'}}>欢迎来到冷暖天气</Text>
                        <Text style={{marginTop:10,fontSize:14,color:'#888'}}>知天气，利出行，天天好心情</Text>
                        <View style={{height:48,marginTop:30,borderBottomWidth:1,borderColor:'#ddd'}}>
                            <TextInput
                            ref=" textAccVale"
                            autoFocus={true}
                            placeholder="请输入用户名"
                            placeholderTextColor="#ddd"                            
                            value = {this.state.isRegistered?this.state.userName:null}                            
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
                            value = {this.state.isRegistered?this.state.password:null}
                            onChangeText={(password) => this.setState({password})}
                            >

                            </TextInput>
                        </View>                   
                        <View style={{marginTop:30}}>
                            <Button title="登录" onPressLogin={()=>this.onPressCallback()}/>
                        </View>
                        <View style={{marginTop:70,flex:1,flexDirection:'row',justifyContent:'space-between',fontSize:15}}>
                            <View>
                                <Text style={{color:'#FFF'}} onPress={()=>this.goTOapplicationAccountPage()}>注册账号</Text>
                            </View>
                            {/* <View> 
                                <Text style={{color:'#FFF'}} onPress={()=>this.goToForgetpasswordPage()}>记住密码</Text>
                            </View> */}
                        </View>
                    </View>

                </View>
               
                <Toast ref="toast"/>
                <Loading ref="loading" />
            </ImageBackground>
        )
    }
    onPressCallback(){
        let {userName,password,inforData} = this.state;
        if(password == ''){
            this.refs.toast.show("密码不能为空!",1000);
            return;  
        }  if(userName == ''){
            this.refs.toast.show("用户名不能为空!",1000);
            return;  
        } 
       
            
         _this.goToMinePage(userName);
        //  let inforData = AsyncStorage.getItem('localData');
        //  console.log(inforData);
        // if(inforData.userName==userName&&inforData.password==password){
        //     _this.goToMinePage(userName);
        // }else{
        //     this.refs.toast.show("用户名或密码不正确!",1000);
        // }
    //     for(let i=0;i<inforData.length;i++){
    //        if (inforData[i].userName ==userName &&inforData[i].password==password){
    //            //{content:'当前是Page2'}为传递的参数
    //         _this.goToMinePage(userName);

    //        }else{
    //         this.refs.toast.show("登录失败",1000);
    //         this.setState({
    //             logonSuccess:false
    //         })
    //        }
    //    }
    
         
        
    }
    goBack = () => {
        this.props.navigation.goBack();
    };
      // 登录，跳转到我的页面
    goToMinePage=(user)=>{       
        this.props.navigation.push('MinePage',{userName:user});  
    }
     //跳转到注册账号页面
     goTOapplicationAccountPage(){         
         this.props.navigation.push('AppAccount'); 
    }
     //跳转到忘记密码
    //  goToForgetpasswordPage=()=>{
    //      this.props.navigation.push('ForgetPassword');
 
    // }
     
   
}
const styles = StyleSheet.create({

})