import {combineReducers} from 'redux';
import {userReducer} from './userReducer'
import {bingoReducer} from './bingoReducer'
import {gameReducer} from './gameReducer'

const rootReducer = combineReducers({
  currentUser: userReducer,
  selectedBoxes: bingoReducer,
  winner: gameReducer
});

export default rootReducer;
