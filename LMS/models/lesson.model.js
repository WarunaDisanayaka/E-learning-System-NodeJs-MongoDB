const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    course:{
        type : String,
        required : [true,'Please enter Course Name'],
    },
    lesson:{
        type : String,
        required : [true,'Please enter lesson'],
    },
    description:{
        type : String,
        required : true,
    },
});



module.exports = mongoose.model("Lesson", lessonSchema);