var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var todoListSchema = new Schema( {
  task      : String,
  completed : {type: Boolean, default:false},
  created_at: Date,
  update_at : Date
});

// custom method to add current Date
todoListSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.update_at = currentDate;

  if(!this.created_at) this.created_at = currentDate;
  next();
});

module.exports = mongoose.model('TodoList',todoListSchema);
