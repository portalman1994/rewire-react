const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;
checkDuplicateEmailOrUsername = (req, res, next) => {

    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: 'Provided username is already in use!'
            })
            return;
        }
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(email => {
            if (email) {
                res.status(400).send({
                    message: 'Provided email is already in use!'
                })
                return;
            }
            next();
        });
    });
};
checkIfRolesExist = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: 'Role does not exist! = ' + req.body.roles[i]
                });
                return;
            }
        }
    }
    next();
};
const verifySignUp = {
    checkDuplicateEmailOrUsername: checkDuplicateEmailOrUsername,
    checkIfRolesExist: checkIfRolesExist
};
module.exports = verifySignUp;