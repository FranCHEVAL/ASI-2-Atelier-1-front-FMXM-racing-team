import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { LOCALLINK } from '../../constants';

export function Copyright(props){
    const getFullYear =() =>{
        return new Date().getFullYear()
    }

    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href={`${LOCALLINK}`}>
                FMXM racing team website
            </Link>
            {getFullYear()}
      </Typography>
    );
}

export default Copyright;