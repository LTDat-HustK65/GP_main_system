const cors = require('cors');

const router = require('express').Router();
const bodyParser = require('body-parser');

// const myFunction = require('../controller/object-controller');
// const cobotFramework = require('../controller/cobotFramework');

const ObjectController = require('../controller/object-controller');

// const router = express.Router();
router.use(cors());


router.post('/create', ObjectController.createObject);

router.post('/update', ObjectController.updateObject);

router.post('/delete', ObjectController.deleteObject);

module.exports = router;