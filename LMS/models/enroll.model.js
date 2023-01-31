const mongoose = require('mongoose');

const enrollSchema = new mongoose.Schema({
    stuId:{
        type : String,
        required : [true],
    },
    courseName:{
        type : String,
        required : [true,'Please enter Course Name'],
    },
    status:{
        type : String,
        required : [true],
    },
});



module.exports = mongoose.model("Enroll", enrollSchema);