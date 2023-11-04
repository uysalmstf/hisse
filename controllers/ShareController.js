const jwt = require('../utils/JwtHelper')
const User = require('../models/UserModel')
const UserPortfolio = require('../models/UserPortfolioModel')
const Share = require('../models/ShareModel')

async function list(req, res) {

    const token = req.headers["x-access-token"];
    const reqData = jwt.decodeHeader(token)
    
    if (reqData.userId == null) {
        res.status(200).json({ 
            error: true,
            message: "Tekrar login olunuz"
          }); 
    }

    let userPortfolioId = User.findByPk(reqData.userId, {
        include: UserPortfolio,
        }).then((user) => {
        return user.user_portfolio.id ?? 0;
        }).catch((err) => {
            console.log(err)

            return -1;
        });

    if (userPortfolioId <= 0) {
        res.status(200).json({ 
            error: true,
            message: "Portföy oluşturmalısınız"
          }); 
    }    

    let shareList = null;

    shareList = await Share.findAll().then((res) => {
        shareList = res

        return res
    }).catch((error) => {
        console.error('Failed to retrieve data : ', error);

        return -1
    });

    res.status(200).json({ 
        error: false,
        message: shareList
      }); 

}

function buy(req, res) {
    
}

function sell(req, res) {
    
}


module.exports = {
    list,
    buy,
    sell
}