const isLogin = (request, response, next) => {
    let isLogin = false;

    if (request.headers["x-access-token"] != null) {
        isLogin = true;
    }

    if (isLogin)
        next();
    else
        response.json({error: true, message: 'Giriş Yapmalısınız'});
};

module.exports = isLogin;