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

 const UserPortfolio = sequelize.define("user_portfolio", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    budget: {
      type: DataTypes.DECIMAL
    }
 });

 const SharePortfolio = sequelize.define("share_portfolio", {
    count: {
        type: DataTypes.INTEGER
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }

 });

 const SharePortfolioLogs = sequelize.define("share_portfolio_log", {
  count: {
      type: DataTypes.INTEGER
  },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  desc: {
    type: DataTypes.TEXT
  },
  price: {
    type: DataTypes.DECIMAL
  }
});

 Share.belongsToMany(UserPortfolio, {through: SharePortfolio})
 UserPortfolio.belongsToMany(Share, {through: SharePortfolio})
 Share.hasMany(SharePortfolioLogs)
 
 module.exports = {
    Share,
    UserPortfolio,
    SharePortfolio,
    SharePortfolioLogs
 }