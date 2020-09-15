const router = require('express').Router();

const handle = require('../handlers');
const { db } = require('../models/user');

console.log(handle.register);

router.get('/', (req,res) => {
    res.json({
        hello: "hello"
    })
})

// ./register => wrong path
router.post('/register',handle.register);

router.post('/login',handle.login);


module.exports = router;
