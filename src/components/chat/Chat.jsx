import { getReceiverId } from "../../core/selectors";
import { ChatContainer } from "./ChatContainer";
import { UserSelection } from "./UserSelection";
import { useSelector } from "react-redux";

export function Chat(props){

    const receiverId = useSelector(getReceiverId)

    return (
        <div>
            <UserSelection></UserSelection>
            {receiverId!=null &&
                <ChatContainer></ChatContainer> 
            }       
        </div>
    )
}