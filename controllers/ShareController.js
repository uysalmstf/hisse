const jwt = require('../utils/JwtHelper')
const UserService = require('../services/UserServices')
const ShareService = require('../services/ShareService')
const SharePortfolioService = require('../services/SharePortfolioService')
const SharePortfolioLogsService = require('../services/SharePortfolioLogsService')
const ResponseHelper = require('../utils/ResponseHelper')



async function list(req, res) {

    const token = req.headers["x-access-token"];
    const reqData = jwt.decodeHeader(token)
    
    if (reqData.userId == null) {
        ResponseHelper.prepareReponse(res, true, 'Tekrar Login olunuz')
    }

    let userPortfolioId = UserService.findUserPortfolioWithPK(reqData.userId)

    if (userPortfolioId <= 0) {
        ResponseHelper.prepareReponse(res, true, 'Portföy Oluşturmalısınız')

    }    

    let shareList = null;

    shareList = await ShareService.list()

    if (shareList != -1 ) {
        ResponseHelper.prepareReponse(res, false, 'İşlem Başarılı', shareList)

    } else {
        ResponseHelper.prepareReponse(res, true, 'İşlem Başarısız')

    }

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

    let userPortfolioId = await UserService.findUserPortfolioWithPK(reqData.userId)

    if (userPortfolioId <= 0) {
        ResponseHelper.prepareReponse(res, true, 'Portföy Oluşturulmamış')

    }    

    let share = await ShareService.findOne(data.share_id)

    if (share.count <= 0) {

        ResponseHelper.prepareReponse(res, true, 'Hisse yeterli miktarda yoktur')
    }    

    if (share.count < data.count) {

        ResponseHelper.prepareReponse(res, true, 'Daha az sayıda hisse almalısınız')
    }

    if (share.count - data.count < 0) {

        ResponseHelper.prepareReponse(res, true, 'Daha az sayıda hisse almalısınız')
    }

    let portfolioShareExist2 = await SharePortfolioService.findSharePortfolio(userPortfolioId, data.share_id)

    let shareSave
    let shareSave2

    if (portfolioShareExist2 != null) {
        shareSave = await SharePortfolioService.update({
            userPortfolioId: userPortfolioId,
            shareId: data.share_id,
            count: portfolioShareExist2.count + data.count
        },
        { id: portfolioShareExist2.id })

    } else {

        shareSave = await SharePortfolioService.create({
            userPortfolioId: userPortfolioId,
            shareId: data.share_id,
            count: data.count
        })
    }

   if (shareSave2) {

        let shareUpdate = await ShareService.update({
            count: share.count - data.count
        },
         { id: data.share_id })
       

        let shareLogSave = await SharePortfolioLogsService.create({
            desc: "Satın alma",
            count: data.count,
            userId: reqData.userId,
            shareId: data.share_id
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

    let userPortfolioId = await UserService.findUserPortfolioWithPK(reqData.userId)

    if (userPortfolioId <= 0) {
        ResponseHelper.prepareReponse(res, true, 'Portföy Oluşturmalısınız')

    }    

    let share = await ShareService.findOne(data.share_id)

    if (share.count <= 0) {

        ResponseHelper.prepareReponse(res, true, 'Hisse yeterli miktarda yoktur')
    }
    
    let sharePortfolioExist = await SharePortfolioService.findSharePortfolio(userPortfolioId, data.share_id)

    if (sharePortfolioExist.id > 0) {

        if (sharePortfolioExist.count < data.count) {

            ResponseHelper.prepareReponse(res, true, 'Hisseyi daha az miktarda satmalısınız')

        } else if (sharePortfolioExist.count == data.count) {
            
            isDeleted = await SharePortfolioService.del(sharePortfolioExist.id)

            shareUpdate = await ShareService.update(
                {count: share.count + data.count},
                { id: data.share_id }
            )
    
            shareLogSave = await SharePortfolioLogsService.create({
                desc: "Satma",
                count: data.count,
                userId: reqData.userId,
                shareId: data.share_id
            })
    
            ResponseHelper.prepareReponse(res, false, 'Satma İşlemi tamamlandı')
              
        } else {

            let isUpdated = await SharePortfolioService.update(
                {count: sharePortfolioExist.count - data.count},
                {id: sharePortfolioExist.id}
                )

            let shareUpdate = await ShareService.update(
                {count: share.count + data.count}, 
            { id: data.share_id } 
            )
    
            shareLogSave = await SharePortfolioLogsService.create({
                desc: "Satma",
                count: data.count,
                userId: reqData.userId,
                shareId: data.share_id
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