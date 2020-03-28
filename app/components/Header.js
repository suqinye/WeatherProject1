
import React, {Component} from 'react';
import { 
  Text, 
  View, 
  Image,
  StyleSheet,
   TouchableOpacity} from 'react-native';
   xport default class Header extends Component{
    constructor(props){
      super(props);
       
    }

    render(){
        return(
            <View>
                <Image source={require('../image/icon_left_back.png')} style={{width:15,height:15}}></Image>

            </View>
        )
    }

}