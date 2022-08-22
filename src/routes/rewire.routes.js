module.exports = app => {
    const rewire = require('../controllers/rewire.controller.js');

    let router = require('express').Router();

    router.post('/', rewire.create);

    router.get('/', rewire.findAll);

    router.get('/:id', rewire.findOne);

    router.put('/:id', rewire.update);

    router.delete('/:id', rewire.delete);

    app.use('/api/rewire', router);
}