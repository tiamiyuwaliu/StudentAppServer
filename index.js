const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 500;
const routes = require('./routes/api');
require('dotenv').config();

mongoose
    .connect(process.env.DB, {useNewUrlParser: true})
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.log(err));
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use('/api', routes)

app.get('/', (req, res) => res.send('Hello World!!'))
app.listen(port, () => console.log('Simple Express app listening on port' + port))