const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const configCobotDB = require('../config/configCobotDB');
const configDB = require('../config/configDB');
const myFunction = require('../process/function');
const cobotFramework = require('../process/cobotFramework');

const router = express.Router();
router.use(cors());


router.post('/create', (req, res) => {
    try{
        console.log('truy cập vào api/create');
        res.status(200).send('truy cập vào api/create');
    } catch (error) {
        console.log('Lỗi: ', error);
        res.status(500).send('Lỗi: ', error);
    }
});

router.post('/read', (req, res) => {
    try{
        console.log('truy cập vào api/read');
        res.status(200).send('truy cập vào api/read');
    } catch (error) {
        console.log('Lỗi: ', error);
        res.status(500).send('Lỗi: ', error);
    }
});

router.post('/update', (req, res) => {
    try{
        console.log('truy cập vào api/update');
        res.status(200).send('truy cập vào api/update');
    } catch (error) {
        console.log('Lỗi: ', error);
        res.status(500).send('Lỗi: ', error);
    }
});

router.post('/delete', (req, res) => {
    try{
        console.log('truy cập vào api/delete');
        res.status(200).send('truy cập vào api/delete');
    } catch (error) {
        console.log('Lỗi: ', error);
        res.status(500).send('Lỗi: ', error);
    }
});

module.exports = router;