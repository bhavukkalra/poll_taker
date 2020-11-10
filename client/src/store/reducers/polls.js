import {SET_POLLS, SET_CURRENT_POLL} from '../actionTypes';

//multiple polls will be in form of array of objects
export const polls = (state = [], action) => {
    switch (action.type){
        case SET_POLLS:
            return action.polls
        
        default:
            return state;

    }
}

//single poll will be just an object
export const currentPoll = (state = {}, action) => {
    switch (action.type){
        case SET_CURRENT_POLL:
            return action.poll

        default:
            return state;
    }
}