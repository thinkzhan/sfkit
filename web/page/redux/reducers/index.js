import { combineReducers } from 'redux';
import { home } from './home';
import { detail } from './detail';

const rootReducer = combineReducers({
    home,
    detail
});

export default rootReducer;
