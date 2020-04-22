import React, {Component} from 'react';
import { 
  View, 
  Text,
   TextInput, 
   StyleSheet, 
   Image,
   TouchableOpacity,
    PixelRatio,
    ImageBackground,
    Dimensions } from 'react-native';
import Button from '../components/Button';
import Header from '../components/Header';

let {height,width} =  Dimensions.get('window');
export default class AppAccount extends Component{
    constructor(props){
        super(props);
        this.state = {
          userName:'',
          password:'',
          repeatpwd:'',//重复密码
          content: 'AppAccount'
          }

    }
    goBack = () => {
        this.props.navigation.goBack();
        
      };
      goRegisterSuccess=()=>{
        this.props.navigation.navigate('MinePage');
      }
    render(){

        // const {params} = this.props.navigation.state;
        // let content=params.content;
        let content = this.state.content;
        return (
          <ImageBackground source={require('../image/icon_weather.jpg')}  style={{width:width,height:height}}>
            <View  style={{marginTop:10,marginLeft:8}}><Header onPress={()=>this.goBack()}></Header></View>  
            <View style={{flex:1,alignItems:'center',width:width,marginTop:50}}>
              <View style={{width:'80%',flex:1}}>
                  <View style={{borderBottomWidth:1,borderColor:'#ddd'}}>
                    <TextInput
                          ref=" textAccVale"
                          autoFocus={true}
                          placeholder="请输入昵称"
                          placeholderTextColor="#ddd"
                          onChangeText={(text) => this.setState({userName:text})}
                          >

                    </TextInput>
                    
                  </View> 
                  <View style={{borderBottomWidth:1,borderColor:'#ddd'}}>
                    <TextInput
                        
                          
                          placeholder="请输入密码"
                          placeholderTextColor="#ddd"
                          secureTextEntry={true}
                          onChangeText={(text) => this.setState({password:text})}
                          >

                    </TextInput>
                    
                  </View> 
                  <View style={{borderBottomWidth:1,borderColor:'#ddd'}}>
                    <TextInput
                          placeholder="请再次输入密码"
                          placeholderTextColor="#ddd"
                          secureTextEntry={true}
                          onChangeText={(text) => this.setState({repeatpwd:text})}
                          >

                    </TextInput>
                    
                  </View> 

                  <View style={{height:48,borderBottomWidth:1,borderColor:'#ddd'}}>
                      <TextInput
                        ref=" textAccVale"
                        
                        placeholder="请输入手机号"
                        placeholderTextColor="#ddd"
                        //  onChangeText={(text) => this.setState({user:text})}   
                      />                       
                  </View>        
                  <View style={{height:48,borderBottomWidth:1,borderColor:'#ddd'}}>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <TextInput
                    
                      placeholder="请输入验证码"
                      placeholderTextColor="#ddd"                    
                      // onChangeText={(pwd) => this.setState({pwd})}
                      />   
                      <TouchableOpacity>
                        <Text style={{color:'#4B85ED',marginRight:8}}>获取验证码</Text>
                      </TouchableOpacity>
                    </View>                                
                  </View>
                  <View style={{marginTop:30}}>
                    <Button title="注册"  onPress={()=>this.goRegisterSuccess()}/>
                  </View>                   
                      
              </View>
            </View>

          </ImageBackground>
          
        );
    
    }

}
