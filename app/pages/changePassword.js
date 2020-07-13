// 注册账户
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../components/Button';
import LeftBack from '../components/LeftBack';
import Toast, {DURATION} from 'react-native-easy-toast';
import Storage from '../components/storage';
let {height, width} = Dimensions.get('window');
let blue_eye = require('../image/icon_blue_eye.png');
let grey_eye = require('../image/icon_grey_eye.png');
let _this;
export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '', //旧密码
      newPassword: '', //密码
      confirmPasd: '', //确认密码
      psdErrorLog: '', //错误提示文字
      userErrorLog: '',
      isRepeatPsd: true, //flase表示输入的两次密码不一样
      checkPsd: false, //是否查看密码
      verCode: '',
      codeText: '',
      //用户信息
      userName: '',
      localStorageData: [],
    };
    _this = this;
  }
  componentDidMount() {
    this.refreshCode();
    this.getStorageData();
    Storage.get('user_infor').then(tags => {
      console.log('tags==============');
      console.log(tags);
      if (tags != undefined || tags != null) {
        this.setState({
          userName: tags.userName,
        });
      }
    });
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  //读取本地存储数据
  getStorageData() {
    //Storage.remove('localData');
    Storage.get('localData').then(tags => {
      console.log('localData=========');
      console.log(tags);
      if (tags != null || tags != undefined) {
        this.setState({
          localStorageData: tags,
        });
      }
    });
  }
  refreshCode() {
    let code = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    let char = '';
    let result = '';
    for (let i = 0; i < 4; i++) {
      let code_i = Math.round(Math.random() * 61); //随机选择一位  （0,61） 写出0到61的随机的索引数字
      char = code[code_i]; //得到随机的索引  取出随机地字符
      if (result.toUpperCase().indexOf(char.toUpperCase()) > -1) {
        i--;
        continue;
      }
      result = result + char;
    }
    this.setState({
      verCode: result,
    });
  }

  //检查两次密码是否一样
  handleCheckPasd(rePsd) {
    let {newPassword} = this.state;
    if (newPassword == rePsd) {
      this.setState({
        confirmPasd: rePsd,
        isRepeatPsd: true,
      });
    } else if (rePsd == '') {
      this.setState({
        confirmPasd: rePsd,
        isRepeatPsd: true,
      });
    } else {
      this.setState({
        psdErrorLog: '输入的两次新密码不一样',
        confirmPasd: rePsd,
        isRepeatPsd: false,
      });
    }
  }
  //密码规范
  handleCheckPasdRule(value) {
    // let {newPassword}=this.state;
    let reg = /^(?=.*[0-9])(?=.*[a-zA-Z])(.{6,18})$/;
    if (reg.test(value)) {
      this.handleCheckUser();
    } else {
      this.refs.toast.show(
        '密码为6-18位且必须包含数字和字母，请您重新输入',
        1000,
      );
      return;
    }
  }
  //进行原密码验证
  handleCheckUser() {
    let {
      newPassword,
      oldPassword,
      localStorageData,
      verCode,
      codeText,
      userName,
    } = this.state;
    if (localStorageData.length != 0) {
      for (let i = 0; i < localStorageData.length; i++) {
        let item = localStorageData[i];
        if (item.userName == userName && item.password == oldPassword) {
          if (verCode == codeText) {
            localStorageData.splice(i, 1);
            localStorageData.push({userName: userName, password: newPassword});
            console.log('localStorageData.push==================');
            console.log(localStorageData);
            Storage.set('localData', localStorageData);
            this.refs.toast.show('修改成功', 2000);
            let timer = setTimeout(() => {
              this.props.navigation.push('Login');
            }, 2);
          } else {
            this.refs.toast.show('验证码错误', 1000);
          }
        }
        if (item.userName == userName && item.password != oldPassword) {
          _this.refs.toast.show('原密码错误，请重新输入', 1000);
        }
      }
    }
  }

  onPressCallback() {
    let {
      newPassword,
      localStorageData,
      verCode,
      confirmPasd,
      codeText,
      oldPassword,
    } = this.state;
    if (oldPassword == '') {
      this.refs.toast.show('原密码不能为空', 1000);
      return;
    }
    if (newPassword == '') {
      this.refs.toast.show('新密码不能为空', 1000);
      return;
    }
    if (confirmPasd == '') {
      this.refs.toast.show('请确认新密码', 1000);
      return;
    }
    if (codeText == '') {
      this.refs.toast.show('请输入验证码', 1000);
      return;
    }
    this.handleCheckPasdRule(newPassword);
  }

  render() {
    let {verCode, checkPsd} = this.state;

    return (
      <ImageBackground
        source={require('../image/icon_weather.jpg')}
        style={{width: width, height: height}}>
        <View style={{marginTop: 10, marginLeft: 8}}>
          <LeftBack title="返回" onPressBack={() => this.goBack()} />
        </View>
        <View
          style={{flex: 1, alignItems: 'center', width: width, marginTop: 50}}>
          <View style={{marginBottom: 15}}>
            <Text style={{color: '#fff', fontSize: 16}}>设置新密码</Text>
          </View>
          <View style={{width: '80%', flex: 1}}>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: '#ddd',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TextInput
                ref=" textAccVale"
                autoFocus={true}
                secureTextEntry={true}
                placeholder="请输入原密码"
                placeholderTextColor="#ddd"
                onChangeText={text => this.setState({oldPassword: text})}
              />
            </View>
            <View style={{borderBottomWidth: 1, borderColor: '#ddd'}}>
              <View>
                <TextInput
                  ref=" textPsd1"
                  placeholder="请输入新密码"
                  placeholderTextColor="#ddd"
                  secureTextEntry={true}
                  onChangeText={text => this.setState({newPassword: text})}
                />
              </View>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: '#ddd',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TextInput
                ref=" textPsd2"
                placeholder="请再次输入新密码"
                placeholderTextColor="#ddd"
                secureTextEntry={true}
                onChangeText={text => this.handleCheckPasd(text)}
              />
              {/* <TouchableOpacity onPress={()=>this.handleClick()}>
                      <Image source={checkPsd?blue_eye:grey_eye} style={{width:25,height:20}}></Image>
                    </TouchableOpacity> */}

              {this.state.isRepeatPsd ? null : (
                <View>
                  <Text style={{color: 'red', fontSize: 13}}>
                    {this.state.isRepeatPsd ? null : this.state.psdErrorLog}
                  </Text>
                </View>
              )}
            </View>
            <View
              style={{height: 48, borderBottomWidth: 1, borderColor: '#ddd'}}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  placeholder="请输入验证码"
                  placeholderTextColor="#ddd"
                  onChangeText={text => this.setState({codeText: text})}
                />
                <LinearGradient
                  start={{x: 0, y: 4}}
                  end={{x: 1.0, y: 1.0}}
                  colors={['#cc99dd', '#99ccff', '#77ccff']}
                  locations={[0, 0.5, 0.6]}>
                  <View style={{width: 100, height: 45}}>
                    <Text
                      style={{
                        color: '#4B85ED',
                        fontSize: 23,
                        textAlign: 'center',
                        paddingTop: 5,
                      }}>
                      {verCode}
                    </Text>
                  </View>
                </LinearGradient>
              </View>
            </View>
            <View style={{marginTop: 30}}>
              <Button
                title="保存修改"
                onPressLogin={() => this.onPressCallback()}
              />
            </View>
          </View>
        </View>
        <Toast ref="toast" />
      </ImageBackground>
    );
  }
  goBack = () => {
    this.props.navigation.goBack();
  };
}
