/**
 * @author Santiljano Malaj
 * @email ictirana18@gmail.com
 * @company zeply.com
 */
import { mongoose } from 'mongoose';

const transactionSchema = mongoose.Schema(
  {
    hash: {
      type: String,
      required: true,
      unique: true
    },
    numberSearch: {
      type: Number,
      default: 1
    }
  },
  {
    timestamps: true
  }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
