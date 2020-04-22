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
  RefreshControl,
} from 'react-native';
import {Button} from '../../components/Button';
import Loading from '../../components/Loading';
import Header from '../../components/Header';
import { Item } from 'native-base';
import Moment from 'moment';
import weatherData from './weatherData.json';
import WeatherIcon from '../../components/Icon';
import DrawerLayout from 'react-native-drawer-layout';
import Position from '../City/position';
let weatherJson = weatherData.result;
let actualityData =weatherJson.sk;	//当前实况天气
let todayData = weatherJson.today;
let futureData = weatherJson.future;
let {height, width} = Dimensions.get('window');

let _this = null;

export default class WeatherHome extends Component {

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
//主页面实况天气
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
            <Image source={require('../../image/icon_rain.png')} style={{width:22,height:22}}></Image>
            <Text style={{color:'#fff'}}>{item.tmp}</Text>
        </View>
      
          )
      })
    )
  }
  //未来天气预测
  renderForecast(){
   
    return(
      futureData.map((item,index)=>{
        let date = Moment(item.date).format('MM月DD日'); 
               
        return(
          <View  key={index} style={{flex:1,flexDirection:'row',justifyContent:'space-around',width:width,marginTop:20,marginBottom:20}}>
              <View style={{width:110}}>
                {index==0?<Text style={{color:'#fff'}}>{date}今天</Text> :
               index==1?
               <Text style={{color:'#fff'}}>{date}明天</Text>:
                <Text style={{color:'#fff'}}>{date}{item.week}</Text> }
                       
              </View>
              <View style={{width:70}}>             
                <WeatherIcon  Value={item.weather} style={{width:20,height:20}}/>
                <Text style={{marginLeft:32,color:'#fff',fontSize:15}}>{item.weather}</Text>
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
     
               
      <View style={{borderTopWidth:0.5,borderColor:'#657089',marginTop:20,flexDirection:'row',flex:1,justifyContent:'space-around',flexWrap:'wrap'}}>
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

  
  render() {
     const {params} = this.props.navigation.state;
    let {location,result}= this.state;
    let todyData = result.future[0];
    const navigationView = (
      <View style={{height:height,width:200,backgroundColor:'rgb(30,30,30)'}}>        
         <View ><Text style={{fontSize:18,color:'#bbb',textAlign:'center',margin:15}}>冷暖天气</Text></View>
         <View style={{justifyContent:'flex-end'}}>
          <TouchableOpacity  onPress={() => this.goCityMagementPage()} 
          style={{height:40,flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#444',marginBottom:2, marginRight:5}}>
            <View><Text style={{fontSize:16,marginLeft:10,color:'#bbb'}}>城市管理</Text></View>
            <Image source={require('../../image/icon_rightBack.png')} style={{width:20,height:15}}></Image>
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => this.goToLoginPage()} 
          style={{height:40,flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#444',marginBottom:2, marginRight:5}}>
            <View><Text style={{fontSize:16,marginLeft:10,color:'#bbb'}}>登录/注册</Text></View>
            <Image source={require('../../image/icon_rightBack.png')} style={{width:20,height:15}}></Image>
          </TouchableOpacity>
         
         </View>
       
      </View>
    );
    return (
      <ImageBackground
        source={require('../../image/icon_weatherImgBG.jpg')}
        style={{flex: 1, width: width, height: height}}>
        <DrawerLayout 
         drawerLockMode={'unlocked'}
         drawerWidth={200}
         ref="drawer"
         drawerPosition={DrawerLayout.positions.Left}
         renderNavigationView = {() => navigationView}        
         >
        <View
          style={{
            alignItems:'center',
            height: 40,            
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
           
           <TouchableOpacity onPress={()=> this.onPenLeftDrawable()}>
             <Image source={require('../../image/icon_menu.png')} style={{width:20,height:20,marginLeft:10}}></Image>
           </TouchableOpacity>
          <TouchableOpacity
           
            style={{flex: 1,marginLeft: 10, flexDirection: 'row', justifyContent: 'center'}}>
            <Image
              source={require('../../image/icon_add.png')}
              style={{width: 15, height: 15, top: 3,right:10}}></Image>            
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
                <View style={{width:width,justifyContent:'center',borderTopWidth:0.5,borderColor:'#657089'}}>
                  <Text style={{marginTop:20,color:'#fff'}}>逐小时天气</Text>
                  <View style={{flexDirection:'row',flexWrap:'nowrap',justifyContent:'space-around'}}>{this.renderHourly()}</View>
                 
                 
                </View>
                <View style={{width:width,borderTopWidth:0.5,borderBottomWidth:0.5,borderColor:'#657089'}}>
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
        </DrawerLayout>

        <Loading ref="loading" />
      </ImageBackground>
    );
  }

//跳到城市管理页面
goCityMagementPage() {
  this.props.navigation.push('CityHome',{aa:'从weatherhome页面传参'});
}
//跳到我的页面
goToLoginPage(){
  this.props.navigation.push('Login');
}
onPenLeftDrawable(){
  this.refs.drawer.openDrawer();
}
onColLeftDrawable(){
  this.refs.drawer.closeDrawer();
}

}

