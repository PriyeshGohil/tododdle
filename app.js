var express = require('express');
var mongoose = require('mongoose');
var TodoList = require('./models/TodoList_model');

var app = express();

app.set('view engine', 'hbs');

// dir public holds all static files
app.use(express.static('public'))

// mongodb connection
mongoose.connect('mongodb://localhost/test');


app.get('/' , function(req,res) {
  console.log('working');
  var dummyData = new TodoList({
    
  })
  res.render('index', {name:'bob'});
});







// server setup
app.listen(3000, function() {
  console.log('server started!');
});
