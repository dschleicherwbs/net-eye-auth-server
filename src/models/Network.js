const mongoose = require('mongoose');

const networkSchema = mongoose.Schema({
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
  ip: {
    type: String,
    required: true,
    trim: true
  },
  company_id: {
    type: String,
    required: true
  },
  event_ids: {
    type: Array,
    default: []
  }
});

// id: 1,
// name: 'Network One',
// place: 'Berlin',
// ip: '111.147.a.158',
// company_id: 1,
// status: {
//   name: 'warning',
//   priority: 2
// }
