import AsyncStorage from '@react-native-community/async-storage';
class Storage {
  /**
   * 获取
   * @param key
   * @returns {Promise<T>|*|Promise.<TResult>}
   */
  static get(key) {
    //   return AsyncStorage.getItem(key).then((error,value)=>{
    //       const jsonValue = JSON.parse(value);
    //       return jsonValue;
    //   })
    return AsyncStorage.getItem(key)
      .then(
        //使用Promise机制的方法
        value => {
          //使用Promise机制,如果操作成功不会有error参数
          if (value == null) {
            //没有指定的key
            return;
          }
          const jsonValue = JSON.parse(value);
          // console.log('===' + value);
          // console.log(jsonValue);
          return jsonValue;
        },
      )
      .catch(error => {
        //读取操作失败
        console.log('error:' + error.message);
      });
  }
  /**
   * 保存
   * @param key
   * @param value
   * @returns {*}
   */
  static set(key,value){
      return AsyncStorage.setItem(key,JSON.stringify(value)).then(
        (value)=>{   //成功的操作
            // console.log('保存成功');
            // console.log(JSON.stringify(value));
        }).catch(
 
            (error)=>{
                //错误的处理
                console.log(error);
              });
  }
  /**
   * 更新
   * @param key
   * @param value
   * @returns {Promise<T>|Promise.<TResult>}
   */
  static update(key,value){
      return Storage.get(key).then( (item) => {
          value = typeof value === 'string'?value:Object.assign({},item,value);
          return AsyncStorage.setItem(key,JSON.stringify(value));
      })
  }
  /**
   * 删除
   * @param key   
   * @returns {*}
   */
  static remove(key){
      return AsyncStorage.removeItem(key);
  }
}
export default Storage;