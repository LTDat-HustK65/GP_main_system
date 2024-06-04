const mongoose = require('mongoose');;
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const path = require('path');
const bodyParser = require('body-parser');
const router = require('./src/routes/route');

const app = express();
const PORT = process.env.PORT || 3030;

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});