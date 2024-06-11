const Cobot = require('../models/cobotSchema');
const Object = require('../models/objectSchema');
const axios = require('axios');
const bodyParser = require('body-parser');

/*
    hàm này sẽ trả về thời điểm để cobot thực hiện hành động đẩy vật
    tùy theo hành động ở đầy sẽ được lập trình một thuật toán tính toán thời gian phù hợp
    để đơn giản thì em xin phép mặc địch mọi trường hợp là công thức như sau:
    timePushing = timeApear + 1000000;
*/
const CaculateTimePushing = (timeApear, speed, vector) => {
    return new Date(timeApear.getTime() + 1000000); 
}
const CaculateTimeCatching = (timeApear, speed, vector) => {
    return new Date(timeApear.getTime() + 1000000); 
}
const CuculateTimeDrilling = (timeApear, speed, vector) => {
    return new Date(timeApear.getTime() + 1000000); 
}

/*
    để tính toàn hành động cho cobot thì em sẽ sư dụng thuật toán động học ngược
    được mô phỏng trong hàm InverseKinematicCaculate()
    hàm dưới chỉ mô phỏng đơn giản thuật toán động học ngược có thể không chính xác
*/
const InverseKinematicCaculate3dof = (coordinates) => {
    //
    var l1 = l2 = l3 = 20;  //mặc định chiều dài của các khớp đều bằng 20 và chân ở điểm (0,0,0)
    let x = coordinates.x;
    let y = coordinates.y;
    let z = coordinates.z;

    // Tính toán khoảng cách từ gốc đến điểm đích
    let d = Math.sqrt(x*x + y*y + z*z);

    // Kiểm tra xem điểm đích có nằm ngoài tầm với của cánh tay robot không
    if (d > l1 + l2 + l3) {
        return null;
    }else{
        // Tính góc theta1
        let theta1 = Math.atan2(y, x);

        // Tính góc theta3 bằng định lý cosine
        let xyDistance = Math.sqrt(x*x + y*y);
        let cosTheta3 = (d*d - l1*l1 - l2*l2 - l3*l3) / (2 * l1 * l2 * l3);
        let theta3 = Math.acos(cosTheta3);

        // Tính góc theta2 bằng định lý cosine và sine
        let alpha = Math.atan2(z, xyDistance);
        let beta = Math.acos((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d));
        let theta2 = alpha + beta;

        // Chuyển đổi góc từ radian sang độ
        let theta1Deg = theta1 * 180 / Math.PI;
        let theta2Deg = theta2 * 180 / Math.PI;
        let theta3Deg = theta3 * 180 / Math.PI;

        return {
            jointAngles1: theta1Deg,
            jointAngles2: theta2Deg,
            jointAngles3: theta3Deg
        };
    }
}


/*
    các hàm dưới đây sẽ thực hiện các hành động cụ thể của cobot
*/
const CreateCobot = async (req, res) => {
    try {
        const cobot = new Cobot({
            timePerform: req.body.timePerform,
            status: {
                jointAngles1: req.body.status.jointAngles1,
                jointAngles2: req.body.status.jointAngles2,
                jointAngles3: req.body.status.jointAngles3
            }
        });
        await cobot.save();
        res.status(200).send('Create cobot successfully!');
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const PushingObject = async (req, res) => {
    try{
        const object = await Object.findOne({
            // _id: req.body.id,
            'properties.name': req.body.name
        });

        if(object){
            var coordinates = {
                x: object.properties.currentLocation.x,
                y: object.properties.currentLocation.y,
                z: object.properties.currentLocation.z
            };
            
            var timePushing = CaculateTimePushing(object.timeApear, object.properties.speed, object.properties.vector);
            var getStatus = InverseKinematicCaculate3dof(coordinates);
            /*object getStatus{
                Joint1: theta1Deg,
                Joint2: theta2Deg,
                Joint3: theta3Deg
            };*/
            res.status(200).json({
                message: "COBOT IS PUSHING WITH STATUS: ",
                getStatus
            });
        }
        else{
            return res.status(400).json({ message: "Object not found!" });
        }
    }
    catch(error){
        return res.status(500).json({ message: error.message });
    }
};
/*
    api này trả về các góc khớp đồng thời
    gợi các api thưc hiện moveBase, moveShoulder,
    moveElbow với req.body.status.jointAngles1, 
    req.body.status.jointAngles2, 
    req.body.status.jointAngles3 cho mỗi api

*/


const CatchingObject = async (req, res) => {
    try{
        const object = await Object.findOne({
            // _id: req.body.id,
            'properties.name': req.body.name
        });

        if(object){
            var coordinates = {
                x: object.properties.currentLocation.x,
                y: object.properties.currentLocation.y,
                z: object.properties.currentLocation.z
            };
            
            var timePushing = CaculateTimeCatching(object.timeApear, object.properties.speed, object.properties.vector);
            var getStatus = InverseKinematicCaculate3dof(coordinates);
            /*object getStatus{
                Joint1: theta1Deg,
                Joint2: theta2Deg,
                Joint3: theta3Deg
            };*/
            res.status(200).json({
                message: "COBOT IS CATCHING WITH STATUS: ",
                getStatus
            });
        }
        else{
            return res.status(400).json({ message: "Object not found!" });
        }
    }
    catch(error){
        return res.status(500).json({ message: error.message });
    }
};

const DrillingObject = async (req, res) => {
    try{
        const object = await Object.findOne({
            // _id: req.body.id,
            'properties.name': req.body.name
        });

        if(object){
            var coordinates = {
                x: object.properties.currentLocation.x,
                y: object.properties.currentLocation.y,
                z: object.properties.currentLocation.z
            };
            
            var timePushing = CuculateTimeDrilling(object.timeApear, object.properties.speed, object.properties.vector);
            var getStatus = InverseKinematicCaculate3dof(coordinates);
            /*object getStatus{
                Joint1: theta1Deg,
                Joint2: theta2Deg,
                Joint3: theta3Deg
            };*/
            res.status(200).json({
                message: "COBOT IS DRILLING WITH STATUS: ",
                getStatus
            });
        }
        else{
            return res.status(400).json({ message: "Object not found!" });
        }
    }
    catch(error){
        return res.status(500).json({ message: error.message });
    }
};


// const UpdateStatusCobot = async (req, res) => {
//     try {
//         const cobot = await Cobot.findOneAndUpdate({
//             _id: req.body.id
//         });
//         if (cobot) {
//             cobot.status.jointAngles1 = req.body.status.jointAngles1;
//             cobot.status.jointAngles2 = req.body.status.jointAngles2;
//             cobot.status.jointAngles3 = req.body.status.jointAngles3;
//             await cobot.save();
//             res.status(200).send('Update status successfully!');
//         }
//         else return res.status(400).json({ message: "Cobot not found!" });
//     }
//     catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };

module.exports = {
    CreateCobot,
    CaculateTimePushing,
    CaculateTimeCatching,
    CuculateTimeDrilling,
    InverseKinematicCaculate3dof,
    PushingObject,
    CatchingObject,
    DrillingObject
    // UpdateStatusCobot,
    // CacualateTimeCatching,
    // HanThiec,
    // CatBetong,
    // DutAn,
//vân vân.......
};