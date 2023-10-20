function logger(req, res, next) {
    console.log(req.user)
    next()
}

module.exports = {logger}