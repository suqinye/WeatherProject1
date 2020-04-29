
import React, {Component} from 'react';
import { 
  Text, 
  View, 
  Image,
  StyleSheet,
   TouchableOpacity} from 'react-native';

  //  import NetUtil from '../util';
  //  import Fetch from  'native-cmos-fetch';
   import weatherTypesJson from '../data/weatherTypes.json';
   export default class WeatherIcon extends Component{
    constructor(props){
      super(props);
      // this.state={
      //   weatherTypesData:'',
      //   wid:''
      // }
       
    }
    componentDidMount() {
     

     //this.getWeatherTypesData();//Weather types获取天气种类
    
      }
      // getWeatherTypesData(){
      //     let url = 'http://apis.juhe.cn/simpleWeather/wids';
      //     let params = '?key=dcf70f81a9ec418d203dab88719049ad';
      //     url = url+params;
      //     NetUtil.get(url)
      //     .then((data) => {
      //         this.setState({
      //             weatherTypesData:data.result
      //         })
              
      //       console.log(data)}) // JSON from `response.json()` call
      //     .catch(error => console.error(error))


      // }
     

    render(){

      let wid = this.props.Value;      
      // let wid = '晴';
      // let aa =weatherTypesJson.result;
      let source = require('../image/weatherTypesImg/wid_cloudy01.png');      
      if(wid =='晴'){
        source = require('../image/weatherTypesImg/wid_sunny00.png');
      }else if(wid =='阴'){
        source = require('../image/weatherTypesImg/wid_yin02.png');
      } else if(wid.indexOf("雨")>-1 && wid.indexOf("雪")==-1){ //下雨
        source = require('../image/weatherTypesImg/wid_rain07.png');
      }else if(wid.indexOf('雨') == -1 && wid.indexOf('雪')>-1){  //下雪
        source = require('../image/weatherTypesImg/wid_snow.png');
      }else if ((wid.indexOf('雨')>-1 && wid.indexOf('雪') > -1)){ //雨夹雪
        source = require('../image/weatherTypesImg/wid_rain_snow.png');
      }
     
      return(
        
          <View style={{flexDirection:'row',flex:1}}>
            <Image  style={{width:22,height:22}} source={source}></Image>
            <View>
              <Text style={{color:'#fff',fontSize:14,marginLeft:20}}>{wid}</Text>
            </View>
          </View>

      )
    }

  }