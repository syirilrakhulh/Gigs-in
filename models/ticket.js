'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model

  class Ticket extends Model{
    static getInvoiceCode(event,userId,qty){
      let code = 'INV-'
      const name = event.name.split(' ')
      for(let i = 0;i < name.length;i++){
        code += name[i][0].toUpperCase()
      }
      const random = Math.floor(Math.random()*100)
      code += `-${event.date.split('-').reverse().join('').slice(0,4)}`
      code += `-${qty}${random}${userId}`
      return code
    }

    getTotal(price){
      const total = this.quantity * price
      return total
    }

  }

  Ticket.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    invoice: DataTypes.STRING,
    EventId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    quantity: {
      type :DataTypes.INTEGER,
      validate : {
        isNull(value){
          if(!value || value === 0) throw new Error('Quantity cannot be empty')
        },
      }
    },
    status: DataTypes.STRING
  }, {sequelize})

  Ticket.associate = function(models) {
    // associations can be defined here
    Ticket.belongsTo(models.Event)
    Ticket.belongsTo(models.User)
  };

  return Ticket;
};