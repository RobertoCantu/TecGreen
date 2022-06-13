import { Link as RouterLink } from 'react-router-dom';

// UI

import { Box, Card, Stack, Container, Typography, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';

// Components

import LoginForm from '../components/authentication/LoginForm'

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
  registerLink: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 24
  }
});

function Login() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth="sm" className={classes.mainContainer}>
          <Card sx={{padding:5}}>
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Iniciar Sesión en TecGreen
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                  Ingresa tus datos
                </Typography>
              </Box>
            </Stack>
            <LoginForm/>
          </Card>
          <div className={classes.registerLink}>
            <Typography variant="body2">
              ¿No tienes una cuenta?&nbsp;
            </Typography>
            <Link underline="none" variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
              Crear una cuenta
            </Link>
          </div>
      </Container>
    </div>

  )
};

export default Login