import React, { Component } from 'react';
import {
    View,
    Text,
    Modal,
    Image,
    ActivityIndicator
} from 'react-native';

export default class LoadingBg extends Component {
    // 构造
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                height:this.props.height,
                backgroundColor: this.props.bgColor || '#f1f3f5'
            }}>
                {this.props.loadText==="请求数据失败"?<Image source={require('../image/deflt_img_com.png')} ></Image>:<ActivityIndicator animating={true} color="#0095E9" size="large"/>}
                <Text style={{ marginTop: 15 }} >{this.props.loadText?this.props.loadText:"正在加载中..."}</Text>
            </View>
        );
    }
}