const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../config/sequalize')

const UserPortfolio = require('./UserPortfolioModel')


const User = sequelize.define("user", {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pass: {
      type: DataTypes.STRING,
    }
 });

 User.hasOne(UserPortfolio);

 module.exports = User