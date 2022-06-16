import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { MenuItem, Menu } from '@mui/material';
import { Link } from "react-router-dom";

//Routes

import {PATH_DASHBOARD, PATH_ADMIN, PATH_AUTH} from "../routes/paths";

// Hooks

import useAuth from '../hooks/useAuth';


export default function AppNavBar() {
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState<any>(false);
  const isMenuOpen = Boolean(anchorEl);

  const role = user?.role;


  const handleMenuClose = () => {
    setAnchorEl(false);
  };

  const handleMenuOpen = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {(role == 'admin') ? 
      <>
        <MenuItem component={Link} to={PATH_ADMIN.general.plants}>Administrar plantas</MenuItem>
        <MenuItem component={Link} to={PATH_ADMIN.general.users}>Adminstrar usuarios</MenuItem>
        </>
        :
        null
    
      }
      <MenuItem component={Link} to={PATH_AUTH.root + '/logout'}>Cerrar Sesión</MenuItem>

    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuOpen}
          >
           <MenuIcon/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TecGreen
          </Typography>
          <Button color="inherit" component={Link} to={PATH_DASHBOARD.root}>Inicio</Button>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
