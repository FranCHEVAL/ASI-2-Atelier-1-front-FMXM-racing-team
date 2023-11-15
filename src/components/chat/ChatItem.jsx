export function ChatItem(props){
    const user = props.sender
    const message = props.content

    return(
        <div>
            <h1>{user}</h1>

            <h2>{message}</h2>
        </div>
    )

}