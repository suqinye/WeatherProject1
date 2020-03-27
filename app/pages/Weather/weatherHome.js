//xx天气预报首页
//https://api.heweather.net/s6/weather/now?location=beijing&key=627bb177b1af4abd94de23a35b711f32
import React, {Component} from 'react';
import { View, Text, TextInput, StyleSheet, Image, PixelRatio,ImageBackground,Dimensions,TouchableOpacity } from 'react-native';
import { Button } from '../../components/Button';
import Loading from '../../components/Loading';
import Login from '../login';
import AddCity from '../managementCity/addCity';
import fetchWeather from '../../API/API';
let {height,width} =  Dimensions.get('window');


let _this= null;

export default class WeatherHome extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,//是否正在加载,修改这个值
            beanData: null,
            location:'昭平县'
        }
        _this = this;
    }
    componentWillMount() {
      
    }

    componentWillUnmount() {
       
    }

    componentDidMount() {
       
    }
//获取天气数据
    getWeatherData(){
        if (this.refs.loading) {
            this.refs.loading.show();
        }


    }

    goBack = () => {
       // this.props.navigation.goback();
        this.props.navigation.push('Login');       
      };
      //跳到城市管理页面
      goCityMagementPage(){
        this.props.navigation.push('CityHome'); 
      }
    
      
    render(){
        
        // const {params} = this.props.navigation.state;
        let location=this.state.location;
        // if(params!=undefined){
            
        // }
        
        return(
            <ImageBackground source={require('../../image/icon_weatherHome.jpg')} style={{ flex: 1,width: width, height: height}}>
                <View style={{marginTop:10,height:20,flex:1,justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>this.goCityMagementPage()}>
                        <Image source={require('../../image/icon_add.png')} style={{width:16,height:16}} ></Image>
                    </TouchableOpacity>
                    <View><Text onPress={this.goBack} style={{marginLeft:10,fontSize:15,color:'#ccc'}}>{location}</Text></View>

                </View>
                <View style={{height:height-20}}>

                </View>
                <Loading ref="loading" />

            </ImageBackground>

            
           
        )

    }
    
}