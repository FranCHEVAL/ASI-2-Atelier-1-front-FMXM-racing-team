import { AccountCircle } from '@mui/icons-material';
import { userDisconnection } from '../../core/actions';
import { Menu, Fade, MenuItem, Box, Toolbar, AppBar, IconButton } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';


export function NavigationBar(props){
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function disconnect(){
    dispatch(userDisconnection())
  }

    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <div>
                <IconButton 
                aria-label="add to shopping cart"
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}>
                  <AccountCircle/>
                </IconButton>
                <Menu
                  id="fade-menu"
                  MenuListProps={{
                    'aria-labelledby': 'fade-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                >
                  <MenuItem>Profile</MenuItem>
                  <MenuItem onClick={disconnect} href='http://localhost:3000'>Logout</MenuItem>
                </Menu>
              </div>
            </Toolbar>
          </AppBar>
        </Box>
      );
}

export default NavigationBar;