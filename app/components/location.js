import * as TYPES from "../types";
import React, {Component} from 'react';
import { Image,View, Text,ToastAndroid, Platform,PermissionsAndroid,Dimensions } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import NetUtil from '../util/NetUtil';
import Toast, {DURATION} from 'react-native-easy-toast';

export function fetchGetPosition() {
    return new Promise((resolve,reject)=>{
        //获取当前位置
        Geolocation.getCurrentPosition(
            (position)=>{
                console.log(position);                
                let longitude = JSON.stringify(position.coords.longitude);
                let latitude = JSON.stringify(position.coords.latitude);
               getLocation(longitude,latitude)  
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
export function getLocation(log,lat){
         // 坐标转换 
         NetUtil.get(`https://restapi.amap.com/v3/assistant/coordinate/convert?coordsys=gps&output=json&key=b1ea7e718756c25b175b2a948d9f3505&locations=`+log+','+lat)
            .then((jsonDa) => {
                console.log(jsonDa);
                getLocationSuccess(jsonDa);               
            })
            .catch(error => {
                console.error(error);
                ToastAndroid.show("获取数据失败！",ToastAndroid.SHORT);
            });
}
export function getLocationSuccess=(jsonDa)=>{
        let newVar = jsonDa.locations.split(',');
        let  longitude = newVar[0];
        let latitude = newVar[1];
       aa(longitude,latitude);

}
    //通过调用高德地图逆地理接口，传入经纬度获取位置信息
    //访问网络开始  逆地理编码api服务地址
export function aa(longitude,latitude){
       

        return dispatch => {
            // const name = self.props.selectCity?self.props.selectCity:"上海"
            return  NetUtil.get('https://restapi.amap.com/v3/geocode/regeo?key=b1ea7e718756c25b175b2a948d9f3505'+'&location='+longitude+','+latitude+'&radius=1000&extensions=all&batch=false&roadlevel=0')
            .then((jsonData)=>{
                let district = jsonData.regeocode.addressComponent.district;
                let city = jsonData.regeocode.addressComponent.city;
                let cc =[district,city]
                dispatch(changeAddress(cc));
            }).done
        };        
 }
 export function changeAddress(cc){
    return {
        type: TYPES.WEATHER_LIST,
        text: cc
      };
 }
   
  

