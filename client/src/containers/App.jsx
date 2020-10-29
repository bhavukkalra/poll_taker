import React, { Component } from "react";
import decode from 'jwt-decode'
import { Provider } from 'react-redux'
import api from '../services/api'
import { store } from "../store";
import { addError, setCurrentUser, setToken } from "../store/actions";

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
        <div> App Works </div>;
        </Provider>
    ) 
}
    



export default App;
