import { userDisconnection } from '../../core/actions';
import { Menu, Tooltip, Typography, MenuItem, Container, Box, Toolbar, Avatar, Button, AppBar, IconButton } from '@mui/material';
import React, { useState } from 'react';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';import MenuIcon from '@mui/icons-material/Menu';

import { useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom";

const pages = ['Buy', 'Play', 'Sell'];
const settings = ['Profile', 'Logout'];

export function NavigationBar(props){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)

    const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    };

    const handlePageClick = (page) => {
    switch (page) {
      case 'Buy':
          navigate('/buy')
        break;
      case 'Play':
          navigate('/play')
        break;
      case 'Sell':
          navigate('/sell')
        break;
      default:
        // Gestion par défaut
        break;
    }
    handleCloseNavMenu();
    };

    const handleSettingClick = (setting) => {
    switch (setting) {
      case 'Profile':
        // Action pour 'Profile'
        break;
      case 'Logout':
        dispatch(userDisconnection()); // Utilisation de Redux pour déconnecter l'utilisateur
        break;
      default:
        // Gestion par défaut
        break;
    }
    handleCloseUserMenu();
    };

    const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Container maxWidth="xl">
                <Toolbar disableGutters>
                  <VideogameAssetIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                  <Typography
                      variant="h6"
                      noWrap
                      component="a"
                      href="#app-bar-with-responsive-menu"
                      sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                      }}
                  >
                  </Typography>

                  <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                          display: { xs: 'block', md: 'none' },
                        }}
                    >
                      {pages.map((page) => (
                          <Button
                              key={page}
                              onClick={() => handlePageClick(page)}
                              sx={{ my: 2, color: 'white', display: 'block' }}
                          >
                            {page}
                          </Button>
                      ))}
                    </Menu>
                  </Box>
                  <VideogameAssetIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                  <Typography
                      variant="h5"
                      noWrap
                      component="a"
                      href="#app-bar-with-responsive-menu"
                      sx={{
                        mr: 2,
                        display: { xs: 'flex', md: 'none' },
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                      }}
                  >
                  </Typography>
                  <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    {pages.map((page) => (
                        <Button
                            key={page}
                            onClick={() => handlePageClick(page)}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                          {page}
                        </Button>
                    ))}
                  </Box>

                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                      </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                          <MenuItem key={setting} onClick={() => handleSettingClick(setting)}>
                            <Typography textAlign="center">{setting}</Typography>
                          </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                </Toolbar>
              </Container>
            </Toolbar>
          </AppBar>
        </Box>
      );
}

export default NavigationBar;