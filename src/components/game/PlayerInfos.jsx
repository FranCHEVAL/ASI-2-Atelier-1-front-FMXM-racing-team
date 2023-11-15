import PersonIcon from '@mui/icons-material/Person';

export function PlayerInfos(props) {


    return ( 
        <div>
            <p>Player 1 : </p>
            <PersonIcon></PersonIcon>
            <p>{props.playerInfos.name}</p>
            <p>Action Points : {props.playerInfos.actionPoints}</p>
        </div>
    );
}
