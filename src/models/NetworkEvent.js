const { Schema, model } = require('mongoose');

const networkEventSchema = Schema({
  employees: [{ type: Schema.Types.ObjectId, ref: 'Employee' }],
  messeges: [
    {
      created_at: {
        type: Number,
        default: Date.now
      },
      user: { type: Schema.Types.ObjectId, ref: 'UserData', required: true },
      msg: {
        type: String,
        required: true
      }
    }
  ],
  history: [
    {
      created_at: {
        type: Number,
        default: Date.now
      },
      status: {
        type: Number,
        required: true
      },
      message: {
        type: String,
        required: true
      }
    }
  ],
  active: {
    type: Boolean,
    default: true
  }
});

module.exports = model('NetworkEvent', networkEventSchema);
