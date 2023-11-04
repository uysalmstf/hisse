const express = require('express')
const app = express()
const dotenv = require('dotenv')
const sequelize = require('./config/sequalize')
const cors = require('cors')
const helmet = require('helmet');

app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config()

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

const port = process.env.PORT

const userRoutes = require('./routes/UserRoutes')
const userPortfolioRoutes = require('./routes/UserPortfolioRoutes')
const shareRoutes = require('./routes/ShareRoutes')

app.use(userRoutes)
app.use(userPortfolioRoutes)
app.use(shareRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })