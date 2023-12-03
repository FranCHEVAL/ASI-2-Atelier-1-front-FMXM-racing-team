import PersonIcon from '@mui/icons-material/Person';

export function PlayerInfos(props) {


    return ( 
        <div>
            <p>Player : {props.playerName}</p>
            <PersonIcon></PersonIcon>
            <p>Action Points : {props.playerActionPoints}</p>
        </div>
    );
}
