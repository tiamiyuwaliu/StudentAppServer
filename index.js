const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const port = process.env.PORT || 500;
const routes = require('./routes/api');
require('dotenv').config();

mongoose
    .connect(process.env.DB, {useNewUrlParser: true})
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.log(err));
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Origin, x-Reequested-With, Content-Type, Accept");
})
app.get('/', (req, res) => res.send('Hello World!!'))
app.listen(port, () => console.log('Simple Express app listening on port' + port))