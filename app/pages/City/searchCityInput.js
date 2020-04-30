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
  Dimensions
} from 'react-native';
import LeftBack from '../../components/LeftBack';
import mainStyles from './style';
let SCREEN_WIDTH = Dimensions.get('window').width; //宽
let SCREEN_HEIGHT = Dimensions.get('window').height; //高

let _this = null;
export default class SearchCityInput extends Component {
    constructor(props){
        super(props);
        this.state={
           aa:0,
           isediting:false,
           value:''

        }
        _this=this;
    }

    goBack = () => {     
      //关闭当前页面并返回上一页面
       this.props.navigation.goBack(); 
       //返回到堆栈中的上一个页面，如果提供一个参数n，则指定在堆栈内返回几层
       //this.props.navigation.pop();

       // 在堆栈顶部添加一条路由，并导航至该路由 ,可以在相同的screen页面间跳转
       // this.props.navigation.push('CityHome');
       // 跳转页面
       //如果有已经加载的页面，navigate方法将跳转到已经加载的页面，而不会重新创建一个新的页面,push总是会创建一个新的页面，所以一个页面可以被多次创建
       // this.props.navigation.navigate('CityHome');
    };

    hotCitiesList =() =>{
    }
    render(){
        return (           
            <View style={ [mainStyles.inputView, {flexDirection: 'row'}] }>
              <View style={{ flexDirection: "row", flex: 1 }}>
                <View style={[mainStyles.inputBtn, { flex: 1, borderTopLeftRadius: 2, borderBottomLeftRadius: 2 }]}>
                  <Image style={{ width: 14, height: 14.5, marginLeft: 10, marginRight: 5 }} source={require('../../image/icon_search.png')} />
                  <View style={{height: 14.5, width: 1, backgroundColor: '#c9c9c9', marginRight: 5}}/>
                  <TextInput
                            ref="textInput"
                            style={{ flex: 1, fontSize: 14, color: '#333', padding: 0}}
                            autoFocus={true}
                            maxLength={12}
                            keyboardType={this.props.keyboardType}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => {
                               _this.setState({
                                 value:text
                               }, _this.props.onChangeText(text))
                                
                            }}
                            onFocus={() => {
                                this.setState({
                                    isediting: true
                                });
                            }}
                            onBlur={() => {
                                this.setState({
                                    isediting: false
                                });
                            }}
                            onEndEditing={() => this.props.whenEndEdit()}
                            editable={this.props.editable}
                            value={this.props.value}
                            placeholder={this.props.placeholder}
                            placeholderTextColor={this.props.placeholderTextColor}
                    />
                  {this.state.isediting ?
                  <TouchableOpacity style={this.props.value ? styles.inputDelImg : styles.inputDelImgNone} onPress={this.props._onDelTextHandle}>
                    <Image style={this.props.value ? styles.inputDelImg : styles.inputDelImgNone}  resizeMode={'stretch'} source={require('../../image/icon_delete_grey.png')} />
                  </TouchableOpacity> :
                  <View></View>
                  }
                </View>
              </View>
                <TouchableOpacity onPress={() => this.props.delOnClick()} >
                    <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#2fb5fe', borderTopRightRadius: 4, borderBottomRightRadius: 4, width: 55, height: 35}}>
                        <Text style={{ fontSize: 15, color: '#fff', }}>{this.props.btnName}</Text>
                    </View>
                </TouchableOpacity>
            </View>           
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