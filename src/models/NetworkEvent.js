const mongoose = require('mongoose');

const networkEventSchema = mongoose.Schema(
  {
    status: {
      type: Number,
      required: true
    },
    employees: [{type: Schema.Types.ObjectId, ref: 'Employee'}],
    messeges: [{
      messege: String
    }]
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('NetworkEvent', networkEventSchema);
