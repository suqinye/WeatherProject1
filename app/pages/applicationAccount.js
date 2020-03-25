import React, {Component} from 'react';
import { View, Text, TextInput, StyleSheet, Image, PixelRatio,ImageBackground,Dimensions } from 'react-native';


export default class AppAccount extends Component{
    constructor(props){
        super(props);
        this.state = {
            content: 'AppAccount'
          }

    }
    goBack = () => {
        this.props.navigation.goBack();
        //this.props.navigation.navigate('Login')
      };
    render(){

        const {params} = this.props.navigation.state;
        let content=params.content;
        return (
          <View style={styles.container}>
            <Text>{content}++++++++</Text>
            <Text onPress={this.goBack}>点击返回</Text>
          </View>
        );
    
    }

}