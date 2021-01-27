const mongoose = require('mongoose');

//Connection to mongoDb
mongoose.connect(process.env.MongoDB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(() => console.log('My app is connected to MongoDb'))
    .catch((err) => console.error("Couldn't connect to MongoDb", err))


module.exports = mongoose