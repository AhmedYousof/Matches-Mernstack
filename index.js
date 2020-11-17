const express = require('express');
const app = express();
const logger = require('morgan');

const matches = require('./routes/index');


require("./startup/db")();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use('/api/matches', matches);



const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Listening on port ${port}... `));

module.exports = server
