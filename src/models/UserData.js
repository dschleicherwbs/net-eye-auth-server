const { Schema, model } = require('mongoose');

const userDataSchema = new Schema({
  user_id: { type: String, required: true },
  name: {
    type: String,
    required: true
  },
  imgPath: {
    type: String,
    default: ''
  },
  employee: {
    active: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    }
  }
});

module.exports = model('UserData', userDataSchema);
