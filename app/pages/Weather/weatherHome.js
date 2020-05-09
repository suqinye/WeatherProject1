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
  ToastAndroid,
   Platform,
   FlatList,
   PermissionsAndroid,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import Geolocation from 'react-native-geolocation-service';
import {Button} from '../../components/Button';
import Loading from '../../components/Loading';
import LoadingBg from '../../components/LoadingBg';
import Storage from '../../components/storage'
import { Item } from 'native-base';
import Moment from 'moment';
import NetUtil from '../../util/NetUtil';
import weatherData from './weatherData.json';
import WeatherIcon from '../../components/Icon';
import DrawerLayout from 'react-native-drawer-layout';
let weatherJson = weatherData.result;

let todayData = weatherJson.today;
let futureData = weatherJson.future;
let {height, width} = Dimensions.get('window');
let _this = null;
export default class WeatherHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true, //是否正在加载,修改这个值
      isRefreshing: false,//是否手动下拉刷新      
      initialPosition: 'Unknow',//初始位置
      location:'Unknow',
      longitude:'',//经度
      latitude:'',//维度
      city: '',
      district: '正在定位',   
      basic:'',//当前城市基本数据 
      nowData:'',
      currtTime:'',  
      hourlyDataList:[],//逐小时预报数据
      forecastDataList:[],//未来天气预报数据
      lifestyleData:[],//生活指数
      futureData:'',//近五天天气情况
      manage_CityInfor: []
    };
    _this = this;
    
  }

  

async componentDidMount() {    
  // if (this.refs.loading) {this.refs.loading.show();}
  this.getCurrtDate(); 
  if(this.props.navigation.state.params!=undefined){ 

    let {city} = this.props.navigation.state.params;   
    if(city!=undefined){
      this.getAdressInfor();
      this.setState({              
        district:city        
    })
      this.getWeatherDataNow(city);//获取实况天气
      this.getWeatherDataHourly(city);//获取小时天气
      this.getWeatherDataForecast(city);//获取未来10天天气
      this.getWeatherDataLifestyle(city);//获取生活指数

    }
    
  }else{

    if(Platform.OS == 'ios'){
      _this.getPosition();
   }else{        
      const hasLocationPermission =await  PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION )
      if (hasLocationPermission) { 
          const granteds = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );           
          if(granteds === PermissionsAndroid.RESULTS.GRANTED){
          _this.getPosition()
          }
      }else {            
          this.refs.toast.show('定位权限被禁止',1000)
      }
    }
     this.getAdressInfor();
  //  this.getWeatherNowBean();
  }
}
 
