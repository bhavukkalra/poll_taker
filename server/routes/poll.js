const router = require('express').Router();
const handle = require('../handlers');

const auth = require('../middlewares/auth');
// we didn't did here the trick with only doing
//const auth = require('../middlewares');
//and sending out the entire module 
//as there is currently only one file in middleware



//get, post routes at api/polls
router.route('/')
.get(handle.showPolls) // show everything
.post(auth.authenticate,handle.createPoll) //createPoll will run only if authenticated


router.get('/user', auth.authenticate, handle.userPolls) //user dashboard to show all the polls created by him


//routes for voting on a specific poll or showing it
router.route('/:id')
.get(handle.getPoll)
.post(auth.authenticate, handle.vote)
.delete(auth.authenticate, handle.deletePoll)



module.exports = router;