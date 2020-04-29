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
import LeftBack from '../components/LeftBack';
export default class MinePage extends Component{
    constructor(props){
        super(props);
        this.state={
            title:'登录/注册',
            
        }

    }
    componentDidMount(){
        if(this.props.navigation.state.params!=undefined){
            let {userName} = this.props.navigation.state.params;
            this.setState({
                title:userName
                

            })

        }
    }
    goToLogin=()=> {
        // this.props.navigation.goback();
         this.props.navigation.push('Login');       
       };
       //功能未开通页面
    goToEmptyPage=()=>{
        this.props.navigation.push('EmptyPage');
    }
    goBack=()=>{
        this.props.navigation.goBack();
    }

    render(){
        let {title}=this.state;

        return(
            <ImageBackground source={require('../image/icon_weatherImgBG.jpg')} 
            style={{flex:1,width:width12,height:height12}}>
            <LeftBack title='返回' onPressBack={()=>this.goBack()}/> 
              <View style={{flex:1,width:width12,height:height12}}>
                <View style={{marginTop:50}}>
                    <TouchableOpacity style={{flex:1,alignItems:'center',marginTop:20}} onPress={()=>this.goToLogin()}>
                        <View style={{backgroundColor:'#baccED',width:65,height:65,borderRadius:50}}>
                            <Image  source={require('../image/icon_login.png')} style={{width:45,height:45,margin:10}}/>                    
                        </View>
                        <Text style={{color:'#fff',marginTop:10,fontSize:16}}>{title}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1,width:width12,marginTop:135,flexDirection:'row',backgroundColor:'#fff',borderRadius:20}}>                        
                    <View style={{flex:1,justifyContent:'space-around',flexDirection:"row",marginTop:15}}>
                        <TouchableOpacity style={styles.functionBox} onPress={()=>this.goToLogin()}>
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
              </View>

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