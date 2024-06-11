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
    CatchingObject,
    DrillingObject
} = require('../controller/cobotFramework');

const {
    MovingBase,
    MovingShoulder,
    MovingElbow
} = require('../controller/cobot-controller');

// const router = express.Router();
router.use(cors());

//api thêm vật thể
router.post('/createObject', CreateObject);
//api update vật thể, gọi dồng thời với api tạo vật thể và sau dó dc gọi liên tục để cập nhật vị trí của vật thể
router.put('/updateObject', UpdateObject);
//api xóa vật thể khi ra khỏi tầm nhìn của IO
router.post('/deleteObject', DeleteObject);
//api lấy trạng thái vật thể theo thời gian thực, sẽ gọi khi gọi hành động cho cobot
router.get('/getDataObject', GetDataObject);

/************************************
    Các api để người dùng ra lệnh gì cho cobot
************************************/
//api tạo cobot
router.post('/createCobot', CreateCobot);
//api đẩy vật
router.post('/pushObject', PushingObject);
//api gắp vật thể
router.post('/catchingObject', CatchingObject);
//api khoan vật thể
router.post('/drillingObject', DrillingObject);


router.post('/noitfyClients', );


/************************************
    Các api để cobot thưc hiện hành động
************************************/
// api gọi việc xoay Base của cobot
router.post('/movingBase', MovingBase);
// api gọi việc xoay Shoulder của cobot
router.post('/movingShoulder', MovingShoulder);
// api gọi việc xoay Elbow của cobot
router.post('/movingElbow', MovingElbow);




// //api update trạng thái cobot
// router.put('/updateCobot', UpdateStatusCobot);
// //api tạo framework cobot
// router.post('/createCobotFramework', CreateCobotFramework);
// //api xóa cobot
// router.post('/deleteCobot', DeleteCobot);
// //api chọn cobot để thực hiện hành động đẩy vật
// router.post('/selectCobot', SelectCobot);
module.exports = router;