const mongoose = require('mongoose');

const cobotSchema = new mongoose.Schema({
    time: Date,
    status:{
        servo1: Number,
        servo2: Number,
        servo3: Number,
    }
});

module.exports = mongoose.model('cobot', cobotSchema);