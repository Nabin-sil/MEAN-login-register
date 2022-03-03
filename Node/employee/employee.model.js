const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    firstName: {
        type: String
        },
        lastName: {
        type: String
        },
        email: {
        type: String
        },
        phone: {
        type: Number
        }
    
});

module.exports = mongoose.model('Employee', employeeSchema);


