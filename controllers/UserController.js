const jwt = require('../utils/JwtHelper')
const md5 = require('../utils/MD5')

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

    const md5Pass = md5.createMD5(data.pass);

    console.log(md5Pass)


}

module.exports = {
    login,
    create
}