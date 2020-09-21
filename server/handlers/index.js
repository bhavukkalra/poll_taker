

notFound = (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
}



// most of the site errors could be 404 but in cases if something horrible 
// happens and err doesn't gets passed
// Status = 500, message = Something Went Wrong
errors = (err, req, res, next) => {

    res.status(err.status || 500)
    .json({
        error: err.message || "Something went wrong"
    }); 
};


module.exports = {
    notFound,
    errors,
    ...require('./auth'),
    ...require('./poll')
}

//...require()spreading individual handler inside auth.js 
//and exporting it => to be used by main index.js





