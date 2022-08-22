module.exports = (sequelize, Sequelize) => {
    const Rewire = sequelize.define('rewire', {
        firstThought: {
            type: Sequelize.STRING
        },
        secondThought: {
            type: Sequelize.STRING
        },
        thirdThought: {
            type: Sequelize.STRING
        },
        fourthThought: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.STRING
        }
    });

    return Rewire;
}