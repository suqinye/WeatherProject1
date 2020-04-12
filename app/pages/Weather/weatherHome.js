//xx天气预报首页
//https://api.heweather.net/s6/weather/now?location=beijing&key=627bb177b1af4abd94de23a35b711f32
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Button} from '../../components/Button';
import Loading from '../../components/Loading';
import { Item } from 'native-base';
import Moment from 'moment';
import weatherData from './weatherData.json';
import WeatherIcon from '../../components/Icon';
import Position from '../City/position';
// import Fetch from '../../API/Fetch';
let weatherJson = weatherData.result;
let actualityData =weatherJson.sk;	//当前实况天气
let todayData = weatherJson.today;
let futureData = weatherJson.future;
let {height, width} = Dimensions.get('window');

let _this = null;

export default class WeatherHome extends Component {
//   static navigationOptions = {
//     header:null
// };
  constructor(props) {
    super(props);
    this.state = {
      loading: true, //是否正在加载,修改这个值
      beanData: null,
      // 正在定位中
      requestLocation: true,
      cityList: [],
      location: '北京市',
      result:weatherData.result,//当前城市天气数据      
     // futureData:''//近五天天气情况
    };
    _this = this;
  }
  componentWillMount() {}

  componentWillUnmount() {}

  componentDidMount() {
    
    // this.getWeatherData();

  }
  //获取当前城市天气数据
   getWeatherData() {
  //    let url = 'http://apis.juhe.cn/simpleWeather/query';//实时
  //    let params= 'city=%E5%8C%97%E4%BA%AC&key=dcf70f81a9ec418d203dab88719049ad';
  let url = 'http://apis.juhe.cn/simpleWeather/query';
  let params = '?city=%E5%8C%97%E4%BA%AC&key=dcf70f81a9ec418d203dab88719049ad';
     url =url+params;
    // let url = 'https://api.heweather.net/s6/weather/forecast?location=beijing&key=627bb177b1af4abd94de23a35b711f32';//预报3-10天
    //hourly逐小时 lifestyle 生活指数
    // if (this.refs.loading) {
    //   this.refs.loading.show();
    // }

    // Fetch.request(url,
    //   ()=>{
    //     console.log('请求发送中...')
    // },
    // (responseData)=>{
    //   console.log('json*********************************')
    //   console.log(responseData);

    //    // this.requestSuccess(responseData);
    // },
    // (error)=>{
    //    // this.requestError(error);
    // })
    fetch(url).then((response) => {
      if (response.ok) {
          return response.json();
      }
  }).then((weatherData) => {
    this.onSuccess(weatherData);
    
     
  }).catch((error) => {
      // this.onFailure(error);
  });
      
  }
  onSuccess(weatherData){
    const aa = weatherData.result;    
    this.setState({
       
      result:aa
    });
    
    console.log('json*********************************');
      console.log(aa);
      console.log('weatherData*********************************');
      console.log(weatherData);
      

  }

