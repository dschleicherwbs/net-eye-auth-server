const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  }
});

title.exports = mongoose.model('Employee', employeeSchema);
