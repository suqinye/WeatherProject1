

import React, {Component} from 'react';
import { Text, 
  View, 
  StyleSheet,
  BVLinearGrdient,
   Platform, 
   TouchableOpacity,
   TouchableNativeFeedback,
   TouchableHighlight} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

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
          <LinearGradient start={{x:0,y:4}}  end={{x:1.2,y:1.5}} colors={[ '#cc99dd', '#99ccff','#77ccff']} locations={[0, 0.6, 0.8]} style={styles.linearGradient}>
          <TouchableOpacity style={styles.content} onPress={this.props.onPressLogin} >            
            <Text style={styles.text}>{this.props.title}</Text>            
          </TouchableOpacity>
          </LinearGradient>
        );
      }
    
    }


    const styles = StyleSheet.create({
        text: {
          color: 'white',
          fontSize: 14,
          backgroundColor: 'transparent'
        },
        content: {
          height: 45, 
          alignItems:'center',
          justifyContent:'center',
         
        },
        linearGradient:{
          // height: 45, 
          // alignItems:'center',
          // justifyContent:'center',
           borderRadius: 20
          
        }
      });