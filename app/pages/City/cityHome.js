import React, {Component} from 'react';
import {
  ScrollView,
  FlatList,
  View,
  Image,
  Text,
  Navigator,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Swipeout from 'react-native-swipeout';
import  Storage from '../../components/storage';
import AppAccount from '../applicationAccount';
let SCREEN_WIDTH = Dimensions.get('window').width; //宽
let SCREEN_HEIGHT = Dimensions.get('window').height; //高
let _this;
let listArr = [
  {location: '昭平', tmp: '24',cond_txt:'多云'},
  {location: '上海', tmp: '23',cond_txt:'阴'},
  {location: '天津', tmp: '27',cond_txt:'晴'},
  {location: '重庆', tmp: '21',cond_txt:'多云'},
  {location: '南宁', tmp: '24',cond_txt:'多云'},
  {location: '杭州', tmp: '21',cond_txt:'阴'} 
  
];
export default class CityHome extends Component {
  static navigationOptions = {
    header:null,
    tabBarVisible:false,
    gesturesEnabled: false,
};
  constructor(props) {
    super(props);
    // const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      beanData: '',
      listArray: [],
      sectionID:'',
      rowID:'',
      isDelete:false
    };
    _this=this;
  }
  componentDidMount(){
    Storage.get('manage_CityInfor').then((tags)=>{
      if(tags!=undefined||tags!=unll){
        this.setState({
          listArray:tags
        })
      }

    })

  }
  goToAddCity() {
    this.props.navigation.push('AddCity');
  }
  goBack = () => {
    // this.props.navigation.goBack();
    this.props.navigation.push('WeatherHome');
  };
  goWearthDetail (item) {
    this.props.navigation.push('WeatherHome',{city:item});
    
  }
  handleEdit(){

    this.setState({
      isDelete:!_this.state.isDelete
    })

  }
  deleteCityItem(i){

    let {listArray} = this.state;
    console.log('===DE');
    listArray.splice(i,1);
    console.log(listArray);
    Storage.set("manage_CityInfor",listArray);
    this.setState({
      listArray:listArray
      
    })


  }
  renderTopicItem(item,index) {
    // let aaa =this.props.navigation.getParam('aa');  
        
    return (
      <LinearGradient start={{x:0,y:4}}  end={{x:1.2,y:1.5}} colors={[ '#cc99dd', '#99ccff','#77ccff']} locations={[0, 0.6, 0.8]}>
        <TouchableOpacity onPress={()=>this.goWearthDetail(item.location)}>
          <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,borderColor:"#eee"}}>              
            <View style={{marginLeft:10,flexDirection:'row',alignItems:'center'}}>
              {!_this.state.isDelete?null:
              <TouchableOpacity onPress={()=>this.deleteCityItem(index)}><Image source={require('../../image/icon_delete.png')} style={{width:17,height:17,marginRight:10,marginTop:5}}></Image></TouchableOpacity>
              }
             
              <View style={{marginRight:5}}>
                <Text style={{textAlign: 'center', marginTop: 5,color:'#333',fontSize:17}}>{item.location}</Text>  
              </View>
              {index==0?<Image source={require('../../image/icon_location.png')} style={{marginTop:6,marginLeft:5,width:12,height:12}}/>:null}           
            </View>
            <View style={{flexDirection:'row',alignItems:'center',margin:20}}>
              <View style={{marginRight:10}}><Text style={{textAlign: 'center',color:"#333",fontSize:17}}>{item.tmp}℃</Text></View>
              <View style={{width:60,fontSize:16}}><Text>{item.cond_txt}</Text></View>
            </View>
          </View>
        </TouchableOpacity>

      </LinearGradient>
    );
  }
  // renderTopicItem(item,index) {
  //   // let aaa =this.props.navigation.getParam('aa');
  //   const swipeoutBtns = [
  //     {
  //         text: '删除',
  //         backgroundColor: 'red',
  //         onPress: ()=>{
  //             this.deleteCityItem(index);
  //         },
  //         // 自定义component
  //             component: [<View style={{justifyContent: 'center', height: 130}}></View>] 
  //     }
  // ];  
  //   return (
  //     <Swipeout
  //       close={
  //         !(
  //           this.state.rowID === index
  //         )
  //       }        
  //       right={swipeoutBtns}
  //       rowID={index}        
  //       onOpen={( rowID) => {
  //         this.setState({
            
  //           rowID
  //         });
  //       }}
  //       autoClose={true}
  //       close={true}
  //       onClose={() => console.log('===close')}
  //       scroll={event => console.log('scroll event')}> 
  //        <LinearGradient start={{x:0,y:4}}  end={{x:1.2,y:1.5}} colors={[ '#cc99dd', '#99ccff','#77ccff']} locations={[0, 0.6, 0.8]}>
  //            <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,borderColor:"#eee"}}>              
  //             <View style={{marginLeft:10,flexDirection:'row',alignItems:'center',}}>
  //               <Image source={require('../../image/icon_delete.png')} style={{width:17,height:17,marginRight:10,marginTop:5}}></Image>
  //               <Text style={{textAlign: 'center', marginTop: 5,color:'#333',fontSize:17}}>{item.location}</Text>           
  //             </View>
  //             <View style={{flexDirection:'row',alignItems:'center',margin:20}}>
  //               <View style={{marginRight:10}}><Text style={{textAlign: 'center',color:"#333",fontSize:17}}>{item.tmp}℃</Text></View>
  //               <View style={{width:60,fontSize:16}}><Text>{item.cond_txt}</Text></View>
  //             </View>
  //           </View>

  //         </LinearGradient>
                
  //     </Swipeout>
  //   );
  // }
    
  
  render() {
    let {listArray}=this.state;
    return (
      <ImageBackground source={require('../../image/icon_weather.jpg')} style={{ flex:1,width: SCREEN_WIDTH,height:SCREEN_HEIGHT}}>
        <View style={{flexDirection: 'row', justifyContent:'space-between',alignItems: 'center',marginLeft:10,marginRight:10,marginTop:8}}>          
          <TouchableOpacity onPress={this.goBack} style={{alignItems: 'center',flexDirection:'row'}}>
            <Image
              source={require('../../image/icon_left_b_back.png')}
              style={{width: 16, height: 16,marginRight:8}}></Image>
            <Text style={{textAlign: 'center', fontSize: 16, color: '#000'}}>返回</Text>
          </TouchableOpacity>
          <View><Text style={{textAlign: 'center', fontSize: 18, color: '#222'}}>城市管理</Text></View>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={()=> this.goToAddCity()}>
              <Image source={require('../../image/icon_add.png')} style={{width:22,height:24,marginLeft:10,marginRight:10}}></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.handleEdit()}><Text style={{textAlign: 'center', fontSize: 16, color: '#000'}}>编辑</Text></TouchableOpacity>
          </View>
        
        </View>
        <FlatList
          data={listArray}
          style={{marginTop:15,height:SCREEN_HEIGHT}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index })=>this.renderTopicItem(item,index)}          
          showsHorizontalScrollIndicator={false}
            />         

      </ImageBackground>
      
  
    );
  }
  
}
