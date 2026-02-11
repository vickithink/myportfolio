var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const axios = require('axios');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

require('dotenv').config();

var app = express();

const allowedOrigins = (process.env.CLIENT_URLS || process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

// Enable CORS for local + deployed frontend domains
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  }
}));

// Verify Telegram connection on startup
async function VerifyTelegram() {
  if (!process.env.TELEGRAM_BOT_TOKEN) {
    console.warn('Telegram token not configured, skipping Telegram connectivity check.');
    return;
  }

  try {
    const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getMe`;
    const response = await axios.get(telegramUrl);
    if (response.data.ok) {
      console.log('✅ Connected to Telegram Bot Successfully');
      console.log(`   Bot Name: @${response.data.result.username}`);
    }
  } catch (error) {
    console.error('❌ Failed to connect to Telegram:', error.message);
  }
}

VerifyTelegram();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
