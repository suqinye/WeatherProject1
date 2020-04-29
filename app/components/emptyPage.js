
import React, {Component} from 'react';
import { 
  Text, 
  View, 
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
   TouchableOpacity} from 'react-native';

   let {height12, width12} = Dimensions.get('window');
   import weatherTypesJson from '../data/weatherTypes.json';
   import LeftBack from '../components/LeftBack';
   export default class EmptyPage extends Component{
    constructor(props){
      super(props);
      // this.state={
      //   weatherTypesData:'',
      //   wid:''
      // }
       
    }
    componentDidMount() {
     

     
    
      }
      
    goBack=()=>{
        this.props.navigation.goBack();
    }


    render(){

      
      return(
        <ImageBackground source={require('../image/icon_bgCity.jpg')} style={{flex:1,width:width12,height:height12}}>
            <LeftBack title='返回' onPressBack={()=>this.goBack()}></LeftBack>
            <View style={{flex:1,alignItems:'center'}}>                
                <View style={{marginTop:100}}>
                    <Image  style={{width:235,height:220}} resizeMode='contain' source={require('../image/icon_null.png')}></Image> 
                     <Text style={{color:'#fff',fontSize:16,textAlign:'center',marginTop:20}}>此功能还未开通</Text>                  
                </View>               
                
            </View>
        </ImageBackground>
       
          

      )
    }

  }