const mongoose = require("mongoose")

const studySchema = mongoose.Schema({
    applyLink:{
        type: String,
        required: true,
    },
    qualifications:{
        type: String,
        required: false,
    },
    discription:{
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,   
    },
    duration:{
        type: String,
        required: false,   
    },
})

module.exports = mongoose.model('studyData',studySchema);