import { ChatItem } from "./ChatItem";
import { socket } from "../../socket";
import { useEffect } from "react";
import { TextField, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getChatHistory, getReceiverId} from "../../core/selectors";
import { loadChatHistory, updateChatHistory } from "../../core/actions";


export function ChatContainer(props){

    const receiverId = useSelector(getReceiverId)
    // TO UNCOMMENT WHEN FULLY IMPLEMENTED
    //const userId = useSelector(getUserId)
    const userId = 100
    const dispatch = useDispatch()
    const chatHistory = useSelector(getChatHistory)

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
        socket.on('receiveMessage',(message) => {
            dispatch(updateChatHistory(message))
        });

        socket.on('loadChatHistory',(chatHistory)=>{
            console.log(chatHistory)
            dispatch(loadChatHistory(chatHistory))
        })

        const payload={
            sender:userId,
            receiver:receiverId
        }

        socket.emit('loadChatHistory', payload)
    });

    return(
        <div>
                {chatHistory.map(message => {
                    return(
                    <ChatItem sender={message.sender} content={message.content} key={message.date}>
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