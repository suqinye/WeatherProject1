
 import React, {Component} from 'react-native';
 import NetInfo from "@react-native-community/netinfo";
const NOT_NETWORK = "网络不可用，请稍后再试";
const GOOD_NETWORK = "您的网络状态良好";
const TAG_NETWORK_CHANGE = "NetworkChange";

/***
 * 检查网络链接状态
 * @param callback
 */

/**
 * https://www.npmjs.com/package/@react-native-community/netinfo#addeventlistener 
 * NetInfoState 描述网络的当前状态。它是具有以下属性的对象：
 * type 当前连接的类型。
 * isConnected 如果存在活动的网络连接。请注意，这并不意味着可以访问互联网。
 * isInternetReachable 如果当前活动的网络连接可以访问Internet。
 * isWifiEnabled （仅限Android）设备的WiFi是打开还是关闭。
 * details 
 * 该details值取决于该type值。
 * type是none或unknown
 * details是null。
 * @param {*} callback 
 */
//  
const checkNetworkState = (callback) => {
    NetInfo.fetch().then(
        (state) => {
            callback(state.isConnected);
        }
    );
}
// const checkNetworkState = (callback) => {
//     NetInfo.isConnected.fetch().done(
//         (isConnected) => {
//             callback(isConnected);
//         }
//     );
// }

/***
 * 移除网络状态变化监听
 * @param tag
 * @param handler
 */
// const removeEventListener = (tag, handler) => {
//     NetInfo.isConnected.removeEventListener(tag, handler);
// }
// const removeEventListener = (state) => {
//     NetInfo.isConnected.removeEventListener(state);
// }

/***
 * 添加网络状态变化监听
 * @param tag
 * @param handler
 */
// const addEventListener = (state) => {
//     NetInfo.addEventListener(tag, handler);
// }

export default {
    checkNetworkState,
    // addEventListener,
    // removeEventListener,
    NOT_NETWORK,
    GOOD_NETWORK,
    TAG_NETWORK_CHANGE
}