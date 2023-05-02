/**
 * @author Santiljano Malaj
 * @email ictirana18@gmail.com
 * @company zeply.com
 */
import User from '../models/userModel.js';

const findAndCreateUser = async (account) => {
  try {
    console.log('CTRL_findAndCreateUser:', `Wallet Address is ${account}`);
    const userExists = await User.findOne({
      walletAddress: account
    });
    if (!userExists) {
      const newUser = await User.create({
        walletAddress: account
      });
      if (newUser) {
        return newUser;
      } else {
        console.log('CTRL_findAndCreateUser_ERR:', 'Failed to create user');
        return null;
      }
    } else {
      return userExists;
    }
  } catch (e) {
    console.log('CTRL_findAndCreateUser_ERR:', e);
    return null;
  }
};

export { findAndCreateUser };
