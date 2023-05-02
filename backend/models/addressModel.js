/**
 * @author Santiljano Malaj
 * @email ictirana18@gmail.com
 * @company zeply.com
 */
import { mongoose } from 'mongoose';

const addressSchema = mongoose.Schema(
  {
    btcaddress: {
      type: String,
      required: true,
      unique: true
    },
    isSubscribed: {
      type: Boolean,
      default: false
    },
    numberSearch: {
      type: Number,
      default: 1
    },
    notificationHookId: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Address = mongoose.model('Address', addressSchema);

export default Address;
