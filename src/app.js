const express = require('express');
const v1 = require('./routes/v1');
const cors = require('cors');
const consumerModule = require('./modules/kafkamodule');
const jwtVerifyMiddleware = require('./middlewares/verify');
const app = express();

consumerModule();

// service
app.use(express.json());
app.use(jwtVerifyMiddleware);

app.get('/welcome', (req, res) => {
    res.send('<h1>Welcome to Express.js Application!</h1>');
});

// V1 API
app.use('/v1', v1);

const corsOptions = {
  origin: 'http://localhost:3001', // (https://your-client-app.com)
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));


module.exports = app;
