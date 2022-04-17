const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: { unique: true },
    },
    password: {
      type: String,
      required: true,
    },
    token: { type: String },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) next();

  bcrypt.genSalt(SALT_WORK_FACTOR, (saltError, salt) => {
    if (saltError) {
      next(saltError);
    }
    bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) {
        next(hashError);
      }
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
