//个人信息页面
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
import Storage from '../components/storage';
let {height, width} = Dimensions.get('window');
//
export default class PersonalInformation extends Component{
    constructor(props){
        super(props);
        this.state={
           
            userName:'',
            password:'',
            user_infor:''            
        }
    }
    componentDidMount(){
        Storage.get('user_infor').then((tags)=>{
            console.log("tags==============");
            console.log(tags);
            if(tags!=undefined||tags!=null){
                this.setState({                  
                    userName:tags.userName,
                    password:tags.password,
                    user_infor:tags                   
                })
            }
        })     
    }
    goBack = () => {
        this.props.navigation.goBack();
         //this.props.navigation.push('Login');       
       };
    goToSignOut(){
        Storage.remove('user_infor');
        this.props.navigation.push('MinePage',{isLogin:true});
      }
    goToChangePassword=()=>{
        // let {userName,password} = this.state;
        this.props.navigation.push('ChangePassword');
      }
    render(){
        let {userName,password} = this.state;

        return(

            <ImageBackground source={require('../image/icon_weatherImgBG.jpg')} style={{flex:1,height:height,width:width}}>
                <View style={{height:height}}>
                    <View style={{flexDirection:'row',alignItems:'center',height:40}}>
                        <LeftBack  title='返回' onPressBack={()=>this.goBack()}></LeftBack> 
                        <View style={{justifyContent:'flex-start',flex:1,alignItems:'center',flexDirection:'row'}}> 
                            <View style={{flex:1}}></View>                       
                            <View style={{flex:3}}><Text style={{color:'#fff',fontSize:18}}>个人信息</Text></View>
                        </View>
                    </View>
                    <View style={{flex:1,height:height-40,marginTop:10,backgroundColor:'#dedede'}}>
                        <View style={{flex:1}}>
                            <View  style={{marginTop:10,marginBottom:10,backgroundColor: '#f5f5f5', flexDirection:'row',justifyContent:'space-between',height:60,alignItems:'center',borderBottomWidth:0.5,borderColor:'#657089'}}>
                                <View><Text style={{marginLeft:15,color:'#657089',fontSize:16}}>头像</Text></View>
                                <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#baccED',width:45,height:45,borderRadius:50,marginRight:20}}>
                                    <Image  source={require('../image/icon_login.png')} style={{width:28,height:28,margin:8}}/>    
                                    {/* <Image  source={require('../image/icon_rightBack.png')} style={{width: 16, height: 16,margin:5}}/>                 */}
                                </View>
                                
                            </View>
                            <View style={{backgroundColor: '#f5f5f5', flexDirection:'row',justifyContent:'space-between',height:60,alignItems:'center',borderBottomWidth:0.5,borderColor:'#657089'}}>
                                <View style={{marginLeft:15,}}>
                                    <Text  style={{color:'#657089',fontSize:16}}>昵称</Text>                        
                                </View>
                                <View style={{marginRight:20,flexDirection:'row',alignItems:'center'}}>
                                    <Text  style={{color:'#657089',fontSize:16}}>{userName}</Text> 
                                    {/* <Image  source={require('../image/icon_rightBack.png')} style={{width: 16, height: 16,margin:5}}/>                        */}
                                </View>
                                
                            </View>
                            <TouchableOpacity onPress={()=>this.goToChangePassword()} style={{marginBottom:10,backgroundColor: '#f5f5f5', flexDirection:'row',justifyContent:'space-between',height:60,alignItems:'center',borderBottomWidth:0.5,borderColor:'#657089'}}>
                                <View style={{marginLeft:15,}}>
                                    <Text  style={{color:'#657089',fontSize:16}}>修改密码</Text>                        
                                </View>
                                <View style={{marginRight:15,flexDirection:'row',alignItems:'center'}}>                              
                                    <Image  source={require('../image/icon_rightBack.png')} style={{width: 16, height: 16,margin:5}}/>                       
                                </View>
                                
                            </TouchableOpacity>
                        </View>
                        <View style={{marginBottom:40,backgroundColor: '#f5f5f5', height: 60, justifyContent: 'center', paddingLeft: 15, paddingRight: 15}}>
                            <TouchableOpacity onPress={() => {this.goToSignOut()}}>
                                <View style={{backgroundColor: '#0066cc', height: 35, alignItems: 'center', justifyContent: 'center', borderRadius: 3}}>
                                    <Text style={{fontSize: 16, color: '#fff'}}>退出登录</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                   

                </View>

            </ImageBackground>
           
        )
    }

}