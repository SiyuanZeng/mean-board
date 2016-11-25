// Post.js

var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
	status: {type: String, required: true},
	my_task: {type: String}	
});

var Task = mongoose.model('task', taskSchema);

module.exports = Task;