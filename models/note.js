const mongoose = require('mongoose'); 

const note = new mongoose.Schema({
    title: {
        type: String, trim: true, required: true
    },
    desc: {
        type: String, trim: true, required: true
    },
    createdOn: { 
        type: String
    },
    lastModifiedOn: {
        type: String
    },
    id: {
        type: String, trim: true
    }
});

module.exports = new mongoose.model('notes', note);