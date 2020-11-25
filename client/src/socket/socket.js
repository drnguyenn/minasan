import io from 'socket.io-client';

const BASE_URL = process.env.REACT_APP_BASE_URL;

// global socket, init only one
export const Socket = io(BASE_URL);
