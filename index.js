require('module-alias/register')
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes/AlexaRoutes');
const port = process.env.PORT || 3000;

app.use('/serverStatus', routes);

app.get('/test', (req, res) => {
    res.send({ message: 'Server is up and running' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;