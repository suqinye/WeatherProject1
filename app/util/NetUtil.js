import React, {Component} from 'react';
import Fetch from 'native-cmos-fetch';
// let NetUtil = {
//     getJson(url, callback, data, callErrback) {

//         Fetch.getJSON({ url: url })
//           .then(function (res) {
//             alert(JSON.stringify(res));
//             // let json = EncryptUtil.aesDecrypt(res.data);//解密
//             callback(json);
//           }, function (err) {
//             alert(err)
//             callErrback(JSON.stringify(err));
//           })
    
//       },
//     postJson(url, data, callback,callErrback){
//         let headers = new Headers();
//         headers.append('Accept', '*/*');
//         headers.append('Content-Type', 'application/x-www-form-urlencoded');
//         Fetch.postJSON({url:url,body:data,headers:headers})
//         .then(function (res){
//             try{
//                 let json = res.data;
//                 callback(JSON.parse(json));
//             }catch (error){
//                 callback(res);
//             }
//         },function (err){
//             callErrback(JSON.stringify(err));
        
//         })
       
//     }
//   }
//   export default NetUtil;
  

export  default class NetUtil{
  static get(url){
      return new Promise((resolve,reject)=>{
          fetch(url)
              .then(response=>response.json())
              .then(result=>{
                  resolve(result);
              })
              .catch(error=>{
                  reject(error);
              })
      })
  }
  static post(url,data){
      return new Promise((resolve,reject)=>{
          fetch(url,{
              method:'POST',
              header:{
                  'Accept':"application/json",
                  'Content-Type':"application/json"
              },
              body:JSON.stringify(data)
          })
              .then(response=>response.json())
              .then(result=>{
                  resolve(result);
              })
              .catch(error=>{
                  reject(error)
              })
      })
  }
}