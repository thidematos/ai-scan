const morgan = require('morgan');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const geminiRouter = require('./router/geminiRouter');

const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests have been made!',
});

app.use('/api', limiter);

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(express.json());

app.use('/api/v1/gemini', geminiRouter);

module.exports = app;
