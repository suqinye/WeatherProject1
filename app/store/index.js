import {createStore, applyMiddleware} from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk'
let createAppStore = applyMiddleware(thunk)(createStore);
export default function configureStore(initialState) {
    const store = createAppStore(reducers, initialState);
    return store;
}