import { io } from 'socket.io-client';
import { PROXYLINK, NODEJS } from './constants';

const URL = PROXYLINK + "/" + NODEJS;
  
export const socket = io(URL);