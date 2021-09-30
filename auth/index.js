const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../utils/error');

const secret = config.jwt.secret;


function sign(data) {
    data = JSON.parse(JSON.stringify(data));
            //Sign token with 1 hour of expiration time
    return jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60), data: data}, secret);
}

function verify(token) {
    return jwt.verify(token, secret);
}

const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);
        console.log(decoded);

        //Verify if owner or not
        if(decoded.id !== owner) {
            throw error('Access denied', 401);
        }
    },
    logged: function(req, owner) {
        const decoded = decodeHeader(req);
    }
}

function getToken(authorization) {
    if(!authorization) {
        throw error('No token was received', 401);
    }
    if(authorization.indexOf('Bearer ') === -1) {
        throw error('Invalid format', 401);
    }
    return authorization.replace('Bearer ','');
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded.data;

    return decoded;
}

module.exports = {
    sign,
    check,
}