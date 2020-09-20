const jwt = require('jsonwebtoken');

require('dotenv').config({path: "../.env"});
// handlers for /api/auth routes

const db = require('../models')

register = async (req,res,next) =>{
    
    try {
        const user = await db.User.create(req.body);

        // destructure the user
        const {id, username} = user;
        const token = jwt.sign({id , username}, process.env.SECRET);

        res.status(201).json({id, username, token});
    } catch (error) {
        if(error.code === 11000){
            error.message = 'Sorry, That username is already taken.Please try another one.'
        }

        next(error); 
    }
};

login = async (req, res, next) => {
    try {
        //db.user.find() => could also be used as username is unique(check?)
        //cannot use find by id => as user won't know its id
        const user = await db.User.findOne({username: req.body.username});
        
        const {id, username} = user;
        const valid = await user.comparePassword(req.body.password);

        if(valid){
            const token = jwt.sign({id, username}, process.env.SECRET);
            res.json({
                id,
                username,
                token
            });
        }else{
            throw new Error('Invalid username/password');
        }
        
        
    } catch (error) {
        // for security purposes always through a generic message at login
        error.message = 'Invalid username/password'

        next(error); 
    }
};

module.exports = {
    register,
    login
};




