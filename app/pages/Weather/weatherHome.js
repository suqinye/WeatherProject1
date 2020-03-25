//xx天气预报首页
import React, {Component} from 'react';
import { View, Text, TextInput, StyleSheet, Image, PixelRatio,ImageBackground,Dimensions } from 'react-native';



let _this= null;

export default class weatherHome extends Component{
    constructor(props){
        super(props);
        this.state = {
           
            beanData: null
        }
    }
    componentWillMount() {
      
    }

    componentWillUnmount() {
       
    }

    componentDidMount() {
       
    }

    render(){
        let {beanData, needGuide} = this.state;
        return(

            <View>
                <Text>欢迎进入xx天气</Text>

            </View>
           
        )

    }
    
}