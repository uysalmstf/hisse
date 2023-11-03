const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}))

dotenv.config()

const port = process.env.PORT

const userRoutes = require('./routes/UserRoutes')

app.use(userRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })