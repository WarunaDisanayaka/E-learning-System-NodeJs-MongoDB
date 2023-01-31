const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
    lesson:{
        type : String,
        required : [true,'Please enter Lesson Name'],
    },
    image:{
        type : String,
        required : [true,'Please input file'],
    },
});



module.exports = mongoose.model("Material", materialSchema);