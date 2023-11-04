const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../config/sequalize')
const User = require('./UserModel')

const UserPortfolio = sequelize.define("user_portfolio", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
 });


 module.exports = UserPortfolio