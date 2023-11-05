const jwt = require('../utils/JwtHelper')
const User = require('../models/UserModel')
//const UserPortfolio = require('../models/UserPortfolioModel')
const {
    Share,
    UserPortfolio,
    SharePortfolio,
    SharePortfolioLogs
} = require('../models/AllModels')

//const SharePortfolio = require('../models/SharePortfolioModel')

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

async function buy(req, res) {
    const token = req.headers["x-access-token"];
    const reqData = jwt.decodeHeader(token)
    const data = req.body
    
    if (reqData.userId == null) {
        res.status(200).json({ 
            error: true,
            message: "Tekrar login olunuz"
          }); 
    }

    if (data.share_id == null) {
        res.status(200).json({ 
            error: true,
            message: "Hisse yollanmamış"
          }); 
    }

    if (data.count == null) {
        res.status(200).json({ 
            error: true,
            message: "Hisse Adedi yollanmamış"
          }); 
    }

    let userPortfolioId = await User.findByPk(reqData.userId, {
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

    let shareCount = await Share.findOne({
        where: {
            id: data.share_id
        }
    }).then((share) => {
        return share.count ?? 0;
        }).catch((err) => {
            console.log(err)

            return -1;
        });

    if (shareCount <= 0) {
        res.status(200).json({ 
            error: true,
            message: "Hisse yeterli miktarda yoktur"
          }); 
    }    

    if (shareCount < data.count) {
        res.status(200).json({ 
            error: true,
            message: "Daha az sayıda hisse almalısınız"
          }); 
    }

    if (shareCount - data.count < 0) {
        res.status(200).json({ 
            error: true,
            message: "Daha az sayıda hisse almalısınız"
          }); 
    }

    let portfolioShareExist2
    portfolioShareExist = await SharePortfolio.findOne({
        where: {
            userPortfolioId: userPortfolioId,
            shareId: data.share_id
        }
    }).then((res) => {
        portfolioShareExist2 = res.dataValues
    }).catch((err) => {
        console.log("shareportfolio find : " + err)

        return null
    })

    let shareSave2
    if (portfolioShareExist2 != null) {
        shareSave = await SharePortfolio.update({
            userPortfolioId: userPortfolioId,
            shareId: data.share_id,
            count: portfolioShareExist2.count + data.count
        },
        { where: { id: portfolioShareExist2.id } }).then((res) => {
            shareSave2 =  true
        }).catch((err) => {
            console.log("shareportfolio create : " + err)
    
            return -1
        })


    } else {

        shareSave = await SharePortfolio.create({
            userPortfolioId: userPortfolioId,
            shareId: data.share_id,
            count: data.count
        }).then((res) => {
            shareSave2 =  true
        }).catch((err) => {
            console.log("shareportfolio create : " + err)
    
            return false
        })
    }

   if (shareSave2) {
    
        //TODO: add transaction log

        shareUpdate = await Share.update({
            count: shareCount - data.count
        },
        { where: { id: data.share_id } })
        .then((res) => {
            return res.id ?? 0
        }).catch((err) => {
            console.log("shareportfolio create : " + err)
    
            return -1
        })

        shareLogSave = await SharePortfolioLogs.create({
            desc: "Satın alma",
            count: data.count,
            userId: reqData.userId,
            shareId: data.share_id
        }).then((res) => {
            return res.id ?? 0
        }).catch((err) => {
            console.log("shareportfolio create : " + err)
    
            return -1
        })

        res.status(200).json({ 
            error: false,
            message: "Satın Alma Tamamlandı"
          }); 

   }


}

async function sell(req, res) {
    const token = req.headers["x-access-token"];
    const reqData = jwt.decodeHeader(token)
    const data = req.body

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


}


module.exports = {
    list,
    buy,
    sell
}