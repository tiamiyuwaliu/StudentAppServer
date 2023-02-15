var jwt = require('jsonwebtoken');
const fs = require('fs');
verifyAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send({message: "Unauthorized!!"})
    }
    const token = req.headers.authorization.split(' ')[1];
    if (process.env.AUTHMETHOD === 'basic') {
        if (token !== process.env.API_KEY) {
            return res.status(401).send({message: "Unauthorized!!"})
        }
    } else {
        let privateKey = fs.readFileSync('../keys/private.pem', 'utf8');
        jwt.verify(token, privateKey, (err, decoded) => {
            if (err) {
                return res.status(401).send({message: "Unauthorized!!"})
            }
            req.userId = decoded.id
        })
    }
    next();
}

module.exports = {verifyAuth};