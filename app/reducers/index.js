import weatherReducer from "./weatherReducer";
import {combineReducers} from 'redux';
export default combineReducers({
    weatherListStore: weatherReducer
});
