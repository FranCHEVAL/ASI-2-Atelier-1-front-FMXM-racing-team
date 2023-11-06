import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

export function MenuCard(props){
    return (
        <Link to={props.link}>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                <CardContent>
                    {props.icon}
                    <Typography>{props.text}</Typography>
                </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
}

export default MenuCard;