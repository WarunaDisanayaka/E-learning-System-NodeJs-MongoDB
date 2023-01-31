const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    project:{
        type : String,
        required : [true,'Please enter Project Name'],
    },
    employee:{
        type : String,
        required : [true,'Please enter password'],
    },
    taskstatus:{
        type : String,
        required : true,
    },
    description:{
        type: String,
        required : true,
    }
});



module.exports = mongoose.model("Task", taskSchema);