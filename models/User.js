const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// userSchema.pre('save', async function (next) {
//   try {
//     if (!this.isModified('password')) {
//       return next();
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(this.password, salt);
//     this.password = hashedPassword;
//     return next();
//   } catch (err) {
//     return next(err);
//   }
// });


const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
