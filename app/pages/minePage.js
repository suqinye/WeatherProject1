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
import Toast, {DURATION} from 'react-native-easy-toast';
import LeftBack from '../components/LeftBack';
export default class MinePage extends Component{
    constructor(props){
        super(props);
        this.state={
            title:'登录/注册',
            isLogin:false//flase用户表示为登录
            
        }

    }
    componentDidMount(){
        if(this.props.navigation.state.params!=undefined){
            let {userName} = this.props.navigation.state.params;
            this.setState({
                title:userName,
                isLogin:true
            })

        }
    }
    goToLogin=()=> {
        let {isLogin}= this.state;
        // this.props.navigation.goback();
        if(isLogin){
            // this.props.navigation.push('EmptyPage');
            this.props.navigation.push('EmptyPage');
        }else{
            this.props.navigation.push('Login');     
        }
          
       };
       //功能未开通页面
    goToEmptyPage=()=>{
        this.props.navigation.push('EmptyPage');
    }
    goToWeatherPage(){
        this.props.navigation.push('WeatherHome');
    }
    goBack=()=>{
        this.props.navigation.push('WeatherHome');
    }

    render(){
        let {title,isLogin}=this.state;

        return(
            <ImageBackground source={require('../image/icon_weatherImgBG.jpg')} 
            style={{flex:1,width:width12,height:height12}}>
                 <View style={{flex:0.5,flexDirection:'row',justifyContent:'space-between',height:40,marginTop:20}}>
                        <View>
                            <TouchableOpacity onPress={()=>this.goBack()} style={{alignItems: 'center',flexDirection:'row',marginLeft:10}}>
                                <Image
                                source={require('../image/icon_Main.png')}
                                style={{width: 18, height: 18,marginRight:8}}></Image>
                                <Text style={{textAlign: 'center', fontSize: 16, color: '#fff'}}>主页面</Text>                            
                            </TouchableOpacity>
                        </View>
                    </View>                        
                    <View style={{flex:1,alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>this.goToLogin()} >
                            <View style={{backgroundColor:'#baccED',width:65,height:65,borderRadius:50}}>
                                <Image  source={require('../image/icon_login.png')} style={{width:45,height:45,margin:10}}/>                    
                            </View>
                            <View style={{flexDirection:'row'}}><Text style={{color:'#fff',marginTop:10,fontSize:16,textAlign:'center'}}>{title}</Text>
                            {isLogin?<Image  source={require('../image/icon_edit.png')} style={{width:15,height:15,marginLeft:10,marginTop:13}}/>:null}                            
                            </View>                            
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:3,backgroundColor:'#fff',borderRadius:20}}>                        
                            <View style={{flex:1,justifyContent:'space-around',flexDirection:"row",marginTop:15}}>
                                <TouchableOpacity style={styles.functionBox} onPress={()=>this.goToEmptyPage()}>
                                    <Image source={require('../image/icon_choujiang.png')} style={styles.img}></Image>
                                    <Text style={styles.text}>今日抽奖</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.functionBox} onPress={()=>this.goToEmptyPage()}>
                                    <Image source={require('../image/icon_life.png')} style={styles.img}></Image>
                                    <Text style={styles.text}>生活服务</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.functionBox} onPress={()=>this.goToEmptyPage()}>
                                    <Image source={require('../image/icon_VIP.png')} style={styles.img}></Image>
                                    <Text style={styles.text}>会员中心</Text>
                                </TouchableOpacity>
                            </View>
                            
                    </View>
                    <Toast ref="toast"/>
            </ImageBackground>
           
        )
    }

}
const styles = StyleSheet.create({
    text:{
        margin:10,
        fontSize:15
    },
    functionBox:{
        width:80,        
        height:50,
        alignItems:'center',
        
    },
    img:{
        width:20,
        height:20
    }
})