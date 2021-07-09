import {createStore, combineReducers} from 'redux'
import changeLocation from './Reducers/changeLocation'
import changeLoading from './Reducers/changeLoading'
import userInfos from './Reducers/userInfos'
import spots from './Reducers/spots'


export default createStore(combineReducers({changeLocation, changeLoading, userInfos, spots}))