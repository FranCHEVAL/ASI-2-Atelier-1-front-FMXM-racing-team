import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUsers, setReceiverId } from "../../core/actions";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getUsers } from "../../core/services/fetchService.js";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { getUsersList } from "../../core/selectors.js";
import SocketManager from "../../socket.js";


export function UserSelection(props){
    const dispatch = useDispatch();
    const userId = useSelector(state => state.currentUserId);
    const usersList = useSelector(getUsersList)
    const socket = SocketManager.useSocket()

    useEffect(() => {
      async function fetchData() {
        const result = await getUsers();
        dispatch(loadUsers(result));      
      }
      fetchData();
    }, [dispatch]);

    const onSelectUser = (event) => {
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