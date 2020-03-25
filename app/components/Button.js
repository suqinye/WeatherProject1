

import React, {Component} from 'react';
import { Text, View, StyleSheet, Platform, TouchableOpacity,TouchableNativeFeedback,TouchableHighlight} from 'react-native';


export default class Button extends Component{
    constructor(props){
      super(props);
       
    }
    render() {
        if (Platform.OS === 'android') {
          return(
            <TouchableNativeFeedback
              onPress={this.props.onPress}>
              {this._renderContent()}
            </TouchableNativeFeedback>
          );
        } else if (Platform.OS === 'ios') {
          return(
            <TouchableHighlight
              onPress={this.props.onPress}>
              {this._renderContent()}
            </TouchableHighlight>
          );
        }
      }
    
      _renderContent() {
        return(
          <TouchableOpacity style={styles.content} onPress={this.props.onPressSubmit}>
            
            <Text style={styles.text}>{this.props.title}</Text>
            
          </TouchableOpacity>
        );
      }
    
    }


    const styles = StyleSheet.create({
        text: {
          color: 'white',
          fontSize: 14,
        },
        content: {
          height: 45,
          backgroundColor: '#046ada',
          alignItems:'center',
          justifyContent:'center',
          borderRadius: 20
        },
      });