getCurrtDate(){
  let currtDate = new Date();
  let hours = currtDate.getHours() ;
  let minute =currtDate.getMinutes() ;   
  if (hours< 10) hours = "0"+hours;
  if (minute< 10) minute = "0" +minute;
  let  updateTime = hours+':'+minute;
   this.setState({
    currtTime:updateTime
   })
}
getAdressInfor(){
  // Storage.remove('manage_CityInfor');
  Storage.get('manage_CityInfor').then((tags)=>{
    console.log("+++++++++++++");
    console.log(tags);
    if(tags!=undefined||tags!=null){
      this.setState({
        manage_CityInfor:tags
      })
    }
  })
}
  //获取当前位置
  getPosition=()=>{   
    
    return new Promise((resolve,reject)=>{
      //获取当前位置
      Geolocation.getCurrentPosition(
          (position)=>{
              console.log(position);
              let initialPosition = JSON.stringify(position.coords);
              let longitude = JSON.stringify(position.coords.longitude);
              let latitude = JSON.stringify(position.coords.latitude);
              this.setState({
                  initialPosition:initialPosition,
                  longitude:longitude,//经度
                  latitude:latitude//纬度

              },this.getLocation(longitude,latitude));  
          },
          (error) => {
              reject(error);
              if (_this.refs.loading) { _this.refs.loading.hide(); }
              this.setState({isRefreshing: false});
              if(error.code==2){
                  ToastAndroid.show('定位失败，请查看手机是否开启GPS定位服务',ToastAndroid.SHORT);
              }else if(error.code==3){
                  ToastAndroid.show("定位超时，请尝试重新获取定位",ToastAndroid.SHORT);
              }else{
                  ToastAndroid.show("定位失败："+error.message,ToastAndroid.SHORT);
              }
          }, {
              enableHighAccuracy: true,
              timeout: 15000,
              maximumAge: 10000
          }
      );
    })
  }

  getLocation(log,lat){

    
    // 坐标转换 
    NetUtil.get(`https://restapi.amap.com/v3/assistant/coordinate/convert?locations=${log},${lat}&coordsys=gps&output=json&key=b1ea7e718756c25b175b2a948d9f3505`)
    // fetch('https://restapi.amap.com/v3/assistant/coordinate/convert?locations=116.480656,39.989677&coordsys=gps&output=json&key=fc996d54d790c198851bd79018f10d7a', { method: "GET" })
    .then((jsonDa) => { 
      console.log(jsonDa);
       _this.getLocationSuccess(jsonDa);       
    })
    .catch(error => {
      console.log(error);
      this.setState({isRefreshing: false});
      if (_this.refs.loading) { _this.refs.loading.hide(); }
      this.refs.toast.show("获取数据失败",1000);
    });
}
  getLocationSuccess=(jsonDa)=>{
    if(jsonDa.status=='0'){//请求失败
      this.refs.toast.show("请求数据失败",1000);
    }else{
      let newVar = jsonDa.locations.split(',')
      this.setState({
          longitude: newVar[0],//经度
          latitude: newVar[1],//纬度
      },()=>{
          //通过调用高德地图逆地理接口，传入经纬度获取位置信息
        //访问网络开始  逆地理编码api服务地址
      NetUtil.get('https://restapi.amap.com/v3/geocode/regeo?key=b1ea7e718756c25b175b2a948d9f3505'+'&location='+_this.state.longitude+','+_this.state.latitude+'&radius=1000&extensions=all&batch=false&roadlevel=0')
        .then((jsonData) => { 
          if(jsonDa.status=='1'){
            let aa = jsonData.regeocode.addressComponent;
            let city =aa.city;
            let district =aa.district;            
            this.setState({
                district:district,
                city:city
                
            },()=>{
              this.getWeatherDataNow(district);//获取实况天气
              this.getWeatherDataHourly(district);//获取小时天气
              this.getWeatherDataForecast(district);//获取未来10天天气
              this.getWeatherDataLifestyle(district);//获取生活指数
    
            });                               
              console.log(this.state.district);

          }else{
            this.refs.toast.show("请求数据失败",1000);
          }
        })
      .catch((error) => {      
        if (_this.refs.loading) { _this.refs.loading.hide(); }
        this.refs.toast.show("获取数据失败",1000);
        this.setState({isRefreshing: false}); 
      });
      });
    }
   
  }
  //获取当前城市now天气数据
   getWeatherDataNow(city) {
  //    let url = 'http://apis.juhe.cn/simpleWeather/query';//实时
  //    let params= 'city=%E5%8C%97%E4%BA%AC&key=dcf70f81a9ec418d203dab88719049ad';  
  // city = encodeURI(city, "utf-8");
  console.log(city);
  let url = 'https://api.heweather.net/s6/weather/now?key=f3952ac02f9c4e03961fce578e01c830&location='+city;       
    fetch(url).then((response) => {
      if (response.ok) {
          return response.json();
      }
  }).then((jsonData) => {
    console.log('now*****************');
    console.log(jsonData.HeWeather6[0]);
    if (_this.refs.loading) { _this.refs.loading.hide(); }
    this.onSuccessNow(jsonData.HeWeather6[0]);    
     
  }).catch((error) => {
    if (_this.refs.loading) { _this.refs.loading.hide(); }
    this.refs.toast.show("获取数据失败",1000);
    this.setState({isRefreshing: false});
  });      
  }
  //请求数据成功
  onSuccessNow(weatherData){
    let data = weatherData.status;
    if(data!='ok'){
      this.refs.toast.show("请求天气数据失败",5000);
    }else{
      this.aaaa(weatherData.now);   
           
      this.setState({       
        basic:weatherData.basic,
        nowData:weatherData.now,      
        isRefreshing: false     
      });   
    }     
  }
  //保存已查询过的城市信息
  aaaa(data){ 
    let{ manage_CityInfor,district} = _this.state;
    let tmp =data.tmp;
    let cond_txt =data.cond_txt;
    if(manage_CityInfor.length==0){      
      manage_CityInfor.push({"location":district,"tmp":tmp,"cond_txt":cond_txt});  
      Storage.set('manage_CityInfor',manage_CityInfor)
      this.setState({
        manage_CityInfor
      })
    }else{
    for(let i = 0;i<manage_CityInfor.length;i++){
      let item = manage_CityInfor[i];
      if(item.location.includes(district)){      
        return;      
      }      
    }    
    manage_CityInfor.push({"location":district,"tmp":tmp,"cond_txt":cond_txt});                    
    Storage.set('manage_CityInfor',manage_CityInfor);
    this.setState({
        manage_CityInfor
    })
    }  
  }
   //获取当前城市hourly逐小时预报数据
   getWeatherDataHourly(city){
    console.log(city);
    let url = 'https://api.heweather.net/s6/weather/hourly?key=f3952ac02f9c4e03961fce578e01c830&location='+city;       
      fetch(url).then((response) => {
        if (response.ok) {
            return response.json();
        }
    }).then((jsonData) => {
      console.log('hourly逐小时*****************');
      console.log(jsonData.HeWeather6[0]);
      if (_this.refs.loading) { _this.refs.loading.hide(); }
      this.onSuccessHourly(jsonData.HeWeather6[0]);    
       
    }).catch((error) => {
      if (_this.refs.loading) { _this.refs.loading.hide(); }
      this.refs.toast.show("获取数据失败",1000);
      this.setState({isRefreshing: false});
    }); 
   }
   onSuccessHourly(hourlyJaon){
    let data = hourlyJaon.status;
    if(data!='ok'){
      this.refs.toast.show("请求逐小时数据失败",5000);
      
    }else{
      const aa = hourlyJaon.hourly;        
      this.setState({       
        hourlyDataList:aa,
        isRefreshing: false
            
      }); 
    }
    
   }
   //获取当前城市forecast(3-10天预报)天气数据
   getWeatherDataForecast(city){
    console.log(city);
    let url = 'https://api.heweather.net/s6/weather//forecast?key=f3952ac02f9c4e03961fce578e01c830&location='+city;       
      fetch(url).then((response) => {
        if (response.ok) {
            return response.json();
        }
    }).then((jsonData) => {
      console.log('forecast预报*****************');
      console.log(jsonData);
      if (_this.refs.loading) { _this.refs.loading.hide(); }
      this.onSuccessForecast(jsonData.HeWeather6[0]);    
       
    }).catch((error) => {
      if (_this.refs.loading) { _this.refs.loading.hide(); }
      this.refs.toast.show("获取数据失败",1000);
      this.setState({isRefreshing: false});
    }); 
   
   }
   onSuccessForecast(forecastData){
     let data = forecastData.status;
    if(data!='ok'){
      this.refs.toast.show("请求未来天气数据失败",5000);
      
    }else{
      const aa = forecastData.daily_forecast;        
      this.setState({       
        forecastDataList:aa,
        isRefreshing: false
            
      }); 
    }
    

   }
    //获取当前城市lifestyle生活指数
    getWeatherDataLifestyle(city){
      console.log(city);
      let url = 'https://api.heweather.net/s6/weather/lifestyle?key=f3952ac02f9c4e03961fce578e01c830&location='+city;       
        fetch(url).then((response) => {
          if (response.ok) {
              return response.json();
          }
      }).then((jsonData) => {
        console.log('lifestyle生活指数t*****************');
        console.log(jsonData);
        if (_this.refs.loading) { _this.refs.loading.hide(); }
        this.onSuccessLifestyle(jsonData.HeWeather6[0]);    
         
      }).catch((error) => {
        if (_this.refs.loading) { _this.refs.loading.hide(); }
        this.refs.toast.show("获取数据失败",1000);
        this.setState({isRefreshing: false});
      });      
         
     }  
      onSuccessLifestyle(lifestyleData){
        let data = lifestyleData.status;
        if (data!='ok'){
          this.refs.toast.show("请求生活指数数据失败",5000);         
        }else{
          let lifestyle = lifestyleData.lifestyle
          this.setState({
            lifestyleData:lifestyle,
            isRefreshing: false
          })

        }
       

      }
  
  render() {
    const {params} = this.props.navigation.state;
    let {location,basic,nowData,currtTime}= this.state;   
                       
  
    const navigationView = (
     <View style={{height:height,width:200,backgroundColor:'rgb(30,30,30)'}}>        
        <View ><Text style={{fontSize:18,color:'#bbb',textAlign:'center',margin:15}}>冷暖天气</Text></View>
        <View style={{justifyContent:'flex-end'}}>
         <TouchableOpacity  onPress={() => this.goCityMagementPage()} 
         style={{height:40,flexDirection:'row',justifyContent:'space-between',alignItems:'center',backgroundColor:'#444',marginBottom:2, marginRight:5}}>
           <View><Text style={{fontSize:16,marginLeft:10,color:'#bbb'}}>城市管理</Text></View>
           <Image source={require('../../image/icon_rightBack.png')} style={{width:20,height:15}}></Image>
         </TouchableOpacity>
         <TouchableOpacity  onPress={() => this.goTMinePage()} 
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
         {/* {!nowData?<LoadingBg ref="LoadingBg" />: */}
          <DrawerLayout 
          drawerLockMode={'unlocked'}
          drawerWidth={200}
          ref="drawer"
          drawerPosition={DrawerLayout.positions.Left}
          renderNavigationView = {() => navigationView}        
          >
           <ScrollView style={{marginBottom:30}}  refreshControl={this.getRefreshControl()}>
            <View style={{flex:1, alignItems:'center', height: 40,flexDirection: 'row'}}>            
              <View style={{flex:1, alignItems:'center', height: 40,flexDirection: 'row',justifyContent:'space-between' }}>
                <TouchableOpacity onPress={()=> this.onPenLeftDrawable()}>
                  <Image source={require('../../image/icon_menu.png')} style={{width:20,height:20,marginLeft:10}}></Image>
                </TouchableOpacity>  
              </View> 
              <View style={{flex:1,flexDirection:'row',justifyContent:'center'}}>
                 <View style={{marginRight:5}}>
                   <Text style={{ fontSize: 16, color: '#fff',textAlign:'center'}}>{_this.state.district}</Text>
                </View>
                <Image source={require('../../image/icon_location.png')} style={{marginTop:6,marginLeft:5,width:12,height:12}}/>                
              </View> 
              <View style={{flex:1}}>
                <Text style={{color:'#DDD',fontSize:12,marginLeft:20}}>更新时间: {currtTime}</Text>
              </View>             
            </View>  
            {/* 当前天气 */}
            {this.renderCurrentWeather(nowData)}
            <View  style={{ flex: 1}}>
              <View style={{width:width,flex:1}}>
                <View style={{width:width,justifyContent:'center',borderTopWidth:0.5,borderColor:'#657089'}}>
                  {/* <Text style={{marginTop:10,marginLeft:10,color:'#fff'}}>逐小时天气</Text> */}
                  <View style={{flexDirection:'row',flexWrap:'nowrap',justifyContent:'space-around'}}>{this.renderHourly()}</View>
                </View>
                <View style={{width:width,borderTopWidth:0.5,borderBottomWidth:0.5,borderColor:'#657089'}}>
                  {/* <Text style={{marginTop:20,marginLeft:10,color:'#fff'}}>未来天气</Text> */}
                  <View style={{marginBottom:10}}>{this.renderForecast()}</View>                  
                </View>
                <View style={{marginTop:20}}>
                  {/* <Text style={{color:'#fff',marginLeft:10,}}>生活指数</Text> */}
                  <View >
                    {this.renderLifestyle()}
                  </View>                  
                </View>                
              </View>
            </View>           
          </ScrollView>          
         </DrawerLayout>
        {/* } */}
       <Loading ref="loading"/>
       <Toast ref="toast"/>
       
     </ImageBackground>
   );
 }


//主页面实况天气
  renderCurrentWeather(nowData){
    // if(nowData==undefined){
    //   return [];
    // }
    let tmp = nowData.tmp?nowData.tmp+'℃':null;
    let wind_sc =nowData.wind_sc?nowData.wind_sc+'级':null;
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
          <Text style={{color: '#fff', fontSize: 40}}>{tmp}</Text>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={{color: '#fff'}}>{nowData.cond_txt!=undefined?nowData.cond_txt:null} {nowData.wind_dir!=undefined?nowData.wind_dir:null} {wind_sc!=undefined?wind_sc:null}</Text>
        </View>
      </View>
    </View>
    )
  }
  //逐小时
  renderHourly(){
    let {hourlyDataList}= this.state;
    if(hourlyDataList.length==0){
      return null
    }
    return(
      <View>
        <FlatList
          data={hourlyDataList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index })=>this.renderTopicItem(item,index)}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
            />
      </View>
    )
    
  }
  renderTopicItem(item,i){ 
    
    let date=(item.time).substr(11, 16).replace(/-/g, "");
    // let date = Moment(item.time).format('hh:mm');    
    let timeArr = [];
    
    let wid = item.cond_txt;
    let source = require('../../image/weatherTypesImg/wid_cloudy01.png');      
      if(wid =='晴'){
        source = require('../../image/weatherTypesImg/wid_sunny00.png');
      }else if(wid =='阴'){
        source = require('../../image/weatherTypesImg/wid_yin02.png');
      } else if(wid.indexOf("雨")>-1 && wid.indexOf("雪")==-1){ //下雨
        source = require('../../image/weatherTypesImg/wid_rain07.png');
      }else if(wid.indexOf('雨') == -1 && wid.indexOf('雪')>-1){  //下雪
        source = require('../../image/weatherTypesImg/wid_snow.png');
      }else if ((wid.indexOf('雨')>-1 && wid.indexOf('雪') > -1)){ //雨夹雪
        source = require('../../image/weatherTypesImg/wid_rain_snow.png');
      } 
      return( 
        <View style={{marginTop:15,marginBottom:15,marginLeft:10,marginRight:10,flex:1,width:50,justifyContent:'space-around',alignContent:'center'}}>
          <Text style={{color:'#fff',textAlign:'center'}}>{date}</Text>
          <Image source={source} style={{width:22,height:22,marginTop:10,marginBottom:10,marginLeft:14}}></Image>
          <Text style={{color:'#fff',textAlign:'center'}}>{item.tmp}℃</Text>
        </View>
      )
  }
  //未来天气预测
  renderForecast(){
   
    let {forecastDataList} = this.state;   
    if(forecastDataList.length==0){
      return null
    }
    return(
      forecastDataList.map((item,index)=>{
        let date = Moment(item.date,'YYYY-MM-DD').format('MM月DD日'); 
        let week = Moment(item.date).format('d');
        if(week==0){
          week = '星期天'
        }
        if(week==1){
          week = '星期一'
        }
        if(week==2){
          week = '星期二'
        }
        if(week==3){
          week = '星期三'
        }
        if(week==4){
          week = '星期四'
        }
        if(week==5){
          week = '星期五'
        }
        if(week==6){
          week = '星期六'
        }               
        return(
          <View  key={index} style={{flex:1,flexDirection:'row',justifyContent:'space-around',width:width,marginTop:20}}>
              <View style={{width:130}}>
                {index==0?<Text style={{color:'#fff'}}>{date}今天</Text> :
                  index==1?
                <Text style={{color:'#fff'}}>{date}明天</Text>:
                <Text style={{color:'#fff'}}>{date} {week}</Text> }                       
              </View>                           
              <View  style={{width:80}}>
                <WeatherIcon  Value={item.cond_txt_d}/>
              </View>
              <View>
                <Text style={{color:'#fff'}}>{item.tmp_max}℃/{item.tmp_min}℃</Text>       
              </View>
            </View>
        )
      })
    )
  }
  renderLifestyle(){
    let {lifestyleData} = this.state; 
    if(lifestyleData.length==0){
      return null
    } 
    let lifestyList=[];
    for(let i=0;i<5;i++){
      lifestyList.push(lifestyleData[i]);

    }
    return lifestyList.map((item,index)=>{      
      let types = item.type;
      let typeText;
      if(types=='comf'){typeText='舒适度指数'}
      if(types=='drsg'){typeText='穿衣指数'}
      if(types=='cw'){typeText='洗车指数'}
      if(types=='flu'){typeText='感冒指数'}
      if(types=='sport'){typeText='运动指数'}
      if(types=='trav'){typeText='旅游指数'}
      if(types=='uv'){typeText='紫外线指数'}
      if(types=='air'){typeText='空气污染扩散条件指数'}
      if(types=='ac'){typeText='空调开启指数'}
      if(types=='ag'){typeText='过敏指数'}
      if(types=='gl'){typeText='太阳镜指数'}
      if(types=='mu'){typeText='化妆指数'}
      if(types=='airc'){typeText='晾晒指数'}
      if(types=='pdfc'){typeText='交通指数'}
      if(types=='fsh'){typeText='钓鱼指数'}
      if(types=='spi'){typeText='防晒指数'}
      return(
        <View key={index} style={{borderColor:'#657089',marginTop:20,flex:1,justifyContent:'center',flexDirection:'row'}}>
          <View style={{margin:10,borderColor:'#ddd',borderWidth:1,borderRadius:10,paddingTop:5,paddingLeft:10,paddingRight:10,paddingBottom:5}}>
            <Text style={{color:'#fff',textAlign:'center',fontSize:14}}>{typeText}</Text>
            <Text style={{color:'#fff',textAlign:'center',fontSize:13}}>{item.brf}</Text>
            <Text style={{color:'#ddd',opacity:0.5,fontSize:12}}>{item.txt}</Text>
          </View>
        </View>
      )
    })
    // 
  }

 

  
  //下拉刷新
 getRefreshControl(){
   return (
     <RefreshControl
       refreshing={this.state.isRefreshing}
       onRefresh={this._onRefresh.bind(this)}
       tintColor="gray"
       title="加载中..."
       titleColor="gray"
       colors={['#0095e9']}
       progressBackgroundColor="#ffffff"
     />
   );

  

  }
  _onRefresh(){
    let city =this.state.district;
    this.setState({
      isRefreshing: true,
    });

    this.getWeatherDataNow(city);//获取实况天气
    this.getWeatherDataHourly(city);//获取小时天气
    this.getWeatherDataForecast(city);//获取未来10天天气
    this.getWeatherDataLifestyle(city);//获取生活指数
    _this.getCurrtDate();
  }
//跳到城市管理页面
goCityMagementPage() {
  this.props.navigation.push('CityHome',{aa:'从weatherhome页面传参'});
}
//跳到我的页面
goTMinePage(){
  this.props.navigation.push('MinePage');
}
onPenLeftDrawable(){
  this.refs.drawer.openDrawer();
}
onColLeftDrawable(){
  this.refs.drawer.closeDrawer();
}

    
  // getWeatherNowBean(){
      //   Storage.get('weatherNowBean').then((tags)=>{
      //     if(tags!=undefined){
      //       console.log("+++++++++++++"+tags);
      //       // let time = tags.update;
      //       // time = (time.loc).substr(11, 16).replace(/-/g, ""); 
      //     this.setState({
      //       nowData:tags.now,
      //     })
      //     }else{
      //       return null;
      //     }
      //   })

      // }
      

}

