//const UserPortfolio = require('../models/UserPortfolioModel')
const jwt = require('../utils/JwtHelper')
const UserPortfolioService = require('../services/UserPortfolioService')
const ResponseHelper = require('../utils/ResponseHelper')


async function create(req, res) {
    
    const token = req.headers["x-access-token"];
    const reqData = jwt.decodeHeader(token)
    
    if (reqData.userId == null) {
        ResponseHelper.prepareReponse(res, true, 'Tekrar login olunuz')
    }

    let isPortfolioExist = await UserPortfolioService.portfolioFinder(reqData.userId)

    if (isPortfolioExist == 0) {

        isCreated = await UserPortfolioService.create(reqData.userId)

        if(isCreated > 0) {

            ResponseHelper.prepareReponse(res, false, 'Bu hesaba ait portföy hesabı oluşturulmuştur')

        }

        ResponseHelper.prepareReponse(res, false, 'Bu hesaba ait portföy hesabı zaten oluşturulmuştur')

    }

    ResponseHelper.prepareReponse(res, false, 'Bu hesaba ait portföy hesabı zaten oluşturulmuştur')
}

module.exports = {
    create
}