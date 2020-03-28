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
let SCREEN_WIDTH = Dimensions.get('window').width; //宽
let SCREEN_HEIGHT = Dimensions.get('window').height; //高
export default class AddCity extends Component {
    constructor(props){
        super(props);
        this.state={
           aa:0

        }
    }



    render(){

        return (
          <ImageBackground source={require('../../image/icon_bgCity.jpg')} style={{width: SCREEN_WIDTH, height: SCREEN_HEIGHT}}>
            <View>
              <Image
                source={require('../../image/icon_left_back.png')}
                style={{width: 18, height: 18, color: '#fff',margin:8}}></Image>
              {/*可以使用 ListView */}
             <View style={{width:50,height:20}}>
                 <TextInput></TextInput>
             </View>
            </View>
          </ImageBackground>
        );
    }
}