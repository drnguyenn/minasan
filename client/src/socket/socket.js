import io from 'socket.io-client';

const BASE_URL = process.env.REACT_APP_BASE_URL;

let connectedRoom = [];

const socketInterface = (function () {
  // global socket, init only one
  let socket = null;
  // value keep track of connected room id, init only one

  const createSocket = (
    data,
    joinedRoomHandler,
    broadcastHandler,
    newRoomHandler
  ) => {
    socket = io.connect(BASE_URL, { query: `userId=${data.userId}` });

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
      connectedRoom.forEach(roomId => {
        let index = data.roomIds.indexOf(roomId);
        if (index !== -1) data.roomIds.splice(index, 1);
      });
      socket.emit('join-rooms', data);
      connectedRoom = connectedRoom.concat(data.roomIds);
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

    joinRoomsEvent: data => {
      // console.log(data); // have roomIds and userIds
      if (!socket) {
        console.error('Socket not created');
        return 0;
      } else {
        connectedRoom.forEach(roomId => {
          let index = data.roomIds.indexOf(roomId);
          if (index != -1) data.roomIds.splice(index, 1);
        });
        socket.emit('join-rooms', data);
        connectedRoom = connectedRoom.concat(data.roomIds);
        return 1;
      }
    },

    sendMessageEvent: data => {
      if (!socket) {
        console.error('Socket not created');
        return 0;
      } else {
        socket.emit('send-message', data);
        return 1;
      }
    },

    onDisconnectEvent: () => {
      if (!socket) {
        console.error('Socket not created');
      } else {
        console.log('disconecting from server');
        socket.close();
        socket = null;
        connectedRoom = [];
      }
    }
  };
})();
export default socketInterface;
