import { makeStyles } from '@mui/styles';
import { Link as RouterLink } from 'react-router-dom';

// Components
import EditUserForm from '../components/authentication/EditUserForm';
import ReturnButton from '../components/ReturnButton';


// UI

import { Box, Card, Link, Container, Typography } from '@mui/material';

// Utils

import { PATH_AUTH } from '../routes/paths';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100vh'
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginLink: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 24
  }
});

function EditUser() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <ReturnButton text='Regresar' />
      <Container className={classes.mainContainer}>
        <Card sx={{padding: 5, minWidth: 580}}>
          <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Edita tu información personal
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Realiza los cambios que desees a tu informacion personal
              </Typography>
            </Box>
          </Box>
          <EditUserForm />
        </Card>
      </Container>
    </div>
  )
}

export default EditUser