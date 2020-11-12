import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux';

import { getPolls, getUserPolls, getCurrentPoll} from '../store/actions';


class Polls extends Component{
    constructor(props){
        super(props);

        this.handleSelect = this.handleSelect.bind(this);

    }

    componentDidMount(){
        const { getPolls } = this.props;
        getPolls();
    }

    handleSelect(id){
        console.log(id);
        
        const { getCurrentPoll } = this.props;
        getCurrentPoll(id);
        
        
        

    };


    render(){
        const { auth, getPolls, getUserPolls } = this.props;
        //return each question in polls enclosed in list tags
        // () => this.handleSelect() react ambiguity
        const polls = this.props.polls.map(poll => (
            <li onClick = {() => this.handleSelect(poll._id)} key = {poll._id}> {poll.question} </li>
        ));

        return(
            


            <Fragment>
            {auth.isAuthenticated && (
                <div>
                <button onClick = {getPolls}> All Polls</button>
                <button onClick = {getUserPolls}> My Polls</button>
                </div>
            )}
            <ul>{ polls }</ul>
            </Fragment>
        )
    }
};


export default connect(
    store => ({
        auth: store.auth,
        polls: store.polls
    }),
    { getPolls, getUserPolls, getCurrentPoll}
)(Polls);

