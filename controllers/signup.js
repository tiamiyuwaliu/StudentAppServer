const User = require('../models/user');
var bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
const fs = require('fs');

exports.signUp = (req, res) =>  {

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
    });

    user.save((err, user) => {
        if (err) {
            res.status(500).send({message: err});
            return;
        }

        var token = null;

        if (process.env.AUTHMETHOD === 'jwt') {
            let privateKey = fs.readFileSync('../keys/private.pem', 'utf8');
            token = jwt.sign({id: user._id}, privateKey, {algorithm: 'HS256'})
        }

        res.status(200).send({
            id: user._id,
            name: user.name,
            email: user.email,
            token: token
        })
    })
}