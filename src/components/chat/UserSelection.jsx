import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUsers, setReceiverId } from "../../core/actions";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getUsersList } from "../../core/selectors";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { socket } from '../../socket';

export function UserSelection(props){
    const dispatch = useDispatch();
    const usersList = useSelector(getUsersList)
    // TO UNCOMMENT WHEN FULLY IMPLEMENTED
    //const userId = useSelector(getUserId)
    const userId = 100

    useEffect(() => {
        async function fetchData() {
          // You can await here
          const resp = await fetch(
              'http://tp.cpe.fr:8083/users'
           );
            const result = await resp.json();
            dispatch(loadUsers(result));
        }
        fetchData();
    }, [dispatch]);

    const onSelectUser = (event) => {
      // TO DO : check if we have to move it to chat component
      const receiverId = event.target.value
      const roomPayload = {
        receiver:receiverId,
        sender:userId
      }
      socket.emit("join",roomPayload)
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