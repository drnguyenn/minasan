import io from 'socket.io-client';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const socketInterface = (function () {
  // global socket, init only one
  let socket;
  const createSocket = (
    data,
    joinedRoomHandler,
    broadcastHandler,
    newRoomHandler
  ) => {
    socket = io.connect(BASE_URL);

    // catch error on connection
    socket.on('connect_failed', error => {
      console.error(error);
    });

    socket.on('connect_error', error => {
      console.error(error);
    });

    socket.on('error', error => {
      console.error(error);
    });

    // connect success
    socket.on('connect', () => {
      socket.emit('join-rooms', data);
    });

    // join room event
    socket.on('joined-room', message => {
      joinedRoomHandler(message);
    });

    // receive message event
    socket.on('broadcast-message', message => {
      broadcastHandler(message);
    });

    // new room created event
    socket.on('new-room', message => {
      newRoomHandler(message);
    });

    return socket;
  };
  return {
    createConnectionEvent: function (
      data,
      joinedRoomHandler,
      broadcastHandler,
      newRoomHandler
    ) {
      if (!socket) {
        socket = createSocket(
          data,
          joinedRoomHandler,
          broadcastHandler,
          newRoomHandler
        );
      }
      return socket;
    },

    // joinRoomsEvent: data => {
    //   console.log(data);
    //   if (socket.connected === false) {
    //     console.log('not connected');
    //   } else {
    //     socket.emit('join-rooms', data);
    //   }
    // },

    sendMessageEvent: data => {
      if (!socket) {
        console.error('Socket not created');
      } else {
        socket.emit('send-message', data);
      }
    },

    onDisconnectEvent: () => {
      if (!socket) {
        console.error('Socket not created');
      } else {
        socket.close();
        socket = null;
      }
    }
  };
})();
export default socketInterface;
