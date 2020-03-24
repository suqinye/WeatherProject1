/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';
import Test from './app/test/test1';
import Logo from './app/pages/login';
// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
// import Route from './src/config'
// import {Provider} from 'react-redux';
// import configureStore from './app/store';
// const store = configureStore();
class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      // <Provider store={store}>
      //   <Route />
      // </Provider>
      <View>
        {/* <Test> </Test> */}
        <Logo></Logo>
      </View>
    );
  }
}
export default App;
