const jwt = require('../utils/JwtHelper')
const md5 = require('../utils/MD5')
const ResponseHelper = require('../utils/ResponseHelper')
const UserService = require('../services/UserServices')

async function login(req, res) {
    const data = req.body
    if (data.email == null) {
        ResponseHelper.prepareReponse(res, true, "Email Boş Bırakılamaz")
    }
    if (data.pass == null) {
        ResponseHelper.prepareReponse(res, true, "Şifre Boş Bırakılamaz")
    }

    let md5Pass = md5.createMD5(data.pass);

    const userExist = await UserService.getUserWithEmailPassword(data.email, md5Pass)

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

    const userExist = await UserService.getUserWithEmail(data.email)

    if (userExist != 0) {
        
        ResponseHelper.prepareReponse(res, true, "Aynı emaile sahip kullanıcı vardır. Login Olunuz")
    }

    const user = await UserService.createUser(data.email, md5Pass)

    if (user > 0) {

        ResponseHelper.prepareReponse(res, true, "Kayıt Olundu")
    }

    ResponseHelper.prepareReponse(res, true, "Kayıt Olunamadı")

}

module.exports = {
    login,
    create
}