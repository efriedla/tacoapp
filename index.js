var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var morgan = require('morgan');
var db = require('./models');
var session = require('express-session');
var bcrypt = require('bcrypt');
var app = express();

app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public/'));

//CONFIGURING SESSION MIDDLEWARE ************************************************
app.use(session({
  secret: 'secrets out pizza is chill',
  resave: false, //wont conitiously save even if nothing has changed
  saveUninitialized: true
}));

//creating custom middlewear ***************************************
app.use(function(req, res, next){
  req.getParamNames = function(){
    return Object.keys(req.params);
  }
  next();
});

app.get('/', function(req, res) {

  req.session.lastPage = '/';
  //password "this will normally be grabed from a form", number of rounds to inbed,
  bcrypt.hash('password', 10, function(err, hash){
    console.log('*********my hash:', hash);
  });
  res.render('index');
});
//**********************************************************
app.get('/sum/:x/:y', function(req, res) {
  res.send(req.getParamNames());
});
//outputs: ['x','y']

app.use('/tacos', require('./controllers/tacos'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
