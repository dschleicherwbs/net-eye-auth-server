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
    name: {
      type: String,
      default: 'ok'
    },
    priority: {
      type: Number,
      default: 1
    }
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
