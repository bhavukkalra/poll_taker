const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now()
    },
    //To keep track of different polls created by user => a list of Poll Id's 
    //referencing Poll Schema
    polls: [{
        type: Schema.Types.ObjectId, 
        ref: 'Poll'}]

});

module.exports = mongoose.model('User', userSchema);