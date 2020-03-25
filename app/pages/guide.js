// // 引导页
// import React, { Component } from 'react';
// import {
//     View,
//     Text,
//     Dimensions,
//     Image,
//     Platform,
//     BackHandler,
//     TouchableOpacity,
//     NativeModules,
//     ScrollView} from 'react-native';
// const { StatusBarManager } = NativeModules;
// let SCREEN_WIDTH = Dimensions.get('window').width;//宽

// export default class Guide extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             paddingTop: 20,
//             guideStep: 1
//         }
//     }
//     componentWillMount() {
        
//         StatusBarManager.getHeight((statusBarHeight) => {
//             this.setState({ paddingTop: statusBarHeight.height });
//         })
       
//     }

//     renderStep1() {
//         return (
//             <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//                 <TouchableOpacity onPress={this.guideSucess.bind(this)}>
//                     <Text style={{width: 250, fontSize: 16, color: '#fff', textAlign: 'right', backgroundColor: 'transparent', fontWeight: "bold"}}>跳过引导</Text>
//                 </TouchableOpacity>
//                 <View style={{width: 250, height: 330, backgroundColor: '#fff', borderRadius: 5, marginTop: 15, alignItems: 'center'}}>
//                     <Text style={{fontSize: 17, color: '#333', marginTop: 40}}>欢迎您进入xx天气预报</Text>
//                     <Text style={{fontSize: 15, marginTop: 40, color: '#666'}}>天气指标数据正在为您紧急生</Text>
//                     <Text style={{fontSize: 15, marginTop: 15, color: '#666'}}>成中，一起来看看xx天气预报有</Text>
//                     <Text style={{fontSize: 15, marginTop: 15, color: '#666'}}>哪些功能吧！</Text>
//                     <View style={{flex: 1}}/>
//                     <TouchableOpacity onPress={this.nextStep.bind(this, 2)}>
//                         <View style={{width: 115, height: 32, marginBottom: 30, backgroundColor: '#2fb5fe', borderRadius: 1, alignItems: 'center', justifyContent: 'center'}}>
//                             <Text style={{fontSize: 15, color: '#fff'}}>下一步</Text>
//                         </View>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         )
//     }
//     renderStep2() {
//         return (
//             <View style={{flex: 1, alignItems: 'flex-end'}}>
//                 <Image style={{height: 44, width: 44, marginTop: this.state.paddingTop}} source={require('../image/guideset@2x.png')}/>
//                 <Image style={{marginTop: 10}} source={require('../image/guideUp@2x.png')}/>
//                 <Text style={{color: '#fff', fontSize: 17, marginTop: 24, marginRight: 37, backgroundColor: 'transparent', fontWeight: "bold"}}>点击这里可以查看个人信息</Text>
//                 <TouchableOpacity onPress={this.nextStep.bind(this, 3)}>
//                     <View style={{width: 115, height: 32, marginTop: 30, marginRight: 44, backgroundColor: '#2fb5fe', borderRadius: 1, alignItems: 'center', justifyContent: 'center'}}>
//                         <Text style={{fontSize: 15, color: '#fff'}}>下一步</Text>
//                     </View>
//                 </TouchableOpacity>
//             </View>
//         )
//     }
//     renderStep3() {
//         let width = SCREEN_WIDTH - 10
//         let height = width * 1075 / 730

//         let userType = this.props.userType;

//         let isTeamLeadr = userType === 'foreman';
//         return (
//             <ScrollView style={{flex: 1, }}>
//                 <View style={{alignItems: 'center'}}>
//                     <Image style={{marginTop: this.state.paddingTop + 44 + 10, width: width, height: height}} source={require('../image/icon_upper.png')} />
//                     <Image style={{marginTop: 18}} source={require('../image/icon_upper.png')}/>
//                     <Text style={{marginTop: 25, fontSize: 16, color: '#fff', fontWeight: 'bold', backgroundColor: 'transparent'}}>查询最近七天的天气情况</Text>
//                     <Text style={{marginTop: 18, fontSize: 16, color: '#fff', fontWeight: 'bold', backgroundColor: 'transparent'}}>查询2</Text>
//                     <Text style={{marginTop: 18, fontSize: 16, color: '#fff', fontWeight: 'bold', backgroundColor: 'transparent'}}>查询3</Text>
//                     <TouchableOpacity  onPress={isTeamLeadr ? this.nextStep.bind(this,4) : this.guideSucess.bind(this)}>
//                         <View style={{width: 115, height: 32, marginTop: 30, marginBottom: 55, backgroundColor: '#2fb5fe', borderRadius: 1, alignItems: 'center', justifyContent: 'center'}}>
//                             <Text style={{fontSize: 15, color: '#fff'}}>{isTeamLeadr ? "下一步" : "进入班组助手"}</Text>
//                         </View>
//                     </TouchableOpacity>
//                 </View>
//             </ScrollView>
//         )
//     }
//     renderStep4() {
//         let width = SCREEN_WIDTH - 10;
//         let height = width * 322 / 736;
//         let arrowH = 35;
//         let arrowW = 206 * arrowH / 71;
//         let arrowMarginL = (SCREEN_WIDTH - arrowW) / 2;
//         let tipTxt = "这里显示xxx的信息，点击进入该xx详情，" +"\nxx天气预报的功能有助于您的日常出行，" + "\n更多功能等待您去探索发现！";
//         return(
//             <View style={{flex: 1}}>
//                 <View style={{position: 'absolute', bottom: 5}}>
//                     <View style={{flexDirection: 'row'}}>
//                         <View style={{flex: 1}}/>
//                         <TouchableOpacity onPress={this.guideSucess.bind(this)}>
//                             <View style={{width: 115, height: 32, marginRight: 15, backgroundColor: '#2fb5fe', borderRadius: 1, alignItems: 'center', justifyContent: 'center'}}>
//                                 <Text style={{fontSize: 15, color: '#fff'}}>进入xx天气预报</Text>
//                             </View>
//                         </TouchableOpacity>
//                     </View>
//                     <Text style={{marginLeft: 15, lineHeight: 35, width: SCREEN_WIDTH - 2* 15, marginTop: 30, fontSize: 17, color: '#fff', fontWeight: 'bold', backgroundColor: 'transparent'}}>{tipTxt}</Text>
//                     <Image style={{width: arrowW, height: arrowH, marginLeft: arrowMarginL, marginTop: 15}} source={require('../image/icon_down.png')} />
//                     <Image style={{marginLeft: 5, marginTop: 20, width: width, height: height}} source={require('../image/icon_down.png')} />
//                 </View>
//             </View>
//         )
//     }

//     nextStep(step) {
//         this.setState({
//             guideStep: step
//         })
//     }

//     guideSucess() {
//         this.props.guideSucess && this.props.guideSucess();
//     }

//     render() {
//         let {guideStep} = this.state;
//         return (
//             <View style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0}}>
//                 <View style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, backgroundColor: '#000', opacity: 0.4}} />
//                 <View style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0}}>
//                     {guideStep == 1 ? this.renderStep1() : null}
//                     {guideStep == 2 ? this.renderStep2() : null}
//                     {guideStep == 3 ? this.renderStep3() : null}
//                     {guideStep == 4 ? this.renderStep4() : null}
//                 </View>
//             </View>
//         );
//     }

// }