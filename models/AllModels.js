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


//burada sadece hisseleri olusturdum. Diger islemleri API Endpointleri yardimiyla yapabilirsiniz.
const ShareData = [
  { code: 'ABC', name: 'Deneme 1', buy_price: 1.50, sell_price: 2.50, count: 100 },
  { code: 'DEF', name: 'Deneme 2', buy_price: 2.50, sell_price: 3.50, count: 200 },
  { code: 'GHI', name: 'Deneme 3', buy_price: 3.50, sell_price: 4.50, count: 300 },
  { code: 'JKL', name: 'Deneme 4', buy_price: 4.50, sell_price: 5.50, count: 400 }

];

Share.bulkCreate(ShareData)
  .then((users) => {
    console.log('Bulk data insertion successful');
  })
  .catch((error) => {
    console.error('Error inserting bulk data: ' + error.message);
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