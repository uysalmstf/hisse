const jwt = require('jsonwebtoken');

function generateJWTToken(pass) {
    let data = { 
        time: Date(), 
        userId: pass, 
    } 
  
    const token = jwt.sign(data, process.env.TOKEN_SECRET); 

    return token;
  }

module.exports = {
    generateJWTToken
}  