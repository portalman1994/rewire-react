const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../models');
const User = db.user;
verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({
            message: 'Token was not provided!'
        });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                messsage: 'Unauthorized!'
            });
        }
        req.userId = decoded.id;
        next();
    });
};
isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === 'admin') {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: 'Requires Admin role!'
            });
            return;
        });
    });
};
isMod = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === 'moderator') {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: 'Requires Moderator role!'
            });
            return;
        });
    });
};
isAdminOrMod = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === 'moderator') {
                    next();
                    return;
                }
                if (roles[i].name === 'admin') {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: 'Requires Admin or Moderator role!'
            });
        });
    });
};

const authJWT = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isMod: isMod,
    isAdminOrMod: isAdminOrMod
};

module.exports = authJWT;