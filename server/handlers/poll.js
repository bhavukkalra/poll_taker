const db = require('../models');


showPolls = async (req, res, next) => {
    try {
        const polls = await db.Poll.find() // get every entry

        res.status(200).json(polls);
        
    } catch (error) {

        error.status = 400;
        next(error);
        //pass the error to error handler
        
    }
}

createPoll = async (req, res, next) => {
    try {
        // take the id from request(req) after authentication and attach with poll i.e creator
        const id = req.decoded.id;

        const user = await db.User.findById(id);

        const {question, options} = req.body;
        const poll = await db.Poll.create({
            question,
            user, 
            options: options.map(function(option){
                return {
                    option: option,
                    votes: 0
                }
            }
        )
        });
        //push into array of polls created by user
        user.polls.push(poll._id);
        await user.save();

        // poll object = {
        //     question: (string),
        //     options: 

        //             [    {option: 'this is option 1', votes : 0}, 
        //                  {option: 'this is option 2,', votes: 0}
        //              ] 
        // }
        //options: array of objects with properties option and  votes(defualt = 0)



        // only certain things returned => example => only the id of the
        res.status(201).json({
            voted: poll.voted,
            created: poll.created,
            _id: poll._id,
            question: poll.question,
            user: user._id,
            options: poll.options,
            poll_created: user.polls

            
        });
        
    } catch (error) {
        error.status = 400;
        next(error);
        
    }
}

module.exports = {
    showPolls,
    createPoll
}