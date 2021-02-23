
const express = require('express')
const app = express()
const routes = require('./routes/index.js');
const config = require('./config/global.js');
const bodyParser = require('body-parser');
const parseWithoutProcessing = require('handlebars');
var createError = require('http-errors');

var cors = require('cors')
var path = require('path');

// console.log("FIREBASE: ", messaging)



//app.use(expressValidator())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('trust proxy', 1)

app.use(express.static(path.join(__dirname, 'build')));

//install mongoose
var mongoose = require('mongoose');
console.log("MONGODB_URI ", config.database.MONGODB_URI)
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true)


mongoose.connect(config.database.MONGODB_URI, { useNewUrlParser:  true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected to MongoDb");
    // log.info("Mongo Connected",{"userId": 1, "module": "ticket"});
});



const localIP = 'localhost';
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://' + localIP + ':4200');
//     //res.setHeader('Access-Control-Allow-Origin', 'http://'+localIP+':3000, http://localhost')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     if ('OPTIONS' == req.method) {
//         return res.sendStatus(200);
//     } else {
//         next();
//     }
// });

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://angular-10-project.herokuapp.com/');
    //res.setHeader('Access-Control-Allow-Origin', 'http://'+localIP+':3000, http://localhost')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if ('OPTIONS' == req.method) {
        return res.sendStatus(200);
    } else {
        next();
    }
});

routes(app);
app.get('/ssfirebase-messaging-sw.js', function (req, res) {
    console.log("in firebase get clalll")
    res.status(200).sendFile(__dirname + '/firebase-messaging-sw.js')
})

app.get('/', (req, res) => {
    return res.status(200).sendFile(__dirname + '/build/index.html')
})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('error')

})

module.exports = app