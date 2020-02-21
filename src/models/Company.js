const mongoose = require('mongoose');

const companyScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  contactName: {
    type: String,
    required: true
  },
  contactMail: {
    type: String,
    required: true
  },
  contactTel: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Company', companyScheme);
