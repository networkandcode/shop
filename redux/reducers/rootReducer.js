import categoriesReducer from './catgeoriesReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    categories: categoriesReducer
});

export default rootReducer;