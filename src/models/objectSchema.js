const mongoose = require('mongoose');

const objectSchema = new mongoose.Schema({
    timeApear: Date,
    properties: {
        name: String,
        speed: Number,
        vector: {
            x: Number,
            y: Number,
            z: Number
        },
        currentLocation:{
            x: Number,
            y: Number,
            z:Number
        }
    }
});

module.exports = mongoose.model('object', objectSchema);

 