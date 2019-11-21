'use strict';
module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model

  const hashPassword = require('../helper/hashPassword')

  class User extends Model{
    getFullName(){
      return `${this.firstName} ${this.lastName}`
    }
  }

  User.init({
    firstName : DataTypes.STRING,
    lastName : DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    role: DataTypes.STRING,
    balance: {
      type :DataTypes.STRING,
      validate : {
        isNull(value){
          if(value === "") throw new Error('Balance cannot be empty')
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate : {
        isNull(value){
          if(!value) throw new Error('Email cannot be empty')
        },
        isEmail:{
          args : true,
          msg : 'Invalid email format'
        },
        isUnique(value){
          return User.findOne({where:{email:value}})
            .then(user=>{
              if(user && user.id !== Number(this.id)){
                throw new Error('Email is not available')
              }
            })
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      validate : {
        len : {
          args : [8,100],
          msg : 'The minimum password is 8 and the maximum is 100'
        }
      }
    }
  }, {
    hooks:{
      beforeCreate : (user) =>{
        user.balance = 0
        user.password = hashPassword(user.password)
      },
      beforeUpdate : (user) => {
        user.password = hashPassword(user.password)
      }

    },
    sequelize
  })

  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Event, {through : models.Ticket })
  };

  return User;
};