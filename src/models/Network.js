const { Schema, model } = require('mongoose');

const networkSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  place: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: Number,
    default: 0
  },
  ip: {
    type: String,
    required: true,
    trim: true
  },
  company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
  events: [{ type: Schema.Types.ObjectId, ref: 'NetworkEvent' }]
});

module.exports = model('Network', networkSchema);
