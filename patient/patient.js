const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required : true 
    },
    mail: {
        type: String,
        required : true 
    },
    medicalConditions: {
        type: String,
        required : true 
    },
    symptoms: {
        type: String,
        required : true 
    }
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
 