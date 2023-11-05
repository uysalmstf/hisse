const {
    Share,
    UserPortfolio,
    SharePortfolio
} = require('../models/AllModels')

async function list() {
    let shareList = null;

    shareList = await Share.findAll().then((res) => {
        shareList = res
        return res
    }).catch((error) => {
        console.error('Failed to retrieve data : ', error);

        return -1
    });

    return shareList
}

async function findOne(id){
    let share = await Share.findOne({
        where: {
            id: id
        }
    }).then((share) => {
        return share
        }).catch((err) => {
            console.log(err)

            return null;
        });

    return share    
}

async function update(updateParams, whereParams) {
    let shareUpdate = await Share.update(updateParams,
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
    list,
    findOne,
    update
}