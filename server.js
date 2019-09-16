
const express = require('express');
const cors = require('cors');

const { parseSection } = require('./index.js');
const app = express();
app.use(cors());
app.get('/', async (request, response) => {  
  const data = await parseSection('https://eva.ua/220-271-272/stiralnye-poroshki/');
  response.json(data);
})

app.listen(3456);