const cors = require('cors');

const router = require('express').Router();
const bodyParser = require('body-parser');

const {
    CreateObject,
    DeleteObject,
    UpdateObject,
    GetDataObject
} = require('../controller/object-controller');

const {
    CreateCobot,
    PushingObject,
    CatchingObject
} = require('../controller/cobotFramework');


// const router = express.Router();
router.use(cors());

//api thêm vật thể
router.post('/createObject', CreateObject);
//api update vật thể, gọi dồng thời với api tạo vật thể và sau dó dc gọi liên tục để cập nhật vị trí của vật thể
router.put('/updateObject', UpdateObject);
//api xóa vật thể khi ra khỏi tầm nhìn của IO
router.post('/deleteObject', DeleteObject);
//api lấy trạng thái vật thể theo thời gian thực, sẽ gọi khi gọi hành động đẩy vật
router.get('/getDataObject', GetDataObject);

/************************************
    Các api để tương tác với cobot
************************************/
//api tạo cobot
router.post('/createCobot', CreateCobot);
//api đẩy vật
router.post('/pushObject', PushingObject);
//api gắp vật thể
router.post('/catchingObject', CatchingObject);


//api update trạng thái cobot
// router.put('/updateCobot', UpdateStatusCobot);
//api tạo framework cobot
// router.post('/createCobotFramework', CreateCobotFramework);
//api xóa cobot
// router.post('/deleteCobot', DeleteCobot);
//api chọn cobot để thực hiện hành động đẩy vật
// router.post('/selectCobot', SelectCobot);
module.exports = router;