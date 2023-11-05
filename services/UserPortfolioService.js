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

async function create(userId) {
    let portfolio = await UserPortfolio.create({
        userId: userId,
    }).then(res => {
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

module.exports = {
    portfolioFinder,
    create
}