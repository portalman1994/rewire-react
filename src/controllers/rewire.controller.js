const db = require('../models');
const Rewire = db.rewire;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    const rewire = {
        firstThought: req.body.firstThought,
        secondThought: req.body.secondThought,
        thirdThought: req.body.thirdThought,
        fourthThought: req.body.fourthThought,
        date: req.body.date
    };

    Rewire.create(rewire)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'An error occured while creating the thoughts.'
            });
        });
};

exports.findAll = (req, res) => {
    Rewire.findAll({attributes: ['firstThought', 'secondThought', 'thirdThought', 'fourthThought', 'date', 'id']})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: 
                    err.message || 'An error occured while retreiving the thoughts.'
            });
        });    
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Rewire.findByPk(id)
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Can not find thoughts with id=${id}`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Error retrieving thoughts with id=${id}`

        });
    });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Rewire.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: 'Successfully updated thoughts.'
                });
            } else {
                res.send({
                    message: `Can not update thoughts with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error updating thoughts with id=${id}`
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Rewire.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: 'Thoughts were deleted successfully!'
            });
        } else {
            res.send({
                message: `Can not delete thoughts with id=${id}.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Error deleting thoughts with id=${id}`
        });
    });
};