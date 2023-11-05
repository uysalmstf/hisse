const {
    Share,
    UserPortfolio,
    SharePortfolio,
    SharePortfolioLogs
} = require('../models/AllModels')


async function create(saveParams) {
    let shareLogSave = await SharePortfolioLogs.create(saveParams).then((res) => {
        if (res != null ) {
            return true
        }

        return false
    }).catch((err) => {
        console.log("shareportfolio create : " + err)

        return false
    })
    
    return shareLogSave
}

module.exports = {
    create
}