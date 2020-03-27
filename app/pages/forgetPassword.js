import React, {Component} from 'react';
import { View, Text, TextInput, StyleSheet, Image, PixelRatio,ImageBackground,Dimensions } from 'react-native';
import Button from '../components/Button';

export default class ForgetPassword extends Component{
    constructor(props){
        super(props);

    }
    goBack = () => {
        // this.props.navigation.goback();
         this.props.navigation.push('Login');       
       };

    render(){

        return(
            <View>
                <Text>忘记</Text>
                <View style={{marginTop:30}}>
                        <Button title="下一步"  onPress={()=>this.goBack()}/>
                </View>
            </View>
        )
    }

}