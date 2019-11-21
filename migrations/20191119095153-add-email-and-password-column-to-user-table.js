'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   const promises = [
    queryInterface.addColumn('Users','email',Sequelize.STRING),
    queryInterface.addColumn('Users','password',Sequelize.STRING)
   ]
   return Promise.all(promises)

   
  },

  down: (queryInterface, Sequelize) => {
    const promises = [
      queryInterface.removeColumn('Users','email'),
      queryInterface.removeColumn('Users','password')
    ]
    return Promise.all(promises)
  }
};
