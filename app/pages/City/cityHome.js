import React, {Component} from 'react';
import {
  ScrollView,
  FlatList,
  View,
  Image,
  Text,
  Navigator,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Swipeout from 'react-native-swipeout';
import  Storage from '../../components/storage';
import AppAccount from '../applicationAccount';
let SCREEN_WIDTH = Dimensions.get('window').width; //宽
let SCREEN_HEIGHT = Dimensions.get('window').height; //高

let listArr = [
  {location: '北京', tmp: '23',cond_txt:'多云'},
  {location: '上海', tmp: '26',cond_txt:'晴'},
  {location: '天津', tmp: '23',cond_txt:'小雨'},
  {location: '重庆', tmp: '26',cond_txt:'晴'},
  {location: '南宁', tmp: '23',cond_txt:'阴'},
  {location: '广州', tmp: '26',cond_txt:'晴'},
  {location: '北京', tmp: '23',cond_txt:'大雨'},
  {location: '上海', tmp: '26',cond_txt:'多云'}
];
export default class CityHome extends Component {
  static navigationOptions = {
    header:null,
    tabBarVisible:false,
    gesturesEnabled: false,
};
  constructor(props) {
    super(props);
    // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      beanData: '',
      listArray: listArr,
      sectionID:'',
      rowID:''
    };
  }
  componentDidMount(){
    // Storage.get('addressBean').then((tags)=>{

    // })

  }
  goToAddCity() {
    this.props.navigation.push('AddCity');
  }
  goBack = () => {
    // this.props.navigation.goBack();
    this.props.navigation.push('WeatherHome');
  };
  goWearthDetail (item) {
    this.props.navigation.push('WeatherHome',{city:item});
    
  }
  deleteItem(i){
    console.log('===DE');
    listArr.splice(i,1);

  }
  renderTopicItem(item,index) {
    // let aaa =this.props.navigation.getParam('aa');

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
    const swipeoutBtns = [
      {
          text: '删除',
          backgroundColor: 'red',
          onPress: ()=>{
              this.deleteItem(index);
          },
          // 自定义component
              component: [<View style={{justifyContent: 'center', height: 130}}></View>] 
      }
  ];
  
    return (
      <Swipeout
        close={
          !(
            this.state.rowID === index
          )
        }        
        right={swipeoutBtns}
        rowID={index}        
        onOpen={( rowID) => {
          this.setState({
            
            rowID
          });
        }}
        onClose={() => console.log('===close')}
        scroll={event => console.log('scroll event')}>
          <LinearGradient start={{x:0,y:4}}  end={{x:1.2,y:1.5}} colors={[ '#cc99dd', '#99ccff','#77ccff']} locations={[0, 0.6, 0.8]}>
            <View style={{flex:1,flexDirection:'row',borderBottomWidth:1,borderColor:"#eee"}}>
            <View style={{flex:1,alignItems:'center',marginLeft:10,flexDirection:'row',justifyContent:'space-between'}}>
            <Text style={{textAlign: 'center', marginTop: 5,color:'#333',fontSize:17}}> {item.location}</Text>           
            </View>
            <View style={{flexDirection:'row',alignItems:'center',margin:20}}>
              <View style={{marginRight:10}}><Text style={{textAlign: 'center',color:"#333",fontSize:17}}>{item.tmp}℃</Text></View>
              <View style={{width:60,fontSize:16}}><Text>{item.cond_txt}</Text></View>
            </View>
            </View>

          </LinearGradient>
        
      </Swipeout>
    );
  }
    
  
  render() {
    return (
      <ImageBackground source={require('../../image/icon_weather.jpg')} style={{ flex:1,width: SCREEN_WIDTH,height:SCREEN_HEIGHT}}>
        <View style={{flexDirection: 'row', justifyContent:'space-between',alignItems: 'center',marginLeft:10,marginRight:10,marginTop:8}}>          
          <TouchableOpacity onPress={this.goBack} style={{alignItems: 'center',flexDirection:'row'}}>
            <Image
              source={require('../../image/icon_left_b_back.png')}
              style={{width: 16, height: 16,marginRight:8}}></Image>
            <Text style={{textAlign: 'center', fontSize: 16, color: '#000'}}>返回</Text>
          </TouchableOpacity>
          <View><Text style={{textAlign: 'center', fontSize: 18, color: '#222'}}>城市管理</Text></View>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={()=> this.goToAddCity()}>
              <Image source={require('../..//image/icon_add.png')} style={{width:22,height:24,marginLeft:10,marginRight:10}}></Image>
            </TouchableOpacity>
            <TouchableOpacity><Text style={{textAlign: 'center', fontSize: 16, color: '#000'}}>编辑</Text></TouchableOpacity>
          </View>
        
        </View>
        <FlatList
          data={listArr}
          style={{marginTop:15,height:SCREEN_HEIGHT}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index })=>this.renderTopicItem(item,index)}          
          showsHorizontalScrollIndicator={false}
            />         

      </ImageBackground>
      
  
    );
  }
  
}
