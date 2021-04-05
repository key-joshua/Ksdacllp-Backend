import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  profile: { type: String, required: [true, 'profile is required'] },
  parentId: { type: String, required: [true, 'parentId is required'] },
  userName: { type: String, required: [true, 'userName is required'] },
  email: { type: String, required: [true, 'Email is required'] },
  isVerified: { type: Boolean },
  password: { type: String, required: [true, 'Password is required'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Users', UserSchema);
