const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const sequelize = require('./config/sequalize')
app.use(bodyParser.urlencoded({extended: false}))

dotenv.config()

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
 
const port = process.env.PORT

const userRoutes = require('./routes/UserRoutes')

app.use(userRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })