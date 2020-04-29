import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  AppRegistry,
  Navigator,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Keyboard,
  Dimensions
} from 'react-native';

import Toast, {DURATION} from 'react-native-easy-toast';
import NetUtil from '../../util/NetUtil';
import LeftBack from '../../components/LeftBack';
import mainStyles from './style';
import SearchInput from './searchCityInput';
import cityData from './cities.json';
import Loading from '../../components/Loading';
let SCREEN_WIDTH = Dimensions.get('window').width; //宽
let SCREEN_HEIGHT = Dimensions.get('window').height; //高

// const dismissKeyboard = require('dismissKeyboard');

let _this= null;

let defaultHotCityArray = [
    {cityCode: "310000", city: "上海市"},
    {cityCode: "440300", city: "深圳市"},
    {cityCode: "110000", city: "北京市"},
    {cityCode: "440100", city: "广州市"},
    {cityCode: "110000", city: "北京市"},
    {cityCode: "440100", city: "广州市"},
    {cityCode: "110000", city: "北京市"},
    {cityCode: "440100", city: "广州市"},
    {cityCode: "110000", city: "北京市"}
    
    
];
let all_Cities_List = cityData.result;


export default class AddCity extends Component {
    constructor(props){
        super(props);
        this.state={
          searchTitle:'',
          searchList: [],
          isChecking:false,
           isediting:false,
           showSearchResult: false,
           allCitiesList:all_Cities_List,
          hotCityArray:[]//热门城市列表

        }
        _this = this;
    }


  componentWillMount () {
    
  }
 
  componentWillUnmount () {
    
  }
  componentDidMount(){
    this.getCitiesListData();
  }

  //获取热门城市列表
  getCitiesListData(){
    let url ='https://search.heweather.net/top?group=cn&key=f3952ac02f9c4e03961fce578e01c830&number=10';   
   // let url = 'https://github.com/suqinye/WeatherProject1/blob/dev/app/pages/City/cities.json';
         
     fetch(url).then((response) => {
       if (response.ok) {
           return response.json();
       }
   }).then((jsonData) => {
     console.log('hotCityArray*****************');
     console.log(jsonData.HeWeather6[0]);
     this.onSuccessCity(jsonData.HeWeather6[0]);    
      
   }).catch((error) => {
     this.refs.toast.show("获取数据失败",1000);
   }); 
  }
  onSuccessCity(hotCityjson){
   const aa = hotCityjson.basic;        
   this.setState({       
     hotCityArray:aa,
         
   }); 

 }
  render(){
    let {hotCityArray}= this.state;
      return (
        <ImageBackground
          source={require('../../image/icon_bgCity.jpg')}
          style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT,flex:1}}>
          <LeftBack title='添加城市' onPressBack={()=>this.goBack()}/>  
          {!hotCityArray? <LoadingBg /> :
            <View style={{flex:1}}>

              {this.renderInput()}
              <View><Text style={{color:'#fff',fontSize:16,margin:15}}>热门城市</Text></View>
              {/* width:50,height:50,flexWrap:'wrap',borderRadius:20,borderWidth:1,borderColor:'#ddd', */}
              <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start',margin:10,flexWrap:'wrap'}}>
                  {this.renderHotCity()} 
              </View>
                        
             
            </View>
          
          }
          
          <Toast ref="toast"/>        
               
         
        </ImageBackground>
      );
  }
    goBack = () => {
      this.props.navigation.pop();
      // this.props.navigation.goBack();
      // this.props.navigation.push('CityHome');
    };
    renderInput() {
      return(
          <SearchInput
              ref="searchInput"
              keyboardType={'default'}
              editable={!this.state.isChecking}
              placeholder={'请输入城市名称'}
              placeholderTextColor={'#999'}
              onChangeText={(text) => this.onChangeText(text)}//输入改变调用的方法
              value={this.state.searchTitle}
              _onDelTextHandle={() => this.deleHandle()}//点击叉号调用的方法
              delOnClick={() => this.checkStaff()}
              whenEndEdit={() => this.whenEndEdit()}
              btnName ={'搜索'}
          />
      )
  }
  onChangeText(text) {
    if(text==''){
      this.setState({
        showSearchResult: false
    })
    }else{
       // 在这里过滤数据结果
       let dataList = this.filterCityData(text);
       this.setState({
        searchTitle: text,
        showSearchResult: true,
        searchList: dataList
    })
    }
    
  }
  filterCityData(text) {
    let rst = [];
    for (let i = 0; i < all_Cities_List.length; i++) {
      let item = all_Cities_List[i];
      if (item.city.includes(text)) {
        rst.push(item);
      }
    }
    return rst;
  }


  deleHandle() {
    this.setState({
        searchTitle: "",
        searchList: [],
    })
  }
   //查询
   checkStaff(){
    // diKeyboard.dismiss;
    //dismissKeyboard();
    if (this.state.isChecking) {
        return
    }

    let {searchTitle} = this.state;
    if (!searchTitle || searchTitle.trim().length == 0) {
      this.refs.toast.show("请输入城市名称");
        return;
    }
    searchTitle = searchTitle.trim()
    this.clearStaff()
    this.getStaffList(searchTitle)
  }
  clearStaff() {
    this.setState({
        searchList: []
    });
  }
  whenEndEdit() {
    if (this.state.searchList.length == 0) {
        this.checkStaff();
    }
  }
  getStaffList(value) {

    // let url ='http://apis.juhe.cn/simpleWeather/cityList?key=dcf70f81a9ec418d203dab88719049ad';
    let url = 'https://github.com/suqinye/WeatherProject1/blob/dev/app/pages/City/cities.json';  
    this.setState({isChecking: true});  
      fetch(url)
      .then((response)=>(response.json()))
      .then(result=>{
        this.setState({
          searchList:JSON.stringify(result),
          isChecking:false
        })
      })
      .catch(error=>{//捕获异常
        this.setState({
          searchList:JSON.stringify(error)
        })
      })
        
      

  }
  
 
  onFailure = (error) => {

  };

    renderHotCity(){
     let {hotCityArray} =_this.state;
     console.log(hotCityArray);
     if(hotCityArray.length==0){
       return null;
       
     }
    return(
      hotCityArray.map((item,index)=>{
         return (
            
          <TouchableOpacity onPress={()=>this.goToWeatherPage(item.location)} key={index} style={{width:90,height:35,margin:10,borderRadius:10,borderWidth:1,borderColor:'#ddd',alignItems:'center'}}>
            <Text style={{color:'#eee',fontSize:15,textAlign:'center',marginTop:5}}>{item.location}</Text> 
          </TouchableOpacity>
                
            );
    
          })
        )
     
    }

    goToWeatherPage(city){
      this.props.navigation.navigate('WeatherHome',{city:city});
    }
    
}

const styles = StyleSheet.create({
  inputDelImg: {
      width: 17,
      height: 17,
      marginLeft: 10,
      marginRight: 10,
      alignItems: 'center',
      justifyContent: 'center'
  },
  inputDelImgNone: {
      width: 0,
      height: 0
  },
});