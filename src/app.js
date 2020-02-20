const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 9000;

// Import DB
require('./db/db');

// Import Routes
const userRouter = require('./routers/user');
const userMeRouter = require('./routers/privat/me');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Middleware Routes
app.use('/api/user', userRouter);
app.use('/api/user', userMeRouter);

// Server Listen
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
