const Cobot = require('../models/cobotSchema');
const Object = require('../models/objectSchema');
const axios = require('axios');
const bodyParser = require('body-parser');


const MovingBase = async (req, res) => {
    try {
        // truyền về cho cobot việc quay Base với góc quay là 
        // req.body.JointAngles1
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

/*
    khi api này được gọi nó sẽ trả
    về khối điều khiển cobot
*/
const MovingShoulder = async (req, res) => {
    try {
        // truyền về cho cobot việc quay Shoulder với góc quay là 
        // req.body.JointAngles2
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const MovingElbow = async (req, res) => {
    try {
        // truyền về cho cobot việc quay Elbow với góc quay là 
        // req.body.JointAngles3
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    MovingBase,
    MovingShoulder,
    MovingElbow
};