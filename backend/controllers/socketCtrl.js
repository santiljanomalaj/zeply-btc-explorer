/**
 * @author Santiljano Malaj
 * @email ictirana18@gmail.com
 * @company zeply.com
 */
import { removeInArray } from '../utils/helper.js';

const all_sockets = [];

const init = (io) => {
  io.on('connection', (socket) => {
    console.log('SOCKET_ON__connection:', 'a user connected');

    socket.on('walletConnect', ({ account }, cb) => {
      //-- TODO
      console.log('SOCKET_ON__walletConnect:', `TODO: ${account}`);
    });

    socket.on('checkNotification', ({ id, user }) => {
      //-- TODO
      console.log('SOCKET_ON__checkNotification:', `TODO: ${id}, ${user}`);
    });

    socket.on('join', ({ nonce, address, role }) => {
      //-- TODO
      console.log('SOCKET_ON__join:', `TODO: ${nonce}, ${address}, ${role}`);
    });

    socket.on('chat', (data) => {
      //-- TODO
      console.log('SOCKET_ON__chat:', `TODO: ${data}`);
    });

    socket.on('accept', (data) => {
      //-- TODO
      console.log('SOCKET_ON__accept:', `TODO: ${data}`);
    });

    socket.on('call', (data) => {
      //-- TODO
      console.log('SOCKET_ON__call:', `TODO: ${data}`);
    });

    socket.on('disconnect', () => {
      console.log('SOCKET_ON__disconnect:', 'user disconnected');
      removeInArray(all_sockets, socket);
    });
  });
};

export { init };
