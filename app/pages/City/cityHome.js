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
let SCREEN_WIDTH = Dimensions.get('window').width; //宽
let SCREEN_HEIGHT = Dimensions.get('window').height; //高

let listArr = [
  {location: '北京', tmp: '23'},
  {location: '上海', tmp: '26'},
  {location: '天津', tmp: '23'},
  {location: '重庆', tmp: '26'},
  {location: '南宁', tmp: '23'},
  {location: '广州', tmp: '26'},
  {location: '北京', tmp: '23'},
  {location: '上海', tmp: '26'}
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
    };
  }

  goToAddCity() {
    this.props.navigation.push('AddCity');
  }
  goBack = () => {
    // this.props.navigation.goback();
    this.props.navigation.push('WeatherHome');
  };
  goWearthDetail (item) {
    this.props.navigation.push('WeatherHome',{city:item});
    
  }
  renderCityItem() {
    let aaa =this.props.navigation.getParam('aa');
    //listArr
    return (      
      listArr.map((item,index)=>{
        return(
          <TouchableOpacity style={{margin:10}} >           
            <ImageBackground
              source={require('../../image/icon_bgCity.jpg')}
              style={{width: 100, height: 100}}>
                <View>
                <Text style={{textAlign:'center',marginTop:5}} >{item.location}</Text>
                <Text style={{textAlign:'center'}}>{item.tmp}℃</Text>
              </View>
            
            </ImageBackground>
            
        </TouchableOpacity>
        )
      })
    );
  }
    
  
  render() {
    return (
      <ImageBackground
        source={require('../../image/icon_weatherHome.jpg')}
        style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}>
        {/*可以使用 ListView */}
        <TouchableOpacity onPress={this.goBack}  style={{flexDirection: 'row', alignItems: 'center', margin: 8}}>
          <Image
            source={require('../../image/icon_left_back.png')}
            style={{width: 18, height: 18}}></Image>
          <Text style={{textAlign: 'center', fontSize: 18, color: '#fff'}}>
            城市管理
          </Text>
        </TouchableOpacity>
        <ScrollView style={{height:SCREEN_HEIGHT,width:SCREEN_WIDTH}}>
          <View style={{flex:1,flexDirection:'row',flexWrap:'wrap'}}>
            {this.renderCityItem()}
            <TouchableOpacity
            onPress={() => this.goToAddCity()}
            style={{width: 100, height: 100, margin: 10}}>              
              <ImageBackground
              source={require('../../image/icon_bgCity.jpg')}
              style={{width: 100, height: 100,flexDirection:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <Image source={require('../../image/icon_add.png')}  style={{width:20,height:20}}></Image>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          
        </ScrollView>

        {/* <FlatList
          ref="flatlist"
          data={this.state.listArray}
          style={{width:SCREEN_WIDTH,height:SCREEN_HEIGHT,marginTop:10,flex:1}}
          keyExtractor={(item, index) => index.toString()} //不重复的key
          renderItem={({item, index}) => this.renderItemRow(item, index)}
          ListFooterComponent ={this.renderFooter}
        /> */}
      </ImageBackground>
    );
  }
}
