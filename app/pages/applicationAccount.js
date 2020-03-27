import React, {Component} from 'react';
import { View, Text, TextInput, StyleSheet, Image, PixelRatio,ImageBackground,Dimensions } from 'react-native';
import Button from '../components/Button';

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

        // const {params} = this.props.navigation.state;
        // let content=params.content;
        let content = this.state.content;
        return (
          <View >
            <Text>{content}++++++++</Text>
            <Text onPress={this.goBack}>点击返回</Text>
            <View style={{height:48,justifyContent:'center',marginTop:30,borderBottomWidth:1,borderColor:'#ddd'}}>
                        <TextInput
                        ref=" textAccVale"
                        autoFocus={true}
                        placeholder="请输入手机号"
                        placeholderTextColor="#ddd"
                        onChangeText={(text) => this.setState({userName:text})}
                        >

                        </TextInput>
                    </View>
                    <View style={{height:48,justifyContent:'center',borderBottomWidth:1,borderColor:'#ddd'}}>
                        <TextInput
                        ref=" textPssVal"
                        placeholder="请输入密码"
                        placeholderTextColor="#ddd"
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({password})}
                        >

                        </TextInput>
                    </View>                   
                    <View style={{marginTop:30}}>
                        <Button title="下一步"  onPress={this.goBack}/>
                    </View>
          </View>
        );
    
    }

}
