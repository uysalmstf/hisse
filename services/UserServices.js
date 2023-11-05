const User = require('../models/UserModel')
const {
    Share,
    UserPortfolio,
    SharePortfolio,
    SharePortfolioLogs
} = require('../models/AllModels')


async function getUserWithEmailPassword(email, password) {
    const user = await User.findOne({
        where: {
            email : email,
            pass: password
        }
    }).then(res => {

        if (res != null) {
            return res.id
        }

        return 0

    }).catch((error) => {
        console.error('Failed to retrieve data : ', error);

        return -1
    });

    return user
}

async function getUserWithEmail(email) {
    const user = await User.findOne({
        where: {
            email : email,
        }
    }).then(res => {

        if (res != null) {
            return res.id
        }

        return 0

    }).catch((error) => {
        console.error('Failed to retrieve data : ', error);

        return -1
    });

    return user
}

async function createUser(email, pass) {
    const user = await User.create({
        email: email,
        pass: pass,
    }).then(res => {
        return res.id
    }).catch((error) => {
        console.error('Failed to create a new record : ', error);

        return 0
    });

    return user
}

async function findUserPortfolioWithPK(userId) {
    let userPortfolioId = User.findByPk(userId, {
        include: UserPortfolio,
        }).then((userPortfolio) => {
            if (userPortfolio != null && userPortfolio.user_portfolio != null) {
                return userPortfolio
            }
            return null
        }).catch((err) => {
            console.log(err)

            return null;
        });

        return userPortfolioId
}

module.exports = {
    getUserWithEmailPassword,
    getUserWithEmail,
    createUser,
    findUserPortfolioWithPK
}