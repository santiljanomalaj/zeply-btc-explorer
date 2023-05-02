/**
 * @author Santiljano Malaj
 * @email ictirana18@gmail.com
 * @company zeply.com
 */
import { Server } from 'socket.io';

import * as socketCtrl from '../controllers/socketCtrl.js';

const socketInit = (server) => {
  try {
    const socketIO = new Server(server);
    console.log(socketIO);
    socketCtrl.init(socketIO);
    return socketIO;
  } catch (err) {
    console.log('CONFIG_socketInit_ERROR:', err);
    process.exit(1);
  }
};

export default socketInit;
