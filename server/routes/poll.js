const router = require('express').Router();
const handle = require('../handlers');

//get, post routes at api/polls
router.route('/')
.get(handle.showPolls) // show everything
.post(handle.createPoll)


module.exports = router;