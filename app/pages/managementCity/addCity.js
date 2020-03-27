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
  Dimensions
} from 'react-native';
export default class AddCity extends Component {
    constructor(props){
        super(props);
        this.state={
           aa:0

        }
    }



    render(){

        return(
            <View>
                {/*可以使用 ListView */}
                <Text>nihao 添加城市</Text>
            </View>
        )
    }
}