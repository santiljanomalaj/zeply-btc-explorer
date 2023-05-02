/**
 * @author Santiljano Malaj
 * @email ictirana18@gmail.com
 * @company zeply.com
 */
import User from '../models/userModel.js';

const initDB = async () => {
  try {
    //-- check Admin
    const user = await User.findOne({
      walletAddress: process.env.MY_WALLET_ADDR
    });
    if (!user) {
      //-- create Admin
      const admin = await User.create({
        username: 'sheldoontho',
        walletAddress: process.env.MY_WALLET_ADDR,
        role: 21 // *
      });
      if (admin) {
        //-- okay
        console.log('BOOT_initDB:', 'Admin is created');
      } else {
        //-- ignore error
        console.log('BOOT_initDB_ERROR:', 'Oops, failed to create admin');
      }
    } else {
      //-- no need to create
      console.log('BOOT_initDB:', 'Yup, admin already exists');
    }
  } catch (err) {
    console.log('BOOT_initDB_ERROR:', err);
  }
};

export { initDB };
