const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../config/sequalize')

const User = sequelize.define("user", {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pass: {
      type: DataTypes.STRING,
    }
 });

 module.exports = User