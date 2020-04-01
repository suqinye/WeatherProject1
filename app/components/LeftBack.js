import React, { Component } from 'react';
import {
   
    View,
    Image,
    Text,    
    TouchableOpacity,    
    Dimensions
} from 'react-native';
let SCREEN_WIDTH = Dimensions.get('window').width; //宽
let SCREEN_HEIGHT = Dimensions.get('window').height; //高
export default class LeftBack extends Component {
    constructor(props) {
        super(props);
        
    }

   

    render() {
       
       
        return (
            <TouchableOpacity
                onPress={this.props.onPressBack}
                style={{ flexDirection: 'row', alignItems: 'center', margin: 8 }}>
                <Image
                    source={require('../image/icon_left_back.png')}
                    style={{ width: 18, height: 18,margin:8 }}></Image>
                <Text style={{ textAlign: 'center', fontSize: 18, color: '#fff' }}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}








