function inverseKinematics(x, y, z) {
    // Tính toán khoảng cách từ gốc đến điểm đích
    var l1 = l2 = l3 = 20;
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

        return [theta1Deg, theta2Deg, theta3Deg];
    }   
}

// Ví dụ sử dụng

let jointAngles = inverseKinematics(x, y, z, l1, l2, l3);
if (jointAngles) {
    console.log("Joint Angles (in degrees):", jointAngles);
} else {
    console.log("The point (" + x + ", " + y + ", " + z + ") is out of reach for the robot arm.");
}
