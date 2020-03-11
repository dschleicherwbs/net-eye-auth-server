var compression = require('compression');
const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 9000;

// Import DB
require('./db/db');

// Import Routes
const userRouter = require('./routers/user');
const userMeRouter = require('./routers/privat/me');
const network = require('./routers/privat/network');
const company = require('./routers/privat/company');
const networkEvents = require('./routers/privat/networkEvent');

const app = express();

// Middleware
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(function(req, res, next) {
  setTimeout(() => {
    next();
  }, 200);
});

// Middleware Routes
app.use('/api/user', userRouter);
app.use('/api/user/me', userMeRouter);
app.use('/api/networks', network);
app.use('/api/events', networkEvents);
app.use('/api/companys', company);

// Server Listen
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
