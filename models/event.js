'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model

  class Event extends Model{}

  Event.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    price: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    image : DataTypes.BLOB
  }, {sequelize})

  Event.associate = function(models) {
    // associations can be defined here
    Event.belongsToMany(models.User, {through : models.Ticket })
  };

  return Event;
};