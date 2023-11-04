const express = require("express")
const router = express.Router();
const ShareController = require("../controllers/ShareController")
const TokenMiddleware = require('../middlewares/TokenMiddleware')


router.post('/share/list', TokenMiddleware, ShareController.list)
router.post('/share/buy', TokenMiddleware, ShareController.buy)
router.post('/share/sell', TokenMiddleware, ShareController.sell)

module.exports = router