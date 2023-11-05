function prepareReponse(response, errorStatus, message, data = null) {
        
    let code = 200
    if (errorStatus) {
        code = 400
    }
    
    if (data == null) {
        response.json({ 
            error: errorStatus,
            message: message
        }); 
    } else {

        response.json({ 
            error: errorStatus,
            message: message,
            data: data
        }); 
    }
     
}

module.exports = {
    prepareReponse
}