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
          hotCityArray:defaultHotCityArray

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
  


    goBack = () => {
      this.props.navigation.pop();
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
      .then(response=>response.json())
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
  getCitiesListData(){
    //  let url ='http://apis.juhe.cn/simpleWeather/cityList?key=dcf70f81a9ec418d203dab88719049ad';   
    let url = 'https://github.com/suqinye/WeatherProject1/blob/dev/app/pages/City/cities.json';
    console.log("点击了事件");

  //  NetUtil.get(url)
  //             .then(result => {
  //               let aa = JSON.stringify(result);
  //                 _this.setState({
  //                   hotCityArray: aa.result
  //                 },()=>{console.log(this.state.hotCityArray);})
  //             })
  //             .catch(error => {
  //                 _this.setState({
  //                   hotCityArray: JSON.stringify(error)
  //                 })
  //             })
    // fetch(url, {
    //     //请求方式，GET或POST
    //     method: 'GET',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //     }
    // //请求参数，如果有的话，可以这样方式定义,注意需要服务端支持json入参，如果不支持的话，可以尝试下面的方式
    //   //body: JSON.stringify({
    //   //   firstParam: 'value1',
    //   //   secondParam: 'value1',
    //   // }),

    //   //如果服务端不支持json入参，请使用这种拼接方式
    //   //body: 'key1=value1&key2=value2'
    // }).then((response) => response.json()).then(
    //     (responseJson) => {
    //       this.setState({
    //         hotCityArray:responseJson.result
    //       },()=>{console.log(this.state.hotCityArray);})
            
    //     })
    fetch(url).then((response) => {
      if (response.ok) {
          return response.json();
      }
  }).then((weatherData) => {
      this.onSuccess(weatherData);
  }).catch((error) => {
      this.onFailure(error);
  });
    

  }

  onSuccess(weatherData){
    const aa = weatherData.result;
    
    this.setState({
       
      hotCityArray:aa
    });
    // let dataList = [];
    // for (let i = 0; i < aa.length; i++) {
    //     dataList.push(aa);
    // }
   

  }
  onFailure = (error) => {

  };

    hotCitiesList (){
     let {hotCityArray} =this.state;
     console.log(hotCityArray);
     return(
      hotCityArray.map((item,index)=>{
        return (
        
          <View  key={index} style={{width:75,height:25,margin:10,borderRadius:20,borderWidth:1,borderColor:'#ddd',alignItems:'center'}}>
            <Text style={{color:'#eee',fontSize:15}}>{item.city}</Text>
          </View>
            
        );

      })
     )
    }
    render(){

        return (
          <ImageBackground
            source={require('../../image/icon_bgCity.jpg')}
            style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}>
            <LeftBack title='添加城市' onPressBack={()=>this.goBack()}/>  
            <View style={{flex:1}}>

              {this.renderInput()}
              <View><Text style={{color:'#fff',margin:20,fontSize:16}}>热门城市</Text></View>
              <View style={{flex:1,width:'100%',flexWrap:'wrap',flexDirection:'row',justifyContent:'space-around'}}>{this.hotCitiesList()}</View>
              
            </View> 
            <Toast ref="toast"/>   
                 
           
          </ImageBackground>
        );
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