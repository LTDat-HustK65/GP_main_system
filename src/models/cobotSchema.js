const mongoose = require('mongoose');

const cobotSchema = new mongoose.Schema({
    timePerform: Number,
    status:{
        jointAngles1: Number,
        jointAngles2: Number,
        jointAngles3: Number,
    }
});

module.exports = mongoose.model('cobot', cobotSchema);