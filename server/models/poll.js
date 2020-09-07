const mongoose = require('mongoose');

let Schema = mongoose.Schema;


const pollSchema = new Schema({
    question: String,
    options: [{}],
    voted: [{type: Schema.Types.ObjectId, ref: 'User'}]
});


module.exports = mongoose.model('Poll', pollSchema);

