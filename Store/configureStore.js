import {createStore, combineReducers} from 'redux'
import changeLocation from './Reducers/changeLocation'
import changeLoading from './Reducers/changeLoading'


export default createStore(combineReducers({changeLocation, changeLoading}))