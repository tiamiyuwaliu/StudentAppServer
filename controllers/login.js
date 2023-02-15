const User = require('../models/user');
var bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
const fs = require('fs');

exports.signIn = (req, res) => {

    User.findOne({
        email: req.body.email,
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({messsage: err})
            return;
        }
        if (!user) {
            return res.status(404).send({message: "User Not Found."})
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({message: "Invalid Password!"})
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