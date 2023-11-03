const jwt = require('../utils/JwtHelper')

function login(req, res) {
    console.log("hello")
}

function create(req, res) {
    const data = req.body
    if (data.email == null) {
        res.json({ 
            error: true,
            message: "Email Boş Bırakılamaz"
          }); 
    }
    if (data.pass == null) {
        res.json({ 
            error: true,
            message: "Email Boş Bırakılamaz"
          }); 
    }

    const token = jwt.generateJWTToken(data.pass);

    console.log(token)


}

module.exports = {
    login,
    create
}