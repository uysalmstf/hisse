const express = require("express")
const router = express.Router();
const UserController = require("../controllers/UserController")

router.post('/user/create', UserController.create)
router.post('/user/login', UserController.create)

module.exports = router