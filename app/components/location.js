// import { init, Geolocation,setAllowsBackgroundLocationUpdates} from "react-native-amap-geolocation";
// //初始化sdk
// export async function geolocationInit() {
//     //设置高德key
//     await init({
//         android: "fc996d54d790c198851bd79018f10d7a",
//     });
    
    
//     //开启后台定位,必须要Background Modes打开为ON，勾选Loaction updates，不然会报错！
//     //必须在开始定位之前或者在定位stop的时候设置
//     setAllowsBackgroundLocationUpdates(true);
    
// }

// //只获得一次当前地理位置
// export function getCurrentPosition(){
//     Geolocation.getCurrentPosition(position=>console.log(position));
// }

// //注册一个监听，它会每隔一段时间返回当前地理位置
// export function watchPosition(){
//     if(!this.watchId){
//         this.watchId=Geolocation.watchPosition(position=>console.log(position))};
    
//     }