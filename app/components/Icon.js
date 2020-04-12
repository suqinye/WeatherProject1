
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
      this.state={
        weatherTypesData:''
      }
       
    }
    componentDidMount() {
       // let wid = this.props.wid;
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
      aa(){
        let aa =weatherTypesJson.result;
        let source = require('../image/weatherTypesImg/wid_sunny00.png');
        return(
            <Image source={source}></Image>

        )
      }

    render(){

        
        return(
            <View>
                {/* <Image source={require('../image/guideUp@2x.png')} style={{width:15,height:15}}></Image> */}
                {this.aa()}

            </View>
        )
    }

}