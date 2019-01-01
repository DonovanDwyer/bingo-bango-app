import {combineReducers} from 'redux';
import {userReducer} from './userReducer'
import {bingoReducer} from './bingoReducer'
import {bangoReducer} from './bangoReducer'

const rootReducer = combineReducers({
  currentUser: userReducer,
  selectedBoxes: bingoReducer,
  valueBucket: bangoReducer
});

export default rootReducer;
