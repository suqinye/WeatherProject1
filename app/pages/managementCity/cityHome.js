import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ListView,
  View,
  Image,
  Text,
  AppRegistry,
  Navigator,
  TouchableOpacity,
  Dimensions
} from 'react-native';
let SCREEN_WIDTH = Dimensions.get('window').width;//宽
let SCREEN_HEIGHT = Dimensions.get('window').height;//高

let listArr =  [{location:'北京',tmp:'23'},{location:'上海',tmp:'26'}]
export default class CityHome extends Component {
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state={
            beanData:'',
            listArray:listArr,

        }
    }

    goToAddCity(){
        this.props.navigation.push('AddCity');
       
      }

      _renderRow(){

        return(
            <TouchableOpacity>

            </TouchableOpacity>
        )
      }

    render(){

        return(
            <View>
                {/*可以使用 ListView */}
                <TouchableOpacity style={{flex:1,flexDirection:'row'}}>

                <View><Text style={{textAlign:"center",fontSize:20,color:'#ddd'}}>城市管理</Text></View>

                </TouchableOpacity>
                <TouchableOpacity>
                <ListView
                    dataSource={ds.cloneWithRows(this.state.listArray)}
                    renderRow={(rowData, rowId) => this._renderRow(rowData, rowId)}
                     style={{ height: 160, width:SCREEN_WIDTH}}
                />
                </TouchableOpacity>

                
                <TouchableOpacity onPress={()=>this.goToAddCity()}>
                    <Text>添加城市</Text>
                </TouchableOpacity>
            </View>
        )
    }
}