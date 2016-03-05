var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var TodoList = require('./models/TodoList_model');

var app = express();
var router = express.Router();

// using handlebars.
app.set('view engine', 'hbs');

// dir public holds all static files
app.use(express.static('public'))

// configure body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// mongodb connection
mongoose.connect('mongodb://localhost/test');

var apiName = '/todoList';

// add new todo task.
router.route(apiName).post(function(req,res) {
  var todoList = new TodoList();
  todoList.task = req.body.task;

  todoList.save(function(err) {
    if(err) res.send(err);
    res.json({message : 'New task added!'});
  });
});

// get all todo tasks
// TODO: get ride of _id key.
router.route(apiName).get(function(req,res) {
  TodoList.find(function(err,lists) {
    if(err) res.send(err);
    res.json(lists);
  }).select('task completed update_at');
});

// update an todo task
router.route(apiName+'/:task_id').put(function(req,res) {
  TodoList.findById(req.params.task_id , function(err,todo) {
    if(err) res.send(err);
    todo.task = req.body.task;

    todo.save(function(err) {
      if(err) req.send(err);
      res.json({message : 'task updated' , task :todo.task});
    });
  });
});

//delete task
router.route(apiName+'/:task_id').delete(function(req,res) {
  var todoItem = {_id : req.params.task_id};

  TodoList.remove(todoItem, function(err,task) {
    if(err) req.send(err);
      res.json({message : 'task: ' + task.task + ' deleted'});
    });
});

router.get('/', function(req,res) {
  res.json({message: 'welcome to out api'});
});

// all our routes will be prefixed with /api
app.use('/api' ,router);

// server setup
app.listen(3000, function() {
  console.log('server started!');
});
