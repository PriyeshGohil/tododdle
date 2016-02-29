var express = require('express');
var hbs = require('hbs');


var app = express();

          /* app config */
app.set('view engine', 'hbs');
// dir public holds all static files
app.use(express.static('public'))




app.get('/' , function(req,res) {
  console.log('working');
  res.render('index', {name:'bob'});
});





// server setup
app.listen(3000, function() {
  console.log('server started!');
});
