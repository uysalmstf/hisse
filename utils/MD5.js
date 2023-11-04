const crypto = require('crypto')

function createMD5(pass) {
    let hash = crypto.createHash('md5').update(pass).digest("hex")

    return hash
}

module.exports = {
    createMD5
}