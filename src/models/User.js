import { Schema, model, Types } from 'mongoose';
import validator from 'validator';
const UserSchema = new Schema(
  {
    name: {
      type: String,
      minlength: [3, 'The name must be at least 3 characters.'],
      required: [true, 'O nome is required.'],
    },
    email: {
      type: String,
      required: [true, 'The email is required.'],
      unique: [true, 'Email already registered.'],
      validate: {
        validator: value => {
          return validator.isEmail(value);
        },
        message: 'Email inválido.',
      },
    },
    friend: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.isValid = id => {
  return Types.ObjectId.isValid(id);
};

const User = model('User', UserSchema);
export default User;
