const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
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

//here function() keyword must be used instead of arrow function
// because of this keyword 
//ENCRYPTION BEFORE STORING

// defines a pre HOOK for userSchema
userSchema.pre('save', async function(next){
    try {
        // If the password is not modified just return 
        if(!this.isModified('password')){
            return next();
        }
        // else if the password is new or modified store the hashed value
        const hashed = await bcrypt.hash(this.password, 10);
        this.password = hashed;
        return next();
         
    } catch (error) {
        return next(error);   
    }
});

//userSchema.methods.custom_design_method
userSchema.methods.comparePassword = async function(attempt, next){
    try {
        // compare attempted pass to encrypted pass(after decryption)
        return await bcrypt.compare(attempt, this.password);
        
    } catch (error) {

        next(error);
        
        
    }
};


module.exports = mongoose.model('User', userSchema);