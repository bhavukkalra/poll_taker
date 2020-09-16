require('dotenv').config({path: "../.env"});
const jwt = require('jsonwebtoken');



authenticate = (req, res, next) => {
    if(req.headers.authorization){

        const token = req.headers.authorization.split(' ')[1];
        //bearer ajhdjhfjkhsdkjfh(token) ex

        jwt.verify(token, process.env.SECRET, (error, decoded) => {
            if(error){
                next(Error('Failed to Authorize Token'))

            }else{
                
                
                //sending the users data to the next function to be used
                // only one middle ware for authorisation and authentication
                // if we want to know the specific users who is logged in => done via decoded property of req
                req.decoded = decoded;
                next();

            }
        })

    }else{
        next(Error('No Token Provided'));
    }

};






module.exports = {
    authenticate

}