const cors = require('cors');

const router = require('express').Router();
const bodyParser = require('body-parser');

const {
    CreateObject,
    DeleteObject,
    UpdateObject
} = require('../controller/object-controller');



// const router = express.Router();
router.use(cors());

//api thêm vật thể
router.post('/create', CreateObject);
//api update vật thể
router.post('/update', UpdateObject);
//api xóa vật thể
router.post('/delete', DeleteObject);


router.get('/', )
module.exports = router;