  renderCurrentWeather(){

    return(
      <View
      style={{
        flex: 1,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{height:170}}></View>
      <View style={{width:width,flex:1,alignItems:'center'}}>
        <View>
          <Text style={{color: '#fff', fontSize: 40}}>{actualityData.temp}℃</Text>
        </View>
        <View>
          <Text style={{color: '#fff', fontSize: 18}}>{todayData.temperature}</Text>
        </View>

        <View style={{marginTop: 10}}>
          <Text style={{color: '#fff'}}>{todayData.weather} {actualityData.wind_direction} {actualityData.wind_strength!=undefined?actualityData.wind_strength:null}</Text>
        </View>
      </View>
    </View>
    )
  }
  //逐小时
  renderHourly(){
    let cc = [{'hour':'17:00','tmp':'14℃'},{'hour':'18:00','tmp':'14℃'},{'hour':'19:00','tmp':'14℃'},{'hour':'20:00','tmp':'14℃'},{'hour':'21:00','tmp':'14℃'},{'hour':'22:00','tmp':'12℃'},{'hour':'23:00','tmp':'10℃'},{'hour':'00:00','tmp':'10℃'}]
    return(
      cc.map((item,index)=>{
        return(
          <View key={index} style={{margin:10}}>
            <Text style={{color:'#fff'}}>{item.hour}</Text>
            <Image source={require('../../image/icon_rain.png')} style={{width:25,height:25}}></Image>
            <Text style={{color:'#fff'}}>{item.tmp}</Text>
        </View>
      
          )
      })
    )
  }
  //未来天气预测
  renderForecast(){
    
    let bb = [{'date':"4月1日昨天",'tmp':'17℃/12℃'},{'date':"4月2日今天",'tmp':'18℃/14℃'},{'date':"4月3日星期五",'tmp':'16℃/10℃'},{'date':"4月4日星期六",'tmp':'17℃/12℃'},]
    
    return(
      futureData.map((item,index)=>{
        let date = Moment(item.date).format('MM月DD日');
        // let today = Moment(todayData.date_y,'YYYYMMDD').format('YYYYMMDD');
        
        return(
          <View  key={index} style={{flex:1,flexDirection:'row',justifyContent:'space-around',width:width,marginTop:20,marginBottom:20}}>
              <View style={{width:110}}>
                {index==0?<Text style={{color:'#fff'}}>{date}今天</Text> :
               index==1?
               <Text style={{color:'#fff'}}>{date}明天</Text>:
                <Text style={{color:'#fff'}}>{date}{item.week}</Text> }
                       
              </View>
              <View >
                {/* <Image source={require('../../image/icon_rain.png')} style={{width:25,height:25}}></Image> */}
                <WeatherIcon wid={futureData.weather_id} style={{width:25,height:25}}></WeatherIcon>
                <Text>{futureData.weather}</Text>
              </View>
              <View>
              <Text style={{color:'#fff'}}>{item.temperature}</Text>       
              </View>
            </View>
        )
      })
    )
  }
  renderLifestyle(){
    
    return (
     
               
      <View style={{borderTopWidth:1,borderColor:'#ccc',marginTop:20,flexDirection:'row',flex:1,justifyContent:'space-around',flexWrap:'wrap'}}>
        <View style={{margin:10}}>
          <Text style={{color:'#fff',textAlign:'center',padding:10}}>穿衣指数</Text>
          <Text style={{color:'#fff',textAlign:'center',opacity:0.5}}>{todayData.dressing_index||null}</Text>
        </View>
      <View style={{margin:10}}>
        <Text style={{color:'#fff',textAlign:'center',padding:10}}>紫外线强度</Text>
        <Text style={{color:'#fff',textAlign:'center',opacity:0.5}}>{todayData.uv_index||null}</Text>
      </View>
      <View style={{margin:10}}>
        <Text style={{color:'#fff',textAlign:'center',padding:10}}>洗车指数</Text>
        <Text style={{color:'#fff',textAlign:'center',opacity:0.5}}>{todayData.wash_index||null}</Text>
      </View>
      <View style={{margin:10}}>
        <Text style={{color:'#fff',textAlign:'center',padding:10}}>旅游指数</Text>
        <Text style={{color:'#fff',textAlign:'center',opacity:0.5}}>{todayData.travel_index||null}</Text>
      </View>
      <View style={{margin:10}}>
        <Text style={{color:'#fff',textAlign:'center',padding:10}}>晨练指数</Text>
        <Text style={{color:'#fff',textAlign:'center',opacity:0.5}}>{todayData.exercise_index||null}</Text>
      </View>
      <View style={{margin:10}}>
        <Text style={{color:'#fff',textAlign:'center',padding:10}}>干燥指数</Text>
        <Text style={{color:'#fff',textAlign:'center',opacity:0.5}}>{todayData.drying_index||null}</Text>
      </View>
      </View>          
        
     
    )
  }

  //跳到城市管理页面
  goCityMagementPage() {
    this.props.navigation.push('CityHome',{aa:'从weatherhome页面传参'});
  }
  
  render() {
     const {params} = this.props.navigation.state;
    let {location,result}= this.state;
    let todyData = result.future[0];
    //  if(params.city!=undefined){
    //    location = city ;

    //  }else{
    //    location = this.state.location;
    //  }

    return (
      <ImageBackground
        source={require('../../image/icon_weatherHome.jpg')}
        style={{flex: 1, width: width, height: height}}>
        <View
          style={{
           
            alignItems:'center',
            height: 40,            
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => this.goCityMagementPage()}
            style={{flex: 1,marginLeft: 10, flexDirection: 'row', justifyContent: 'center'}}>
            <Image
              source={require('../../image/icon_add.png')}
              style={{width: 15, height: 15, top: 3,right:10}}></Image>
            {/* <Text style={{marginLeft: 10, fontSize: 16, color: '#fff'}}>
              {location}
            </Text> */}
            <Position></Position>
          </TouchableOpacity>
        </View>
        <View>
          <ScrollView style={{marginBottom:50}}>
            {/* 当前天气 */}
           {this.renderCurrentWeather()}
            <View
              style={{
                flex: 1,
                height:height-50,
                // marginTop: 40,
              }}>
              <View style={{width:width,flex:1}}>
                <View style={{width:width,justifyContent:'center',borderTopWidth:1,borderColor:'#ccc'}}>
                  <Text style={{marginTop:20,color:'#fff'}}>逐小时天气</Text>
                  <View style={{flexDirection:'row',flexWrap:'nowrap',justifyContent:'space-around'}}>{this.renderHourly()}</View>
                 
                 
                </View>
                <View style={{width:width,borderTopWidth:1,borderBottomWidth:1,borderColor:'#ccc'}}>
                  <Text style={{marginTop:20,color:'#fff'}}>未来天气</Text>
                  <View style={{marginBottom:20}}>{this.renderForecast()}</View>
                  
                </View>
                <View style={{marginTop:20}}>
                  <Text style={{color:'#fff'}}>生活指数</Text>
                  <View >
                    {this.renderLifestyle()}
                  </View>
                  
                </View>
                
              </View>
            </View>
           
          </ScrollView>
        </View>

        <Loading ref="loading" />
      </ImageBackground>
    );
  }



}
const styles = StyleSheet.create({


})
