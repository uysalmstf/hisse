const jwt = require('../utils/JwtHelper')
const md5 = require('../utils/MD5')
const DateHelper = require('../utils/DateHelper')
const User = require('../models/UserModel')

function login(req, res) {
    console.log("hello")
}

async function create(req, res) {
    const data = req.body
    if (data.email == null) {
        res.status(200).json({ 
            error: true,
            message: "Email Boş Bırakılamaz"
          }); 
    }
    if (data.pass == null) {
        res.status(200).json({ 
            error: true,
            message: "Şifre Boş Bırakılamaz"
          }); 
    }

    let md5Pass = md5.createMD5(data.pass);

    const user = await User.create({
        email: data.email,
        pass: md5Pass,
    }).then(res => {
        return res.id
    }).catch((error) => {
        console.error('Failed to create a new record : ', error);

        return 0
    });


    if (user > 0) {
        res.status(200).json({ 
            error: false,
            message: "İşlem Tamamlandı"
          }); 
    }

    res.status(200).json({ 
        error: true,
        message: "Kayıt Olunamadı"
      }); 
}

module.exports = {
    login,
    create
}