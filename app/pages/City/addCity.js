//添加城市页面
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
  FlatList,
  Dimensions
} from 'react-native';

import Toast, {DURATION} from 'react-native-easy-toast';
import NetUtil from '../../util/NetUtil';
import LeftBack from '../../components/LeftBack';
import mainStyles from './style';
import SearchInput from './searchCityInput';
import cityData from './cities.json';
import LoadingBg from '../../components/LoadingBg';
import Storage from '../../components/storage';
let SCREEN_WIDTH = Dimensions.get('window').width; //宽
let SCREEN_HEIGHT = Dimensions.get('window').height; //高

// const dismissKeyboard = require('dismissKeyboard');

let _this= null;
let all_Cities_List = cityData.result;


export default class AddCity extends Component {
    constructor(props){
        super(props);
        this.state={
          searchTitle:'',//输入的值
          searchList: [],//搜索到的城市信息列表
          isChecking:false,//是否可以编辑
           showSearchResult: false,//是否显示搜索到的城市信息列表
           allCitiesList:all_Cities_List,
          hotCityArray:[],//热门城市列表
          

        }
        _this = this;
    }


 
  componentDidMount(){
    this.getCitiesListData();
  }

  //获取热门城市列表
  getCitiesListData(){
    let url ='https://search.heweather.net/top?group=cn&key=f3952ac02f9c4e03961fce578e01c830&number=18';   
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
     this.refs.toast.show("获取热门城市失败",1000);
   }); 
  }
  onSuccessCity(hotCityjson){
    let data = hotCityjson.status;
    if(data!='ok'){
      this.refs.toast.show("获取热门城市失败！",5000);      
    }else{
      const aa = hotCityjson.basic;        
      this.setState({       
      hotCityArray:aa,
          
      }); 
    }   
 }
  render(){
    let {hotCityArray,showSearchResult}= this.state;
      return (
        <ImageBackground
          source={require('../../image/icon_bgCity.jpg')}
          style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT,flex:1}}>
          <LeftBack title='添加城市' onPressBack={()=>this.goBack()}/>  
          {/* {!hotCityArray? <LoadingBg/> :
           
          }           */}
          <View >
            {this.renderInput()}             
            { showSearchResult?
            <View style={{flexDirection:'row',justifyContent:'center',margin:15}}>{this.renderListCIity()}</View>  
            :                
              <View style={{flex:1}}>
                <Text style={{color:'#fff',fontSize:16,margin:15}}>热门城市</Text>
                <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'flex-start',margin:15}}>{this.renderHotCity()}</View>            
              </View>
            }   
            </View>           
          <Toast ref="toast"/>         
        </ImageBackground>
      );
  }
  renderListCIity(){
    let {searchList} = this.state;
    console.log('render搜索列表');
    console.log(searchList)
        return (
          <FlatList
          data={searchList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index })=>this.renderTopicItem(item,index)}                    
          showsHorizontalScrollIndicator={false}
          // ItemSeparatorComponent={()=>this.sepa()}//item间隔
          // ListFooterComponent={()=><View style={{height:1,backgroundColor:'#fff'}}></View>}//底部间隔
        />
        )

  }
  sepa() {
    return (<View style={{height:1,backgroundColor:'#FFF'}}></View>)
}
  renderTopicItem(rowData, sectionID, rowID) {    
   
    return(
        <View style={{marginTop:10,paddingBottom:10,flexDirection:'row',borderBottomWidth:1,borderColor:'#fff'}}>         
          <TouchableOpacity onPress={()=>this.goToWeatherPage(rowData.parent_city)} >
            <Text style={{fontSize:16, color: '#fff', marginTop: 5,paddingLeft:10}} >{rowData.location},{rowData.parent_city},{rowData.admin_area},{rowData.cnty}</Text> 
          </TouchableOpacity>         
        </View>
    )
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
    console.log("调用了onChangeText");
    this.checkStaff(text);  
    this.setState({
      searchTitle: text,
      searchList: [],
      showSearchResult: true
     })
 
    // if(text==''){
    //   this.setState({
    //     showSearchResult: false
    // })
    // }else{
      
    //    在这里过滤数据结果
    //    let dataList = this.filterCityData(text);
    //    this.setState({
    //     searchTitle: text,
    //     showSearchResult: true,
    //     searchList: dataList
    // })
    // }
    
  }
  // filterCityData(text) {
  //   console.log("调用了filterCityData");
  //   let rst = [];
  //   for (let i = 0; i < all_Cities_List.length; i++) {
  //     let item = all_Cities_List[i];
  //     if (item.parent_city.includes(text)) {
  //       rst.push(item);
  //     }
  //   }
  //   return rst;
  // }


  deleHandle() {
    console.log("调用了deleHandle");
    this.setState({
        searchTitle: "",
        searchList: [],
        showSearchResult:false
    })
  }
  whenEndEdit() {
    console.log("调用了whenEndEdit");
      if (this.state.searchList.length == 0) {
          this.checkStaff();
      }
  }
    //查询
  checkStaff(text){
    // diKeyboard.dismiss;
    //dismissKeyboard();
    console.log("调用了checkStaff");
    if (this.state.isChecking) {
        return
    }
    if(text==undefined){
      text = this.state.searchTitle;
    }   
    if (!text || text.trim().length == 0) {
      this.refs.toast.show("请输入城市名称");
        return;
    }
    text = text.trim()
    // this.clearStaff()
    this.getStaffList(text)
  }
  clearStaff() {
    console.log("调用了clearStaff");
    this.setState({
        searchList: []
    });
  }
  
  //搜索城市接口
  getStaffList(value) {   
    console.log("调用了 getStaffList");
    // let url ='http://apis.juhe.cn/simpleWeather/cityList?key=dcf70f81a9ec418d203dab88719049ad';
    let url = 'https://search.heweather.net/find?key=f3952ac02f9c4e03961fce578e01c830&location='+value;  
    this.setState({isChecking: true});  
    fetch(url).then((response) => {
      if (response.ok) {
          return response.json();
      }
    }).then((jsonData) => {
      console.log('搜索城市*****************');
      console.log(jsonData.HeWeather6[0]);    
      this.onSuccess(jsonData.HeWeather6[0]);   
    }).catch((error) => {    
      this.setState({searchList: []});
      this.refs.toast.show("查询失败",1000);
    }); 
  }
        
  onSuccess(result){
    let data = result.status;
    if(data!='ok'){
      this.refs.toast.show("未查到该城市，请重新输入",5000);
      this.setState({
        searchList:[],
        isChecking:false      
      },()=>this.handleNoContentView())
    }else{
      this.setState({
        searchList:result.basic,
        isChecking:false      
      },()=>this.handleNoContentView())
    }
    
  }    

  
  handleSelect(rowID) {
  
  }
  
  onFailure = (error) => {

  };
//热门城市
  renderHotCity(){
     let {hotCityArray} =_this.state;
    //  console.log('调用了 renderHotCity 方法')
    //  console.log(hotCityArray);
     if(hotCityArray.length==0){
       return null;       
     }
    return(
      hotCityArray.map((item,index)=>{
         return (
          <View key={index} style={{alignItems: 'center',flexDirection:'row'}}>
             <TouchableOpacity
             onPress={() => this.goToWeatherPage(item.location)}            
             style={{
               width: 90,
               height: 35,
               margin: 10,
               borderRadius: 10,
               borderWidth: 1,
               borderColor: '#ddd'               
             }}>
             <Text
               style={{
                 color: '#eee',
                 fontSize: 15,
                 textAlign: 'center',
                 marginTop: 5,
               }}>
               {item.location}
             </Text>
           </TouchableOpacity>
          </View>
         );
    
          })
        )
     
  }
  handleNoContentView(){
      let list_Data = this.state.searchList;
      if(list_Data.length==0){
        this.setState({
          showSearchResult:false
        })
      }else{
        this.setState({
          showSearchResult:true
        })
      }     
  }
  goToWeatherPage(city){
        this.props.navigation.push('WeatherHome',{city:city});
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