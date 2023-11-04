const express = require("express")
const router = express.Router();
const UserPortfolioController = require("../controllers/UserPortfolioController")
const TokenMiddleware = require('../middlewares/TokenMiddleware')

router.post('/user_portfolio/create',TokenMiddleware, UserPortfolioController.create)

module.exports = router