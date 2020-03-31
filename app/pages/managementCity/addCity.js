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
import LeftBack from '../../components/LeftBack';
import mainStyles from './style';
import SearchInput from './searchCityInput';
import cityData from './cities';
let SCREEN_WIDTH = Dimensions.get('window').width; //宽
let SCREEN_HEIGHT = Dimensions.get('window').height; //高

// const dismissKeyboard = require('dismissKeyboard');


let hotCitys = [];
let defaultHotCityArray = [
    {cityCode: "310000", cityName: "上海市"},
    {cityCode: "440300", cityName: "深圳市"},
    {cityCode: "110000", cityName: "北京市"},
    {cityCode: "440100", cityName: "广州市"},
    {cityCode: "110000", cityName: "北京市"},
    {cityCode: "440100", cityName: "广州市"},
    {cityCode: "110000", cityName: "北京市"},
    {cityCode: "440100", cityName: "广州市"},
    {cityCode: "110000", cityName: "北京市"}
    
    
];

export default class AddCity extends Component {
    constructor(props){
        super(props);
        this.state={
          searchTitle:'',
          searchList: [],
          isChecking:false,
           isediting:false

        }
    }


  componentWillMount () {
    
  }
 
  componentWillUnmount () {
    
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
    this.setState({
        searchTitle: text,
        searchList: []
    })
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
getStaffList(number) {

  // let data = "staffNum=" + number + "&start=0&end=10&optCode=1";
  this.setState({isChecking: true})
  // NetRequestUtil.postJsonPar(Api.classHelper.getPerson, data, (json) => {
     
      let json = cityData;
      this.setState({isChecking: false})
     
          if (json.beans && json.beans.length > 0) {
              this.setState({searchList: json.beans})
          } else {
              this.setState({searchList: []})
              this.refs.toast.show("未查询到该城市",1000)
          }
     
  

}

    hotCitiesList =() =>{
      
     return(
      defaultHotCityArray.map((item,index)=>{
        return (
          // <View style={{margin:10}}>          
           
            
            
          // </View>
          <View  key={index} style={{width:75,height:25,margin:10,borderRadius:20,borderWidth:1,borderColor:'#ddd',alignItems:'center'}}>
            <Text style={{color:'#eee',fontSize:15}}>{item.cityName}</Text>
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