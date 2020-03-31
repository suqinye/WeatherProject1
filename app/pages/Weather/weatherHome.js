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
import Login from '../login';
import AddCity from '../managementCity/addCity';
import fetchWeather from '../../API/API';
//底部导航栏的图片
let icon_selectNav1 = require('../../image/icon_selectNav1.png');//
let icon_noSelectNav1 = require('../../image/icon_noSelectNav1.png');//
let icon_selectNav2 = require('../../image/icon_selectNav2.png');//
let icon_noSelectNav2 = require('../../image/icon_noSelectNav2.png');//

let {height, width} = Dimensions.get('window');

let _this = null;

export default class WeatherHome extends Component {
  static navigationOptions = {
    header:null,
};
  constructor(props) {
    super(props);
    this.state = {
      loading: true, //是否正在加载,修改这个值
      beanData: null,
      // 正在定位中
      requestLocation: true,
      cityList: [],
      location: '昭平县',
    };
    _this = this;
  }
  componentWillMount() {}

  componentWillUnmount() {}

  componentDidMount() {}
  //获取天气数据
  getWeatherData() {
    if (this.refs.loading) {
      this.refs.loading.show();
    }
  }

  goBack = () => {
    // this.props.navigation.goback();
    this.props.navigation.push('Login');
  };
  //跳到城市管理页面
  goCityMagementPage() {
    this.props.navigation.push('CityHome',{aa:'从weatherhome页面传参'});
  }
  
  render() {
    // const {params} = this.props.navigation.state;
    let location = this.state.location;
    // if(params!=undefined){

    // }

    return (
      <ImageBackground
        source={require('../../image/icon_weatherHome.jpg')}
        style={{flex: 1, width: width, height: height}}>
        <View
          style={{
            marginTop: 10,
            height: 20,
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => this.goCityMagementPage()}
            style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
            <Image
              source={require('../../image/icon_add.png')}
              style={{width: 16, height: 16, top: 3}}></Image>
            <Text style={{marginLeft: 10, fontSize: 16, color: '#fff'}}>
              {location}
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <ScrollView>
            <View
              style={{
                flex: 1,
                height: height,
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <View style={{height:180}}></View>
              <View>
                <View>
                  <Text style={{color: '#fff', fontSize: 40}}>10℃</Text>
                </View>
                <View>
                  <Text style={{color: '#fff', fontSize: 18}}>13℃/9℃</Text>
                </View>

                <View style={{marginTop: 10}}>
                  <Text style={{color: '#fff'}}>小雨 西风2级 </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                marginTop: 0,
                backgroundColor: '#222',
                opacity: 0.1,
              }}>
              <View style={{height: height}}>
                <Text style={{color: 'red'}}>言归于好</Text>
              </View>
            </View>
            {/* <View>
                
            </View> */}
          </ScrollView>
        </View>

        <Loading ref="loading" />
      </ImageBackground>
    );
  }


  static navigationOptions = {
    tabBarLabel: '好友',
    tabBarIcon: ({focused}) => {
        if (focused) {
            return (
                <View><Text>天气</Text></View>
            );
        }
        return (
            <View><Text>我的</Text></View>
        );
    },
};

}
const styles = StyleSheet.create({


})
