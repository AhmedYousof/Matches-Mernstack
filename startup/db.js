const mongoose = require('mongoose');
module.exports = function () {

const db = "mongodb://user:user1234@ds145275.mlab.com:45275/matches-task"
mongoose
.connect(db,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: false,
    useFindAndModify: false
  })
.then(() => { console.log("DataBase Connected...")})
.catch((err) => { console.log(err)});
}
