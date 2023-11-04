const jwt = require('jsonwebtoken');

function generateJWTToken(userID) {
    let data = { 
        time: Date(), 
        userId: userID, 
    } 
  
    const token = jwt.sign(data, process.env.TOKEN_SECRET); 

    return token;
}

function decodeHeader(token) {

    token  = token.split(" ")[1]

    return jwt.verify(token, process.env.TOKEN_SECRET);
}

module.exports = {
    generateJWTToken,
    decodeHeader
}  