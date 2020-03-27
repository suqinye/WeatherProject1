import React, { Component } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    Modal
} from 'react-native';
/**
 * Loading使用须知:
 * 在this.refs.loading之前做判断 if(this.refs.loading)
 */
export default class Loading extends Component {
    // 构造
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            message: "正在加载中..."
        };
    }
    render() {
        if (this.state.isShow) {
            return (
                <Modal
                    visible={this.state.isShow}
                    transparent={true}
                    onRequestClose={() => {
                        this.hide();
                    }}
                    animationType='fade'>
                    <View style={{
                        flex: 1, alignItems: 'center', justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', flexDirection: "row"
                    }}>
                        <View style={{
                            backgroundColor: 'white', alignItems: 'center', flexDirection: "row", flex: 1, height: 65, borderRadius: 3, marginLeft: 35, marginRight: 35
                        }}>
                            <ActivityIndicator style={{ marginLeft: 20 }} animating={true} color="#0095E9" size="large" />
                            <Text style={{ marginLeft: 15 }} >{this.state.message}</Text>
                        </View>
                    </View>
                </Modal>
            );
        } else {
            return null
        }
    }
    show() {
        this.setState({ isShow: true });
    }
    hide() {
        this.timer = setTimeout(() => {
            this.setState({ isShow: false });
        }, 10);
    }
    setMessage(message) {
        this.setState({ message: message });
    }
    isShow() {
        return this.state.isShow;
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }
}