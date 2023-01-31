const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName:{
        type : String,
        required : [true,'Please enter Course Name'],
    },
    description:{
        type : String,
        required : [true,'Please enter description'],
    },
});



module.exports = mongoose.model("Course", courseSchema);