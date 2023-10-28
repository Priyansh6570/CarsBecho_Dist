// import { Server } from 'socket.io';

// let io;
// let adIo;

// export const init = (server) => {
//   io = new Server(server, {
//     cors: {
//       origin: [
//         'https://www.carsbecho.com',
//         'https://carsbecho.com',
//         'http://localhost:5173'
//       ],
//       methods: ['*'],
//       allowedHeaders: ['*'],
//     },
//   });
//   return io;
// };

// export const initAdIo = (server, path = '/socket/adpage') => {
//   adIo = new Server(server, {
//     cors: {
//       origin: [
//         'https://www.carsbecho.com',
//         'https://carsbecho.com',
//         'http://localhost:5173'
//       ],
//       methods: ['*'],
//       allowedHeaders: ['*'],
//     },
//     path: path,
//   });
//   return adIo;
// };

// export const getIo = () => {
//   if (!io) {
//     throw new Error('Socket.io not initialized');
//   }
//   return io;
// };

// export const getAdIo = () => {
//   if (!adIo) {
//     throw new Error('Socket.io not initialized');
//   }
//   return adIo;
// };
