const {
    Share,
    UserPortfolio,
    SharePortfolio
} = require('../models/AllModels')

async function portfolioFinder(userId) {

    let portfolio = await UserPortfolio.findOne({
        where: {
            userId : userId
        }
    }).then(res => {

        if (res== null) {
            return 0
        }

        return res.id

    }).catch((error) => {
        console.error('Failed to retrieve data : ', error);

        return -1
    });

    return portfolio
}

async function create(createData) {
    let portfolio = await UserPortfolio.create(createData).then(res => {
        if (res == null) {
            return 0
        }

        return res.id

    }).catch((error) => {
        console.error('Failed to creating data : ', error);

        return -1
    });

    return portfolio
}

async function update(updateParams, whereParams) {
    let shareUpdate = await UserPortfolio.update(updateParams,
    { where: whereParams })
    .then((res) => {
        if (res != null ) {
            return true
        }

        return false
    }).catch((err) => {
        console.log("shareportfolio create : " + err)

        return false
    })

    return shareUpdate
}

module.exports = {
    portfolioFinder,
    create,
    update
}