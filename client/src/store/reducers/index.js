import { combineReducers } from 'redux';

import error from './error';
import auth from './auth';

// Check Again
export default combineReducers({
    auth,
    error
});