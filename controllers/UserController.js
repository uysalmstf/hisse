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

    
}

module.exports = {
    login,
    create
}