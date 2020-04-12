import React, {Component} from 'react';
import { View, Text,ToastAndroid, Platform,PermissionsAndroid,Dimensions } from 'react-native';
import {Geolocation,setAllowsBackgroundLocationUpdates,init} from 'react-native-amap-geolocation';
import Toast, {DURATION} from 'react-native-easy-toast';
let _this = null;
export default class Position extends Component{
    constructor(props){
        super(props);
        this.state={
            initialPosition: 'Unknow',//初始位置
            location:'Unknow',
            longitude:'',//经度
            latitude:''//维度
        }
        _this = this ;

    }
    componentWillMount(){

    }
    componentDidMount() {
    //   this.aa()
    this.getGps();

        
    }
  

    componentWillUnmount(){

    }
    async geolocationInit(){
        await init({
            android:'b1ea7e718756c25b175b2a948d9f3505'
        });
        setAllowsBackgroundLocationUpdates(true);

    }
    watchPosition(){
        // if(this.watchId){

        // }
    }
    async getGps(){
    if(Platform.OS == 'ios'){
        _this.getPosition();
    }else{
        // const permissions = [
        //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        // ]
        // const granteds = await PermissionsAndroid.requestMultiple(permissions);
        
          
            const granteds = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );           
            if("granted" === PermissionsAndroid.RESULTS.GRANTED){
                // await Geolocation.init({
                   
                //     android: "b1ea7e718756c25b175b2a948d9f3505"
                // });
        
               _this.getPosition();//已获取权限
    
            } else {            
            this.refs.toast.show('定位权限被禁止',1000)
            }
           
        }
   }
    
    getPosition(){
        return new Promise((resolve,reject)=>{
            Geolocation.getCurrentPosition(
                location=>{
                    let initialPosition = JSON.stringify(position.coords);
                    let longitude = JSON.stringify(location.coords.longitude);
                    let latitude = JSON.stringify(location.coords.latitude);
                    this.setState({
                        initialPosition:initialPosition,
                        longitude:longitude,//经度
                        latitude:latitude//纬度

                    });
                    // fetch(`https://restapi.amap.com/v3/assistant/coordinate/convert?
                    // locations=${this.state.longitude},${this.state.latitude}
                    // &coordsys=gps&output=json&key=b1ea7e718756c25b175b2a948d9f3505`, { method: "GET" })
                    
                    fetch('https://restapi.amap.com/v3/assistant/coordinate/convert?locations='+longitude+','+latitude+'&coordsys=gps&output=json&key=b1ea7e718756c25b175b2a948d9f3505', { method: "GET" })
                    .then(response => response.json())
                        .then((jsonDa) => {
                            let newVar = jsonDa.locations.split(',')
                                this.setState({
                                    longitude: newVar[0],//经度
                                    latitude: newVar[1],//纬度
                                });

                            //访问网络开始  逆地理编码api服务地址
                                fetch('https://restapi.amap.com/v3/geocode/regeo?key=b1ea7e718756c25b175b2a948d9f3505'
                                +'&location='+this.state.longitude+','+this.state.latitude
                                +'&radius=1000&extensions=all&batch=false&roadlevel=0', {
                                    method: "GET"
                                    // headers: {
                                    //     "Content-Type": "application/x-www-form-urlencoded"
                                    // },
                                    // body: ``
                                })
                                .then((response) => response.json())
                                .then((jsonData) => {
                                    try {
                                       
                                        this.setState({
                                            location:jsonData.regeocode.formatted_address,
                                        });
                                    }catch (e) {
 
                                    }
                                })
                                .catch((error) => {
                                    console.error(error);
                                });
                            //访问网络结束
                        })
                        .catch(error => {
                            reject(error);
                        });

                                  
  
     },
     error => {
        reject(error);
        if(error.code==2){
             ToastAndroid.show('定位失败，请查看手机是否开启GPS定位服务',ToastAndroid.SHORT);
        }else if(error.code==3){
            ToastAndroid.show("定位超时，请尝试重新获取定位",ToastAndroid.SHORT);
        }else{
            ToastAndroid.show("定位失败："+error.message,ToastAndroid.SHORT);
        }
    }, {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 10000
    }

            );

        })

    }
    render(){

        return(
            <View>
               
            <View>
               <Text style={{ fontSize: 15, color: '#fff'}}>当前位置 {this.state.location}</Text>
                </View>
                <Toast ref="toast"/>
            </View>
        )
    }

}