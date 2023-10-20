import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export function Copyright(props){
    const getFullYear =() =>{
        return new Date().getFullYear()
    }

    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="http://localhost:3000">
                FMXM racing team website
            </Link>
            {getFullYear()}
      </Typography>
    );
}

export default Copyright;