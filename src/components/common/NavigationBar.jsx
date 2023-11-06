import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { AccountCircle } from '@mui/icons-material';
import { Button } from '@mui/base';

export function NavigationBar(props){
    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Button color='alert' variant="contained" href='http://localhost:3000'>Test</Button>
              <AccountCircle></AccountCircle>
            </Toolbar>
          </AppBar>
        </Box>
      );
}

export default NavigationBar;