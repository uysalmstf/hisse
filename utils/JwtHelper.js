const jwt = require('jsonwebtoken');

function generateJWTToken(userID) {
    let data = { 
        time: Date(), 
        userId: userID, 
    } 
  
    const token = jwt.sign(data, process.env.TOKEN_SECRET); 

    return token;
  }

module.exports = {
    generateJWTToken
}  