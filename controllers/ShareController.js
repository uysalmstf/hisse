const jwt = require('../utils/JwtHelper')
const User = require('../models/UserModel')
const ResponseHelper = require('../utils/ResponseHelper')

const {
    Share,
    UserPortfolio,
    SharePortfolio,
    SharePortfolioLogs
} = require('../models/AllModels')

async function list(req, res) {

    const token = req.headers["x-access-token"];
    const reqData = jwt.decodeHeader(token)
    
    if (reqData.userId == null) {
        ResponseHelper.prepareReponse(res, true, 'Tekrar Login olunuz')
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
        ResponseHelper.prepareReponse(res, true, 'Portföy Oluşturmalısınız')

    }    

    let shareList = null;

    shareList = await Share.findAll().then((res) => {
        shareList = res

        return res
    }).catch((error) => {
        console.error('Failed to retrieve data : ', error);

        return -1
    });

    ResponseHelper.prepareReponse(res, false, 'İşlem Başarılı', shareList)


}

async function buy(req, res) {
    const token = req.headers["x-access-token"];
    const reqData = jwt.decodeHeader(token)
    const data = req.body
    
    if (reqData.userId == null) {
        ResponseHelper.prepareReponse(res, true, 'Tekrar Login olunuz')

    }

    if (data.share_id == null) {
        ResponseHelper.prepareReponse(res, true, 'Hisse Yollanmamış')

    }

    if (data.count == null) {
        ResponseHelper.prepareReponse(res, true, 'Hisse Adedi Yollanmamış')

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
        ResponseHelper.prepareReponse(res, true, 'Portföy Oluşturulmamış')

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

        ResponseHelper.prepareReponse(res, true, 'Hisse yeterli miktarda yoktur')
    }    

    if (shareCount < data.count) {

        ResponseHelper.prepareReponse(res, true, 'Daha az sayıda hisse almalısınız')
    }

    if (shareCount - data.count < 0) {

        ResponseHelper.prepareReponse(res, true, 'Daha az sayıda hisse almalısınız')
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

        ResponseHelper.prepareReponse(res, false, 'Satın Alma Tamamlandı')
   }


}

async function sell(req, res) {
    const token = req.headers["x-access-token"];
    const reqData = jwt.decodeHeader(token)
    const data = req.body
    
    if (reqData.userId == null) {

        ResponseHelper.prepareReponse(res, true, 'Tekrar login olunuz')

    }

    if (data.share_id == null) {

        ResponseHelper.prepareReponse(res, true, 'Hisse yollanmamış')

    }

    if (data.count == null) {
        ResponseHelper.prepareReponse(res, true, 'Hisse Adedi yollanmamış')

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
        ResponseHelper.prepareReponse(res, true, 'Portföy Oluşturmalısınız')

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

        ResponseHelper.prepareReponse(res, true, 'Hisse yeterli miktarda yoktur')
    }
    
    let sharePortfolioExist = await SharePortfolio.findOne({
        where: {
            userPortfolioId: userPortfolioId,
            shareId: data.share_id
        }
    }).then((res) => {
        return res.dataValues
    }).catch((err) => {
        console.log(err)

        return -1;
    });

    if (sharePortfolioExist.id > 0) {
        


        if (sharePortfolioExist.count < data.count) {

            ResponseHelper.prepareReponse(res, true, 'Hisseyi daha az miktarda satmalısınız')

        } else if (sharePortfolioExist.count == data.count) {
            
            isDeleted = await SharePortfolio.destroy({
                where: {
                    id: sharePortfolioExist.id
                }
            }).then(() => {
                return true
            }).catch((error) => {
                console.error('Failed to delete record : ', error);
            });

            shareUpdate = await Share.update({
                count: shareCount + data.count
            },
            { where: { id: data.share_id } })
            .then((res) => {
                return res.id ?? 0
            }).catch((err) => {
                console.log("shareportfolio create : " + err)
        
                return -1
            })
    
            shareLogSave = await SharePortfolioLogs.create({
                desc: "Satma",
                count: data.count,
                userId: reqData.userId,
                shareId: data.share_id
            }).then((res) => {
                return res.id ?? 0
            }).catch((err) => {
                console.log("shareportfolio create : " + err)
        
                return -1
            })
    
            ResponseHelper.prepareReponse(res, false, 'Satma İşlemi tamamlandı')
              
        } else {

            isUpdated = await SharePortfolio.update({
                count: sharePortfolioExist.count - data.count
            },{
                where: {
                    id: sharePortfolioExist.id
                }
            }).then((res) => {
                return true
            }).catch((error) => {
                console.error('Failed to delete record : ', error);
            });

            shareUpdate = await Share.update({
                count: shareCount + data.count
            },
            { where: { id: data.share_id } })
            .then((res) => {
                return res.id ?? 0
            }).catch((err) => {
                console.log("shareportfolio create : " + err)
        
                return -1
            })
    
            shareLogSave = await SharePortfolioLogs.create({
                desc: "Satma",
                count: data.count,
                userId: reqData.userId,
                shareId: data.share_id
            }).then((res) => {
                return res.id ?? 0
            }).catch((err) => {
                console.log("shareportfolio create : " + err)
        
                return -1
            })

            ResponseHelper.prepareReponse(res, false, 'Satma İşlemi tamamlandı')
    
        }
    }

    ResponseHelper.prepareReponse(res, true, 'Hisseyi satmak için önce almanız gerekmektedir.')

}


module.exports = {
    list,
    buy,
    sell
}