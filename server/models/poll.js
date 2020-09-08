const mongoose = require('mongoose');

let Schema = mongoose.Schema;


const optionSchema = new Schema({
    //option name
    options: String,
    votes: {
        type: Number,
        default: 0
    }
});

//TWO WAY REFERENCE <=> FOR POLL AND USER SCHEMA
const  pollSchema = new Schema({
    //To Track Which User Created the poll
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    question: String,
    options: [optionSchema],
    // for tracking how many users voted
    voted: [{type: Schema.Types.ObjectId, ref: 'User'}],
    created: {
        type: Date,
        default: Date.now()
    }
});




module.exports = mongoose.model('Poll', pollSchema);

