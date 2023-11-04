const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../config/sequalize')

const Share = sequelize.define("share", {
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
    },
    buy_price: {
        type: DataTypes.DECIMAL
    },
    sell_price: {
        type: DataTypes.DECIMAL
    },
    count: {
        type: DataTypes.INTEGER
    }

 });

 module.exports = Share