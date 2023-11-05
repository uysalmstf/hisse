const {
    Share,
    UserPortfolio,
    SharePortfolio
} = require('../models/AllModels')

async function findSharePortfolio(userPortfolioId, share_id) {
    let portfolioShareExist2
    portfolioShareExist = await SharePortfolio.findOne({
        where: {
            userPortfolioId: userPortfolioId,
            shareId: share_id
        }
    }).then((res) => {
        portfolioShareExist = res.dataValues
    }).catch((err) => {
        console.log("shareportfolio find : " + err)

        return null
    })

    return portfolioShareExist2
}

async function create(saveParams) {
   let shareSave = await SharePortfolio.create(saveParams)
   .then((res) => {
        if (res != null) {
            return true
        }
        return false
    })
    .catch((err) => {
        console.log("shareportfolio create : " + err)

        return false
    })

    return shareSave

}

async function update(updateParams, updateWhere) {
   let shareSave = await SharePortfolio.update(updateParams,
    { where: updateWhere }
    ).then((res) => {
        if (res != null) {
            return true
        }
        return false
    }).catch((err) => {
        console.log("shareportfolio create : " + err)

        return false
    })

    return shareSave
}

async function del(id) {
    let isDeleted = await SharePortfolio.destroy({
        where: {
            id: id
        }
    }).then(() => {
        return true
    }).catch((error) => {
        console.error('Failed to delete record : ', error);
        return false

    });

    return isDeleted
}

module.exports = {
    findSharePortfolio,
    create,
    update,
    del
}