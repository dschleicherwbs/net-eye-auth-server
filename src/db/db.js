const mongoose = require('mongoose');
const MONGOURL = process.env.MONGODB_URL;

mongoose.connect(
  MONGOURL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  () => console.log('DB connected')
);
