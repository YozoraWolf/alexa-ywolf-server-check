const express = require('express');
const { ExpressAdapter } = require('ask-sdk-express-adapter');
const skill = require('../src/skillHandler');

const app = express();

const adapter = new ExpressAdapter(skill, false, false);

app.post('/', adapter.getRequestHandlers());

module.exports = app;