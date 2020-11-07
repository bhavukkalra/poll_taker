import React from 'react';
import { connect } from 'react-redux'
import {Switch, Route, withRouter} from 'react-router-dom'
import AuthPage from '../pages/AuthPage'
import { store } from '../store';

//auth coming from store
const RouteViews = ({auth}) => (
<main>

    <Switch>

    <Route exact path= '/login' 
    render = {() => <AuthPage authType = 'login' isAuthenticated = {auth.isAuthenticated}/>} />
    <Route eaxct path= '/register' 
    render = {() => <AuthPage authType = 'register' isAuthenticated = {auth.isAuthenticated}/>} />
    </Switch>


</main>   
);

//wihtRouter
export default withRouter(connect(store => ({auth: store.auth}))(RouteViews));
