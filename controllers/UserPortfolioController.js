//const UserPortfolio = require('../models/UserPortfolioModel')
const jwt = require('../utils/JwtHelper')
const UserPortfolioService = require('../services/UserPortfolioService')
const ResponseHelper = require('../utils/ResponseHelper')


async function create(req, res) {
    
    const token = req.headers["x-access-token"];
    const reqData = jwt.decodeHeader(token)
    const data = req.body
    
    if (reqData.userId == null) {
        ResponseHelper.prepareReponse(res, true, 'Tekrar login olunuz')
    }

    if (data.budget <= 0) {
        ResponseHelper.prepareReponse(res, true, 'Hesap açma tutarı en az 1 TL olmalıdır.')
    }

    let isPortfolioExist = await UserPortfolioService.portfolioFinder(reqData.userId)

    if (isPortfolioExist == 0) {

        let isCreated = await UserPortfolioService.create(
            {userId: reqData.userId, budget: data.budget.toFixed(2)}
            )

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