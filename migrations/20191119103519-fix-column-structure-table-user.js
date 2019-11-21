'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const promises = [
      queryInterface.removeColumn('Users','name'),
      queryInterface.addColumn('Users','firstName',Sequelize.STRING),
      queryInterface.addColumn('Users','lastName',Sequelize.STRING)
    ]
    return Promise.all(promises)
  },

  down: (queryInterface, Sequelize) => {
    const promises = [
      queryInterface.addColumn('Users','name',Sequelize.STRING),
      queryInterface.removeColumn('Users','firstName'),
      queryInterface.removeColumn('Users','lastName')
    ]
    return Promise.all(promises)
  }
};
