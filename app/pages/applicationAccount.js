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
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../components/Button';
import LeftBack from '../components/LeftBack';
import Toast, {DURATION} from 'react-native-easy-toast';
import { Value } from 'react-native-reanimated';
import Storage from '../components/storage';
let {height,width} =  Dimensions.get('window');
let blue_eye = require('../image/icon_blue_eye.png');
let grey_eye = require('../image/icon_grey_eye.png');
export default class AppAccount extends Component{
    constructor(props){
        super(props);             
        this.state = {
         aa:'',
          userName:'',//用户名
          password:'',//密码
          isRepeatUser:false,//true表示用户名重复
          isRepeatNum:false,//true表示手机号重复          
          errorLog:"",//错误提示文字
          isRepeatPsd:false,//flase表示输入的两次密码不一样
          checkPsd:false,//是否查看密码
          verCode:'',
          codeText:'',
          content: 'AppAccount',
          storageData:[]
          }

    }
    componentDidMount(){
     this.refreshCode();
     
    }
    //读取本地存储数据
    getStorageData(){      
      let defaultData = [{userName:'admin',password:'123569'}];
      let data = Storage.get('defaultData'); 
      console.log(data);
      if(data!==null){
         return ;
      }else{        
        return defaultData;
      }
    }
    refreshCode(){
      let code = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
      let char = '';
      let result = '';
      for(let i = 0;i<4;i++){
        let code_i = Math.round(Math.random()*61);//随机选择一位  （0,61） 写出0到61的随机的索引数字
         char = code[code_i];  //得到随机的索引  取出随机地字符
         if(result.toUpperCase().indexOf(char.toUpperCase())>-1){
           i--;
           continue;
         }
         result=result+char;
      }
      this.setState({
        verCode:result
      })

    }

    handleCheckUser(value){   
      // let dataArr = this.getStorageData(); 
      // console.log(dataArr);
      // for(let i=0;i<dataArr.length;i++){
      //   if(dataArr[i].userName==value){
      //     this.setState({
      //       isRepeatUser:true,
      //       errorLog:'该用户名已注册'
      //     })  
      //   }else{
      //     dataArr[i].userName = value;
      //     this.setState({userName:value});      
      //   }
      // }
            
      this.setState({
        userName:value        
      })
      
     
    }
   
    //检查两次密码是否一样
    handleCheckPasd(rePsd){
      let {password} = this.state;
      if(password==rePsd){         
        this.setState({         
          isRepeatPsd:true
        })
      }else{
        this.setState({
          errorLog:'两次密码不一样',
          isRepeatPsd:false
        })        
      }
    }
    handleCheckCode(code){
      

    }
     onPressCallback(){
      let {userName,password,storageData,verCode,codeText}=this.state;  
      if(userName==''){        
        this.refs.toast.show("用户名不能为空",1000);
        return;
      }
      if(password==''){
        this.refs.toast.show("密码不能为空",1000)
        return;
      } 
      if(codeText==''){
        this.refs.toast.show("请输入验证码",1000)
      }
      let localData = [{"userName":userName,"password":password}];
      // localData.push({userName:userName,password:password});
      // Storage.set('defaultData',localData);       
      Storage.set('localData',localData); 
      if(verCode==codeText){
        this.props.navigation.push('Login',{user:userName,psd:password});
      }else{
        this.refs.toast.show("验证码错误",1000)
      }
      

    }
    render(){

        // const {params} = this.props.navigation.state;
        // let content=params.content;
        let {verCode,checkPsd} = this.state;
       
        return (
          <ImageBackground source={require('../image/icon_weather.jpg')}  style={{width:width,height:height}}>
            <View  style={{marginTop:10,marginLeft:8}}><LeftBack title='返回' onPress={()=>this.goBack()}></LeftBack></View>  
            <View style={{flex:1,alignItems:'center',width:width,marginTop:50}}>
              <View style={{width:'80%',flex:1}}>
                  <View style={{borderBottomWidth:1,borderColor:'#ddd'}}>
                    <TextInput
                          ref=" textAccVale"
                          autoFocus={true}
                          placeholder="请输入用户名"
                          placeholderTextColor="#ddd"
                          onChangeText={(text)=>this.handleCheckUser(text)}
                          >
                    </TextInput>
                    
                  </View> 
                  <View style={{borderBottomWidth:1,borderColor:'#ddd'}}>
                    <View>
                      <TextInput
                      ref=" textPsd1"    
                      placeholder="请输入密码"
                      placeholderTextColor="#ddd"
                      secureTextEntry={true}
                      onChangeText={(text) => this.setState({password:text}) }
                      >
                      </TextInput> 
                    </View>                   
                  </View> 
                  <View style={{borderBottomWidth:1,borderColor:'#ddd',flexDirection:'row',alignItems:'center'}}>
                    
                    <TextInput
                      ref=" textPsd2"
                      placeholder="请再次输入密码"
                      placeholderTextColor="#ddd"
                      secureTextEntry={true}
                      onChangeText={(text) => this.handleCheckPasd(text)}
                    >
                    </TextInput>   
                    {/* <TouchableOpacity onPress={()=>this.handleClick()}>
                      <Image source={checkPsd?blue_eye:grey_eye} style={{width:25,height:20}}></Image>
                    </TouchableOpacity> */}
                                     
                    { this.state.isRepeatPsd ?null:
                      <View><Text style={{color:'red',fontSize:13}}>{this.state.isRepeatPsd ? null:this.state.errorLog}</Text></View>                    
                    }                    
                  </View>                   
                  <View style={{height:48,borderBottomWidth:1,borderColor:'#ddd'}}>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <TextInput

                      placeholder="请输入验证码"
                      placeholderTextColor="#ddd"                    
                      onChangeText={(text) => this.setState({codeText:text})}
                      />   
                      <LinearGradient start={{x:0,y:4}}  end={{x:1.0,y:1.0}} colors={[ '#cc99dd', '#99ccff','#77ccff']} locations={[0, 0.5, 0.6]}>
                        <View style={{width:100,height:45}}>
                          <Text style={{color:'#4B85ED',fontSize:23,textAlign:'center',paddingTop:5}}>{verCode}</Text>
                        </View>
                      </LinearGradient>
                      
                     
                    </View>                                
                  </View>
                  <View style={{marginTop:30}}>
                    <Button title="注册"  onPressLogin={()=>this.onPressCallback()}/>
                  </View>                   
                      
              </View>
            </View>
            <Toast ref="toast"/>
          </ImageBackground>
          
        );
    
    }
    // handleClick(){
    //   let {checkPsd}= this.state;
    //   if(checkPsd==true){
    //     this.refs.textPsd2.secureTextEntry=false
    //   }
    //   this.setState({
    //     checkPsd:!checkPsd
    //   })

    // }
    goBack = () => {
      this.props.navigation.goBack();
      
    };
    
   

}
