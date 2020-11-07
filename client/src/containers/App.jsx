import React, { Fragment } from "react";
import decode from 'jwt-decode'
import { Provider } from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import api from '../services/api'
import { store } from "../store";
import { addError, setCurrentUser, setToken } from '../store/actions/index';

import RouteViews from './RouteViews'
import Navbar from './Navbar'



// user will stay logged in even if they exit the browser
if(localStorage.jwtToken){
    setToken(localStorage.jwtToken);
    try {
        store.dispatch(setCurrentUser(decode(localStorage.jwtToken)));
        
    } catch (err) {
        store.dispatch(setCurrentUser({}));
        store.dispatch(addError(err));
        
    }

}

const App = () => {
    return(
        <Provider store = {store}>
        <Router>
        <Fragment>
            <Navbar />
            <RouteViews />
        </Fragment>    
        </Router>
        </Provider>
    ) 
}
    



export default App;
