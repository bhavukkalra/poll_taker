import React from 'react';
import {connect} from 'react-redux'


import {Redirect} from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import Auth from '../components/Auth'


const AuthPage = ({authType, isAuthenticated}) => {

    //if already authenticated i.e jwt token exists redirect to hompage
    if(isAuthenticated) return <Redirect to= '/' />


    //using a common component for login and register
    //distinguished based on AuthType from parent => default login
    return(
        <div>
            
            <Auth authType = {authType}/>
            <ErrorMessage/> 
        </div>

    )
}


export default AuthPage;

