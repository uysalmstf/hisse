const UserPortfolio = require('../models/UserPortfolioModel')
const jwt = require('../utils/JwtHelper')

async function create(req, res) {
    
    const token = req.headers["x-access-token"];
    const reqData = jwt.decodeHeader(token)
    
    if (reqData.userId == null) {
        res.status(200).json({ 
            error: true,
            message: "Tekrar login olunuz"
          }); 
    }

    let isPortfolioExist = await UserPortfolio.findOne({
        where: {
            userId : reqData.userId
        }
    }).then(res => {

        if (res== null) {
            return 0
        }

        return res.id

    }).catch((error) => {
        console.error('Failed to retrieve data : ', error);

        return -1
    });

    if (isPortfolioExist == 0) {

        let isCreated = await UserPortfolio.create({
            userId: reqData.userId,
        }).then(res => {
            if (res.id == null) {
                return 0
            }

            return res.id

        }).catch((error) => {
            console.error('Failed to creating data : ', error);

            return -1
        });

        if(isCreated > 0) {

            res.status(200).json({ 
                error: false,
                message: "Bu hesaba ait portföy hesabı oluşturulmuştur"
              });
        }

        res.status(200).json({ 
            error: true,
            message: "Bu hesaba ait zaten portföy hesabı oluşturulmuştur"
          });

    }

    res.status(200).json({ 
        error: true,
        message: "Bu hesaba ait zaten portföy hesabı oluşturulmuştur"
      });
}


module.exports = {
    create
}