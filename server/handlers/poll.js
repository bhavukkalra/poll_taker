const db = require('../models');


showPolls = async (req, res, next) => {
    try {
        const polls = await db.Poll.find().populate('user', ['username', 'id']) // get every entry
        //only those username will be populated which has user field inside Poll doccument

        res.status(200).json(polls);
        
    } catch (error) {

        error.status = 400;
        next(error);
        //pass the error to error handler
        
    }
};

userPolls = async (req, res, next) => {
    try {
        const {id}  = req.decoded;

        const user = await db.User.findById(id).populate('polls');
        res.status(200).json(user.polls);
        //user.polls => gives us array of doccument of polls created by user
        
    } catch (error) {
        error.status = 400;
        next(error);
        
    }
};

//parameter /:id passed
getPoll = async (req, res, next) => {
    try {

        const {id} = req.params;

        const poll = await db.Poll.findById(id).populate('user', ['username', 'id']);

        if(!poll) throw new Error('no poll Found');

        res.status(200).json(poll);
        
    } catch (error) {
        error.status = 400;
        next(error);
        
    }
};

deletePoll = async (req, res, next) => {
    try {
        const {id: userId} = req.decoded;
        const {id: pollId} = req.params;
        //aliasing them with different names
        // destructuring into different variables(as input is the same for both)(to avoid confusion)

        const poll = await db.Poll.findById(pollId);

        if(!poll) throw new Error('poll not found');

        if(poll.user.toString() !== userId){
            throw new Error('Unauthorized access');
        }
        // poll.user => ObjectId(native mongoDb type) type but req.params is of string type

        await poll.remove();

        res.status(202).json(poll);
        //202 means resource was marked for deletion

    } catch (error) {
        error.status = 400;
        next(error);
        
    }
};


//hardest route to configure => as most confusing

vote = async (req, res, next) => {
    try {
        const {id: pollId} = req.params;
        const {id: userId} = req.decoded;
        const {answer} = req.body;

        if(answer){
            const poll = await db.Poll.findById(pollId);

            if(!poll) throw new Error("poll Not found");


            //will store which option is voted
            //function(option_doccuments_inside_poll) => traversing through all option Schema documents
            //option_doccuments_inside_poll.option => accessing the option inside the particular doccument


            //goal => returned array will have only one change from (options array inside Poll Schema)
            //i.e number of votes will be increased by one from original one rest id, option(string) will be same for all
            const vote = poll.options.map(function(option_doccuments_inside_poll) {
                if(option_doccuments_inside_poll.option === answer){

                    return{
                        option: option_doccuments_inside_poll.option,
                        _id: option_doccuments_inside_poll._id,
                        votes: option_doccuments_inside_poll.votes + 1
                    }

                }else{
                    //if not the option marked return the whole option_doccument as it is
                    return option_doccuments_inside_poll;
                }
            })


            //NOW THAT WE GOT WHICH OPTION IS BEING VOTED

            //CHECK IF USER ALREADY VOTED
            //filter returns only those elements int the array which satisfy the condition in the call back function
            store_user_if_already_voted = poll.voted.filter(function(user) {
                return user.toString() == userId
            });

            
            //user has not already voted i.e its his first time
            // => update details in schema
            if(store_user_if_already_voted.length <= 0){

                poll.voted.push(userId);
                poll.options = vote;
                //CRUX

                await poll.save();

                //to avoid request time out => we need to send a response
                res.status(202).json(poll);

            }else{
                throw new Error("Already Voted");
            }


        }else{
            throw new Error("No answer Provided");
        }
  
    } catch (error) {
        error.status = 400;
        next(error);
        
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

            
        });
        
    } catch (error) {
        error.status = 400;
        next(error);
        
    }
}

module.exports = {
    showPolls,
    createPoll,
    userPolls,
    getPoll,
    deletePoll,
    vote
}