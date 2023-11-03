const { Sequelize, DataTypes } = require("sequelize");

const User = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pass: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATEONLY,
    }
 });

 module.exports = User