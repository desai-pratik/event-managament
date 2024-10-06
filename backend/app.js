require('dotenv').config();
const express = require('express');
const app = express();
const mongoose=require('mongoose')
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const userRoutes = require('./api/routes/user');
const eventRoutes=require('./api/routes/event');
const error = require('./error');


const db = process.env.DATABASE_URL

mongoose.set('strictQuery', false)
mongoose.connect(db).then(() => {
    console.log('connection successful');
}).catch((err) => console.log('Error connecting to database'))
mongoose.Promise = global.Promise;


app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

app.use('/Uploads',express.static('Uploads'))

app.use('/user', userRoutes);
app.use('/event',eventRoutes)
app.use(error);

module.exports = app;