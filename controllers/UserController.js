const jwt = require('../utils/JwtHelper')
const md5 = require('../utils/MD5')
const ResponseHelper = require('../utils/ResponseHelper')
const User = require('../models/UserModel')

async function login(req, res) {
    const data = req.body
    if (data.email == null) {
        ResponseHelper.prepareReponse(res, true, "Email Boş Bırakılamaz")
    }
    if (data.pass == null) {
        ResponseHelper.prepareReponse(res, true, "Şifre Boş Bırakılamaz")
    }

    let md5Pass = md5.createMD5(data.pass);

    const userExist = await User.findOne({
        where: {
            email : data.email,
            pass: md5Pass
        }
    }).then(res => {
        if (res.id > 0) {
            return res.id
        }
        return 0
    }).catch((error) => {
        console.error('Failed to retrieve data : ', error);

        return -1
    });

    if (userExist > 0) {

           let token = jwt.generateJWTToken(userExist)
           ResponseHelper.prepareReponse(res, false, "Login Başarılı", token)
    }

    ResponseHelper.prepareReponse(res, true, "Login Başarısız")
}

async function create(req, res) {
    const data = req.body
    if (data.email == null) {
        ResponseHelper.prepareReponse(res, true, "Email Boş Bırakılamaz")
 
    }
    if (data.pass == null) {
        ResponseHelper.prepareReponse(res, true, "Şifre Boş Bırakılamaz")

    }

    let md5Pass = md5.createMD5(data.pass);

    const userExist = await User.findOne({
        where: {
            email : data.email
        }
    }).then(res => {
        if (res.id > 0) {
            return 1
        }
        return 0
    }).catch((error) => {
        console.error('Failed to retrieve data : ', error);

        return -1
    });

    if (userExist != 0) {
        
        ResponseHelper.prepareReponse(res, true, "Aynı emaile sahip kullanıcı vardır. Login Olunuz")
    }

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

        ResponseHelper.prepareReponse(res, true, "Kayıt Olundu")
    }

    ResponseHelper.prepareReponse(res, true, "Kayıt Olunamadı")

}

module.exports = {
    login,
    create
}