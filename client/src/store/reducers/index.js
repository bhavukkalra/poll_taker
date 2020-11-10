import { combineReducers } from 'redux';

import error from './error';
import  auth  from './auth';
export polls from './polls';

// Check Again
export default combineReducers({
    auth,
    error
});