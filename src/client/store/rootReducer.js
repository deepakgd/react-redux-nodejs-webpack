import { combineReducers } from 'redux';
import { STATE_KEY as todoState, reducer as todoReducer } from 'screens/todo';


export default combineReducers({
    [todoState]: todoReducer,
})