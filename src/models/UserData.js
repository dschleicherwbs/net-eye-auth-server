const { Schema, model } = require('mongoose');

const userDataSchema = new Schema({
  user_id: { type: String, required: true },
  name: {
    type: String,
    required: true
  },
  avatarPath: {
    type: String,
    default: ''
  },
  phone: {
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

// userSchema.pre('update', async function(next) {
//   // Hash password before save
//   const user = this;
//   if (user.isModified('password')) {
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(user.password, salt);
//   }
//   next();
// });

module.exports = model('UserData', userDataSchema);
