import io from "socket.io-client";

const url = "http://localhost:3001";

const state = {};

export const connectToSocket = async () => {
  const socket = await io(url);
  state.socket = socket;
  return socket;
};

export const getSocket = () => state.socket;
