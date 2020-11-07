import React from 'react';
import { connect } from 'react-redux';

import {authUser, logout} from '../store/actions';






class Auth extends React.Component{
    //adding state
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        

    }

    handleSubmit = (event) =>{
        const {username, password} = this.state;
        event.preventDefault();
        const {authType} = this.props;
        this.props.authUser(authType || 'login', {username, password});
    }


    //when user types in the input => regular function and needs *this to be binded to it
    // could be avoided with the arrow function

    //input e @event
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(typeof event.target.name)
        //i.e
        //username: ""
        //password: ""
        


    }

    render(){
        const { username, password } = this.state;
        return(
            <div>
            <form onSubmit = {this.handleSubmit}>

            <label htmlFor= "username">username</label>
            <input type= "text" value = {username} name = "username" onChange= {this.handleChange}/> 

            <label htmlFor= "password">password</label>
            <input type= "password" value = {password} name = "password" onChange= {this.handleChange}/> 

            <button type = "submit">Submit</button>
            
            </form>
            
            </div>

        );

    };

}


//mapping store to props
//mapping dispatches(actions) to props
export default connect(
    () => ({}), 
    {authUser, logout}
)(Auth);