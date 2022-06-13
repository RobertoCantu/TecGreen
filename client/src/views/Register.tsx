import { makeStyles } from '@mui/styles';
import { Link as RouterLink } from 'react-router-dom';

// Components

import RegisterForm  from '../components/authentication/RegisterForm'

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

function Register() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Container className={classes.mainContainer}>
        <Card sx={{padding: 5, minWidth: 580}}>
          <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                ¡Comienza a cuidar tus plantas hoy!
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Completa la siguiente información para crear tu cuenta
              </Typography>
            </Box>
          </Box>
          <RegisterForm/>
        </Card>
        <div className={classes.loginLink}>
          <Typography  variant="body2">
            ¿Ya tienes una cuenta? &nbsp;
          </Typography>
          <Link underline="none" variant="subtitle2" component={RouterLink} to={PATH_AUTH.login}>
            Iniciar Sesión
          </Link>
        </div>
      </Container>
    </div>
  )
}

export default Register