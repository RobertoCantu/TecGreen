import React, { useState, useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

// UI

import { makeStyles } from '@mui/styles';
import {Box, Link, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { MIconButton } from './@material-extend';
import { Icon } from '@iconify/react';
import eyeIcon from '@iconify/icons-eva/eye-outline';
import trash from '@iconify/icons-eva/trash-2-outline';
import edit from '@iconify/icons-eva/edit-2-outline';
import closeFill from '@iconify/icons-eva/close-fill';

// Utils

import { deletePlantById, getPlants } from '../services/plantsService';
// import { fetchUserById } from '../services/userService'
import { PATH_DASHBOARD } from '../routes/paths';

// Hooks

import useAuth from '../hooks/useAuth';

// interfaces 
interface data {
  data?:any;
  tableName?:any;
  setPlants?:any;
  setUsers?:any;
  deleteById?:any;
};

function TableIcons({data, tableName, setPlants, deleteById}: data) {

    const classes = useStyles();
    const context = useAuth();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [deleteCurr, setDeleteCurr] = useState(false);
    const [open, setOpen] = useState(false);

    // functions
    // This function delete a row base in id
    

    const handleDeleteSubmit = () => {
      deleteById(data.id, setDeleteCurr);
    }

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <Box sx={{ display: 'flex', justifyContent: "space-evenly",width:'100%', }}>
        <Link 
          sx={{fontWeight:'bold'}} 
          underline="none" 
          color="#637381"  
          component={RouterLink} 
          to={PATH_DASHBOARD.general.plants + `/${data.id}`}
        >
          <Icon 
            className={classes.eyeHover} 
            style={{ fontSize: '22px' }} 
            icon={eyeIcon}
          />
        </Link>
       {
        <Link 
            color="#637381" 
            component={RouterLink} 
            to={PATH_DASHBOARD.general.plants + `/edit/${data.id}`}
          >
            <Icon 
              className={classes.editHover} 
              style={{ fontSize: '22px' }} 
              icon={edit}
            />
          </Link>
        }
        {
          <Link 
            color="#637381" 
          >
            <Icon 
              className={classes.trashHover} 
              style={{ fontSize: '22px' }} 
              icon={trash}
              onClick={handleClickOpen}
            />
          </Link>
        }
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"¿Estás seguro de borrar esta planta?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Al confirmar no se podrán deshacer los cambios.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              Cancelar
            </Button>
            <LoadingButton
              size="small"
              color="error"
              onClick={handleDeleteSubmit}
              variant="contained"
              loading={deleteCurr}
            >
              Confirmar
            </LoadingButton> 
          </DialogActions>
        </Dialog>
      </Box>
    )
};

const useStyles = makeStyles({
    eyeHover: {
      '&:hover': {
        color:'blue'
      }
    },
    trashHover: {
      '&:hover': {
        color:'red'
      }
    },
    editHover: {
      '&:hover': {
        color:'blue'
      }
    },
    search:{
      margin:"20px"
    },
    enhancedTableToolbar: {
      flex: 1
    },
  });

export default TableIcons