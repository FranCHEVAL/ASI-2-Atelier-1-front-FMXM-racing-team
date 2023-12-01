import { io } from 'socket.io-client';
import { PROXYLINK } from './constants';

const URL = PROXYLINK + "/";
  
export const socket = io(URL);