var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var todoListSchema = new Schema( {
  task      : String,
  completed : {type: Boolean,  default:false},
  created_at: Date,
  update_at : Date
});

module.exports = mongoose.model('TodoList',todoListSchema);
