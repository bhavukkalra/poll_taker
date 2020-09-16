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
        console.log(req.body);
        const {question, options} = req.body;
        const poll = await db.Poll.create({
            question,
            options: options.map(function(option){
                return {
                    option: option,
                    votes: 0
                }
            }
        )
        });

        // poll object = {
        //     question: (string),
        //     options: 

        //             [    {option: 'this is option 1', votes : 0}, 
        //                  {option: 'this is option 2,', votes: 0}
        //              ] 
        // }
        //options: array of objects with properties option and  votes(defualt = 0)

        res.status(201).json(poll);
        
    } catch (error) {
        error.status = 400;
        next(error);
        
    }
}

module.exports = {
    showPolls,
    createPoll
}