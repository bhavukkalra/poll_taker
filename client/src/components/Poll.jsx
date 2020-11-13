import React from 'react';
import { connect } from 'react-redux';
import { vote } from '../store/actions';
import ErrorMessage from '../components/ErrorMessage';






const Poll = ({ poll, vote }) => {


    const answers = poll.options && poll.options.map((option) => (
        <button onClick = {() => vote(poll._id, {answer: option.option})} key = {option._id}>
        { option.option }
        </button>
    ))


    return <div>
    <ErrorMessage />
    <h3>{poll.question}</h3>
    <div>{answers}</div>    
    </div>




   
};







export default connect(

    (store) => ({
        poll: store.currentPoll
    }),
    { vote }
)(Poll);