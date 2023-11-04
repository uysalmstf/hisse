function getDateWithFormat() {
    
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); 
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    return year + "-" + (month + 1) + "-" + day + " " + hours + ":" + minutes + ":" + seconds 
}

module.exports = {
    getDateWithFormat
}