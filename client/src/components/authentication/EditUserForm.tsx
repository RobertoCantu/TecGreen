import { useState } from 'react'
import { useSnackbar } from 'notistack';
import * as Yup from 'yup'

// UI

import closeFill from '@iconify/icons-eva/close-fill';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Icon } from '@iconify/react';
import { Formik, Form, FormikHelpers } from 'formik';
import { TextField, Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// Hooks

import useAuth from '../../hooks/useAuth';

// Utils

import { PASSWORD_REGEX, PHONE_REGEX, LASTNAME_REGEX } from '../../utils/regex';
import { MIconButton } from '../@material-extend';
import { fetchUserById } from '../../services/userService';
import { setupMaster } from 'cluster';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../routes/paths';
import { editPlantById } from '../../services/plantsService';

// Define types

type InitialValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  afterSubmit?: string;
  };

// Configure Yup validations
  
const RegisterSchema = Yup.object().shape({
  firstName: Yup.string().min(2, 'El nombre es muy corto').required('Se requiere un nombre(s).'),
  lastName: Yup.string().required('Se requieren los apellidos.').matches(LASTNAME_REGEX, "Se requieren los dos apellidos."),
  email: Yup.string().email('El correo debe ser una direccion de correo valida.').required('Se requiere un correo.'),
  password: Yup.string().required('Se requiere una contraseña.').matches(PASSWORD_REGEX,
    "La contraseña debe tener 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y un carácter especial."
    ),
  });

function EditUserForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const context = useAuth();
  const {register} = context;
  const navigate = useNavigate();
  const [user, setUser] = useState<any>();
  let { userId } = useParams();

  const onClickShowPassword = () => {
    setShowPassword((prev) => !prev)
  };

  const getUserInfo = async () => {
    try {
      const res:any = userId && await fetchUserById(userId);
      console.log(res);
      setUser(res);
    } catch(err:any){
      navigate(PATH_DASHBOARD.root);
      enqueueSnackbar(err.error, {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
        )
      })
    }
  };

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={{
          firstName: user?.firstName || '',
          lastName: user?.lastName || '',
          email: user?.email || '',
          phone: user?.phone || '',
          password: user?.password || '',
        }}
        validationSchema= {RegisterSchema}
        onSubmit={async (
          values: InitialValues,
          { resetForm, setErrors }: FormikHelpers<InitialValues>
        ) => {
          try {
            const {firstName, lastName, email, password} = values;
            if(userId){
             // await editUserById(userId, )
            }
            await register(values.firstName, values.lastName, values.email, values.password);
            enqueueSnackbar('¡Creación de cuenta exitosa!', {
              variant: 'success',
              action: (key) => (
                <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                  <Icon icon={closeFill} />
                </MIconButton>
              )
            });
          } catch (error:any){
            console.log(error.message)
            resetForm();
            //Falta agregar useRef
            setErrors({ afterSubmit: error.message });
          }
        }}
      >
        {({handleChange, values, errors, touched, isSubmitting, setFieldValue}) => (
          <Form>
            <Stack spacing={2}>
              {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
              <TextField
                  fullWidth
                  autoComplete="firstName"
                  type="text"
                  label="Nombre(s)"
                  name= "firstName"
                  value = {values.firstName}
                  onChange = {handleChange}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
                <TextField
                  fullWidth
                  autoComplete="lastName"
                  type="text"
                  label="Apellidos"
                  name= "lastName"
                  value = {values.lastName}
                  onChange = {handleChange}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
                <TextField
                  fullWidth
                  autoComplete="email"
                  type="email"
                  label="Correo electrónico"
                  name= "email"
                  value = {values.email}
                  onChange = {handleChange}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  fullWidth disabled
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  label="Contraseña"
                  name= "password"
                  value= {values.password}
                  onChange = {handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" onClick={onClickShowPassword}>
                          <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
                <LoadingButton
                  fullWidth
                  size='large'
                  type='submit'
                  variant='contained'
                  loading={isSubmitting}
                >
                  Guardar Cambios
                </LoadingButton>
            </Stack>
          </Form>
        )
        }
      </Formik>
    </div>
  )
}

export default EditUserForm
