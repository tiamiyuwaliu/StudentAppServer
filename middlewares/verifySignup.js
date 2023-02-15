const User = require("../models/user");

checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        email: req.body.email
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }
        if (user) {
            res.status(400).send({message: "Failed! Email address is already exists"});
            return;
        }
        next()
    })
}

module.exports = {checkDuplicateEmail};