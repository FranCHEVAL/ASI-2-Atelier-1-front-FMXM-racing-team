import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUsers, setReceiverId } from "../../core/actions";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getUsersList} from "../../core/selectors";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import SocketManager from "../../socket.js";


export function UserSelection(props){
    const dispatch = useDispatch();
    const usersList = useSelector(getUsersList)
    const socket = SocketManager.useSocket()

    useEffect(() => {
      function onLoadOnlineUsers(users){
        dispatch(loadUsers(users));
      }
      socket.on('onLoadOnlineUsers',onLoadOnlineUsers);

      return () => {
        socket.on('onLoadOnlineUsers',onLoadOnlineUsers);
      }
    }, [dispatch]);

    const onSelectUser = (event) => {
      // TO DO : check if we have to move it to chat component
      const receiverId = event.target.value
      socket.emit("askChatHistory",receiverId)
      dispatch(setReceiverId(receiverId))
    }

    return (
      <FormControl>
        <InputLabel id="demo-simple-select-label">User name</InputLabel>
        <Select
          label="User name"
          onChange={onSelectUser}
        >
        {usersList.map(user => {
          return (
            <MenuItem key={user.id} value={user.id}>
              {user.login}
            </MenuItem>
          )})  
        }
        </Select>
      </FormControl>
    )

}