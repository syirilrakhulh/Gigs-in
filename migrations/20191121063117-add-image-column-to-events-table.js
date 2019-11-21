'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Events','image',Sequelize.BLOB)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Events','image')
  }
};
