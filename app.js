const morgan = require('morgan');
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const geminiRouter = require('./router/geminiRouter');

const limiter = rateLimit({
  max: 50,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests have been made!',
});

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use(express.json());

app.use('/api', limiter);

app.use('/api/v1/gemini', geminiRouter);

app.use('/api/v1/poke-server', (req, res, next) =>
  res.status(200).json({
    status: 'success',
    data: {
      sleepy: "I'm up!!!",
    },
  })
);

app.all('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

module.exports = app;
