const Object = require('../models/objectSchema');
const Cobot = require('../models/cobotSchema');
const bodyParser = require('body-parser');

// const ObjectController = {
//     CreateObject,
//     DeleteObject,
//     UpdateObject
// }

const CreateObject = async (req, res) => {
    try {
        const object = new Object({
            timeApear: req.body.timeApear,
            properties: {
                name: req.body.properties.name,
                speed: req.body.properties.speed,
                vector: {
                    x: req.body.properties.vector.x,
                    y: req.body.properties.vector.y,
                    z: req.body.properties.vector.z
                },
                currentLocation: {
                    x: req.body.properties.currentLocation.x,
                    y: req.body.properties.currentLocation.y,
                    z: req.body.properties.currentLocation.z
                }
            }
        });
        await object.save();
        res.status(200).send('Create object successfully!');
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).send('Error: ', error);
    }
}

const GetDataObject = async (req, res) => {
    try {
        const object = await Object.updateOne({
            'properties.name': req.body.name
        }, { $set: {
            'properties.currentLocation': {
                x: req.body.properties.currentLocation.x,
                y: req.body.properties.currentLocation.y,
                z: req.body.properties.currentLocation.z
            } 
        } });
        res.status(200).send(object);
    }
    catch (error) {
        console.log('Error: ', error);
        res.status(500).send('Error: ', error);
    }
}

const DeleteObject = async (req, res) => {
    try {
        const deleteObject = await Object.findByIdAndDelete(req.body.id);//req.body.id
        res.status(200).send('Delete', deleteObject,'successfully!');
    }
    catch (error) {
        console.log('Error: ', error);
        res.status(500).send('Error: ', error);
    }
}

const UpdateObject = async (req, res) => {
    try {
        const updateObject = await Object.findByIdAndUpdate(req.body.id, {  
            timeApear: req.body.timeApear,
            properties: {
                name: req.body.properties.name,
                speed: req.body.properties.speed,
                vector: {
                    x: req.body.properties.vector.x,
                    y: req.body.properties.vector.y,
                    z: req.body.properties.vector.z
                },
                currentLocation: {
                    x: req.body.properties.currentLocation.x,
                    y: req.body.properties.currentLocation.y,
                    z: req.body.properties.currentLocation.z
                }
            }
        });
        res.status(200).send('Update object successfully!');
    }
    catch (error) {
        console.log('Error: ', error);
        res.status(500).send('Error: ', error);
    }
}

// const FindObject = async (req, res) => {
//     try {
//         const object = await Object.findById(req.body.id);
//         res.status(200).send(object);
//     }
//     catch (error) {
//         console.log('Error: ', error);
//         res.status(500).send('Error: ', error);
//     }

module.exports = {
    CreateObject,
    DeleteObject,
    UpdateObject,
    GetDataObject
};
// Path: src/models/cobotSchema.js