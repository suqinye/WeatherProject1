//xx天气预报首页
import React, {Component} from 'react';
import { View, Text, TextInput, StyleSheet, Image, PixelRatio,ImageBackground,Dimensions,TouchableOpacity } from 'react-native';
import { Button } from '../../components/Button';
import Login from '../login';
import AddCity from '../managementCity/addCity';
let {height,width} =  Dimensions.get('window');


let _this= null;

export default class WeatherHome extends Component{
    constructor(props){
        super(props);
        this.state = {
           
            beanData: null,
            cityName:'昭平县'
        }
        _this = this;
    }
    componentWillMount() {
      
    }

    componentWillUnmount() {
       
    }

    componentDidMount() {
       
    }
    goBack = () => {
       // this.props.navigation.goback();
        this.props.navigation.push('Login');       
      };
    addCity(){
        this.props.navigation.push('AddCity');
       
      }
    render(){
        
        // const {params} = this.props.navigation.state;
        let cityName=this.state.cityName;
        // if(params!=undefined){
            
        // }
        
        return(
            <ImageBackground source={require('../../image/icon_weatherHome.jpg')} style={{ flex: 1,width: width, height: height}}>
                <View style={{marginTop:10,height:20,flex:1,justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity onPress={()=>this.addCity()}>
                        <Image source={require('../../image/icon_add.png')} style={{width:16,height:16}} ></Image>
                    </TouchableOpacity>
                    <View><Text onPress={this.goBack} style={{marginLeft:10,fontSize:15,color:'#ccc'}}>{cityName}</Text></View>

                </View>
                <View style={{height:height-20}}>

                </View>

            </ImageBackground>

            
           
        )

    }
    
}