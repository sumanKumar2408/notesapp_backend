const mongoose = require('mongoose'); 

const user = new mongoose.Schema({
    name: {
        type: String, trim: true, required: true
    },
    email: {
        type: String, required: true, trim: true, unique: true
    },
    password: {
        type: String, required: true, trim: true
    },
});

module.exports = new mongoose.model('user', user);