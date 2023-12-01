import { io } from 'socket.io-client';
import { PROXYLINK } from './constants';

const URL = PROXYLINK;
  
class SocketManager{
    constructor({}){
        this.socket = undefined
    }

    init(userId){
        this.socket = io(URL,{
            query:{
                userId:userId
            }
        })
    }

    useSocket(){
        return this.socket
    }
}

export default new SocketManager({})