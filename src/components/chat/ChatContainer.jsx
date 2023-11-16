import { ChatItem } from "./ChatItem";
import { SocketManager} from "../../socket";
import { useEffect } from "react";
import { TextField, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getChatHistory, getReceiverId, getUserId} from "../../core/selectors";
import { loadChatHistory, updateChatHistory } from "../../core/actions";

export function ChatContainer(props){

    const receiverId = useSelector(getReceiverId)
    const userId = useSelector(getUserId)
    const dispatch = useDispatch()
    const chatHistory = useSelector(getChatHistory)
    const socket = SocketManager.useSocket()

    async function handleSubmit(event){
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const message ={
          content: data.get('message'),
          receiver: receiverId,
          sender: userId,
          date:new Date()
        };
        socket.emit('sendMessage',message) 
        dispatch(updateChatHistory(message))
      };
    

    useEffect(() => {
        
        function onReceiveMessage(message){
            dispatch(updateChatHistory(message))
        }

        function onLoadChatHistory(chatHistory){
            dispatch(loadChatHistory(chatHistory))
        }

        socket.on('receiveMessage',onReceiveMessage);

        socket.on('loadChatHistory',onLoadChatHistory);

        return () => {
            socket.off('receiveMessage',onReceiveMessage);
            socket.off('loadChatHistory',loadChatHistory);
        };
    },[dispatch]);

    return(
        <div>
                {chatHistory.map(message => {
                    return(
                    <ChatItem sender={message.sender} 
                        content={message.content} 
                        key={message.date}
                        isSender={userId===message.sender}>
                    </ChatItem>
                    )
                })}
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                margin="normal"
                required
                fullWidth
                id="message"
                label="message"
                name="message"
                autoComplete="username"
                autoFocus
                />
                <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Send
                </Button>
            </Box>

        </div>
    )
}