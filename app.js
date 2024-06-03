const express = require('express');
const cors = require('cors');

const path = require('path');
const bodyParser = require('body-parser');
const router = require('./src/routes/api');

const app = express();
const PORT = 3030;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hello World!');
  console.log('Hello World!');
});

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});