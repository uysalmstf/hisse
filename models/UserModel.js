const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../config/sequalize')

const {
  Share,
  UserPortfolio,
  SharePortfolio,
  SharePortfolioLogs
} = require('../models/AllModels')

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
 User.hasMany(SharePortfolioLogs)
 
 module.exports = User