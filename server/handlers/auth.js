// handlers for /api/auth routes
const db = require('../models')

register = async (req,res,next) =>{
    console.log(req.body);
    try {
        const user = await db.User.create(req.body);

        // destructure the user
        const {id, username} = user;

        res.json({id, username});
    } catch (error) {
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
            res.json({
                id,
                username
            });
        }else{
            throw new Error('Invalid username/password');
        }
        
        
    } catch (error) {
        next(error); 
    }
};

module.exports = {
    register,
    login
};




