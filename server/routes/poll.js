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



module.exports = router;