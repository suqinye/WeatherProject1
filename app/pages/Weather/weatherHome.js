//xx天气预报首页
import React, {Component} from 'react';
import { View, Text, TextInput, StyleSheet, Image, PixelRatio,ImageBackground,Dimensions } from 'react-native';
import { Button } from '../../components/Button';



let _this= null;

export default class WeatherHome extends Component{
    constructor(props){
        super(props);
        this.state = {
           
            beanData: null,
            content:''
        }
    }
    componentWillMount() {
      
    }

    componentWillUnmount() {
       
    }

    componentDidMount() {
       
    }
    goBack = () => {
       // this.props.navigation.goback();
        this.props.navigation.push('Login')
      };
    render(){
        
        const {params} = this.props.navigation.state;
        let content=params.content;
        return(

            <View>
                <Text onPress={this.goBack}>{content}****</Text>
                {/* <Button onPress={this.goBack}>你好！欢迎进入xx天气</Button> */}

            </View>
           
        )

    }
    
}