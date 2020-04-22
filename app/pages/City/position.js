import React, {Component} from 'react';
import { Image,View, Text,ToastAndroid, Platform,PermissionsAndroid,Dimensions } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import NetUtil from '../../util/NetUtil';
import Toast, {DURATION} from 'react-native-easy-toast';
let _this = null;
export default class Position extends Component{
    constructor(props){
        super(props);
        this.watchId = null;
        this.state={
            initialPosition: 'Unknow',//初始位置
            location:'Unknow',
            longitude:'',//经度
            latitude:'',//维度
            city: '',
            district: '正在定位',
            
        }
        _this = this ;

    }
    
    async componentDidMount() {
        if(Platform.OS == 'ios'){
            _this.getPosition();
        }else{
            
            const hasLocationPermission = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION )
            if (hasLocationPermission) { 
                const granteds = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );           
                if(granteds === PermissionsAndroid.RESULTS.GRANTED){
                //_this.getPosition()
                }
            }else {            
                this.refs.toast.show('定位权限被禁止',1000)
            }

        }
    }
    componentWillUnmount(){

    }
    getPosition=()=>{
        return new Promise((resolve,reject)=>{
            //获取当前位置
            Geolocation.getCurrentPosition(
                (position)=>{
                    console.log(position);
                    let initialPosition = JSON.stringify(position.coords);
                    let longitude = JSON.stringify(position.coords.longitude);
                    let latitude = JSON.stringify(position.coords.latitude);
                    this.setState({
                        initialPosition:initialPosition,
                        longitude:longitude,//经度
                        latitude:latitude//纬度

                    },this.getLocation(longitude,latitude));
                   
                                  
  
                },
                (error) => {
                    reject(error);
                    if(error.code==2){
                        ToastAndroid.show('定位失败，请查看手机是否开启GPS定位服务',ToastAndroid.SHORT);
                    }else if(error.code==3){
                        ToastAndroid.show("定位超时，请尝试重新获取定位",ToastAndroid.SHORT);
                    }else{
                        ToastAndroid.show("定位失败："+error.message,ToastAndroid.SHORT);
                    }
                }, {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 10000
                }

            );
        })
    }
getLocation(log,lat){
         // 坐标转换 
         NetUtil.get(`https://restapi.amap.com/v3/assistant/coordinate/convert?locations=${log},${lat}&coordsys=gps&output=json&key=b1ea7e718756c25b175b2a948d9f3505`)
                    
         // fetch('https://restapi.amap.com/v3/assistant/coordinate/convert?locations=116.480656,39.989677&coordsys=gps&output=json&key=fc996d54d790c198851bd79018f10d7a', { method: "GET" })
         
              .then((jsonDa) => {
                  
                 // console.log(jsonDa);
                  _this.getLocationSuccess(jsonDa)
                 
                  //访问网络结束
              })
              .catch(error => {
                //console.error(error);
              });


}
getLocationSuccess=(jsonDa)=>{
        let newVar = jsonDa.locations.split(',')
        this.setState({
            longitude: newVar[0],//经度
            latitude: newVar[1],//纬度
        },()=>{
            //通过调用高德地图逆地理接口，传入经纬度获取位置信息
    //访问网络开始  逆地理编码api服务地址
    NetUtil.get('https://restapi.amap.com/v3/geocode/regeo?key=b1ea7e718756c25b175b2a948d9f3505'+'&location='+_this.state.longitude+','+_this.state.latitude+'&radius=1000&extensions=all&batch=false&roadlevel=0')
         
        .then((jsonData) => {  
             let aa = jsonData.regeocode.addressComponent.district;
            this.setState({
                district:aa,
            });                               
               console.log(this.state.district);
            
           
        })
        .catch((error) => {
           // console.error(error);
        });


        });
    


    }
   
    render(){

        return(
            <View>
               
                <View style={{flex:1,flexDirection:'row'}}>
                    <View>
                        <Text style={{ fontSize: 15, color: '#fff'}}>{_this.state.district}</Text>
                    </View>
                    <Image source={require('../../image/icon_location.png')} style={{marginTop:6,marginLeft:5,width:10,height:10}}/>
                </View>
                <Toast ref="toast"/>
            </View>
        )
    }

}