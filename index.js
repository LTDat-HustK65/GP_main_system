const mongoose = require('mongoose');;
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const io = require('socket.io');

const path = require('path');
const bodyParser = require('body-parser');
const router = require('./src/routes/route');

const app = express();
const PORT = process.env.PORT || 3030;

const httpServer = http.Server(app);
const socketIo = io(httpServer);

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Database connected to MongoDB successfully!');
})
.catch((err) => {
  console.log('Database connection error: ', err);
});

app.use('/public', express.static(path.join(__dirname, '/views')));

app.use('/api', router);


const ioClientList = [];

socketIo.on('connection', function(socket) {
  ioClientList.push(socket);

  socket.on('end', () => {
    const idx = ioClientList.find(socket);
    if (idx >= 0) ioClientList.splice(idx, 1);
  })
});


function notifyClients(message, data) {
  ioClientList.forEach(socket => socket.emit(message, data));
}




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});