import React from 'react';
import {TabNavigator} from 'react-navigation';

 import WeatherHome from './Weather/weatherHome';
 export default class Main extends Component{
     constructor(props){
         super(props);
     }
 
render(){
    return(
        <WeatherHome></WeatherHome>
    )
}


}
