import React from 'react';
import { connect } from 'react-redux';






class Auth extends React.Component{
    //adding state
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        //Handle Change gets bind with constructor *this and its properties
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(e){
        const {username, password} = this.state;
        e.preventDefault();
        console.log(username, password);
    }


    //when user types in the input => regular function and needs *this to be binded to it
    // could be avoided with the arrow function

    //input e @event
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })


    }

    render(){
        const { username, password } = this.state;
        return(
            <div>
            <form onSubmit = {this.handleSubmit}>

            <label for= "username">username</label>
            <input type= "text" value = {username} name = "username" onChange= {this.handleChange}/> 

            <label for= "password">password</label>
            <input type= "password" value = {password} name = "password" onChange= {this.handleChange}/> 

            <button type = "submit">Submit</button>
            
            </form>
            
            </div>

        );

    };

}



export default Auth;