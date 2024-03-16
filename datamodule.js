const mongoose = require("mongoose")

const jobSchema = mongoose.Schema({

    type:{
        type: String,
        required: true,   
    },
    companyName:{
        type: String,
        required: true,   
    },
    jobRole:{
        type: String,
        required: true,
    },
    salary:{
        type: String,
        required: false,
    },
    qualifications:{
        type: String,
        required: true,
    },
    location:{
        type: String,
        required: false,
    },
    applyLink:{
        type: String,
        required: true,
    },
    discription:{
        type: String,
        required:false,
    },
    duration:{
        type: String,
        required: false,   
    },
})

module.exports = mongoose.model('dataschema', jobSchema);