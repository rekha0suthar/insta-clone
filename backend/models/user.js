import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new Schema({
  name: {
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
  userImage: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  lastLoggedIn: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', function (next) {
  if (!this.isModified(this.password)) {
    this.password = bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(this.password, password);
};

userSchema.methods.updateLogin = function () {
  return this.model('User').findOneAndUpdate(
    { email: this.email },
    { lastLoggedIn: new Date() }
  );
};

const User = model('User', userSchema);

export default User;
