/**
 * @author Santiljano Malaj
 * @email ictirana18@gmail.com
 * @company zeply.com
 */
import { mongoose } from 'mongoose';

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: false
    },
    password: {
      type: String,
      required: false
    },
    walletAddress: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: Number,
      enum: [21, 22],
      default: 22
      /**
       * 21: Admin
       * 22: Seller
       */
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

export default User;
