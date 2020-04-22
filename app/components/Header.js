
import React, {Component} from 'react';
import { 
  Text, 
  View, 
  Image,
  StyleSheet,
   TouchableOpacity} from 'react-native';
   export default class Header extends Component{
    constructor(props){
      super(props);
       
    }

    render(){
        return(
            <TouchableOpacity onPress={this.props.onPress} >
                <Image source={require('../image/icon_left_back.png')} style={{width:15,height:15}}></Image>

            </TouchableOpacity>
        )
    }

}