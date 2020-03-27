import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ListView,
  View,
  Image,
  Text,
  AppRegistry,
  Navigator,
  TouchableOpacity,
  Dimensions
} from 'react-native';


export default class CityHome extends Component {
    constructor(props){
        super(props);
        this.state={
            beanData:'',

        }
    }



    render(){

        return(
            <View>
                {/*可以使用 ListView */}
                <Text>nihao 城市管理</Text>
            </View>
        )
    }
}