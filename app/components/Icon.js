
import React, {Component} from 'react';
import { 
  Text, 
  View, 
  Image,
  StyleSheet,
   TouchableOpacity} from 'react-native';
   import weatherTypesJson from '../data/weatherTypes.json';
   export default class WeatherIcon extends Component{
    constructor(props){
      super(props);      
    }
    componentDidMount() {  }
    render(){
      let wid = this.props.Value; 
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