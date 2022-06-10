import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';

// Components


// UI

import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { Formik, Form, FormikHelpers } from 'formik';
import { TextField, Grid, OutlinedInput } from '@mui/material';
import { FormGroup, FormControlLabel, Checkbox, Select, FormControl, InputLabel, MenuItem, Box, ListItemText, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { TimePicker } from '@mui/lab';

// Hooks

import useAuth from '../hooks/useAuth';

// Utils

import { PATH_DASHBOARD } from '../routes/paths';
// import { createRoute, editRouteById} from '../../services/routesService'
import { MIconButton } from './@material-extend';
// import { fetchEditRouteById } from '../../services/routesService';

interface InitialValues {
  commonName: string;
  scientificName: string;
  flowers: string;
  seeds: string;
  afterSubmit?: string;
};

const AddPlantSchema = Yup.object().shape({
  commonName: Yup.string().required('Se requiere el nombre comun de la planta.'),
  scientificName: Yup.string().required('Se requiere el nombre cientifico de la planta.'),
  flowers: Yup.string().required('Se requiere las flores de la planta.'),
  seeds: Yup.string().required('Se requieren las semillas de la planta.'),
});

const PlantForm = () => {
  const navigate = useNavigate();
  const {user} = useAuth();
  const [selected, setSelected] = useState<any>([]);
  const [ride, setRide] = useState<any>([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  let { rideId } = useParams();
  let { plantId } = useParams();

  console.log(plantId);

  // Functions
  

  useEffect(() => {
    const getRouteInfo = async () => {
      // try {
      //   const response: any = rideId && await fetchEditRouteById(rideId)
      //   setRide(response);
      //   setSelected(response.dias)
      // } catch(err:any){
      //   navigate(PATH_DASHBOARD.root);
      //   enqueueSnackbar(err.error, {
      //     variant: 'error',
      //     action: (key) => (
      //       <MIconButton size="small" onClick={() => closeSnackbar(key)}>
      //         <Icon icon={closeFill} />
      //       </MIconButton>
      //     )
      //   });
      // }
    }
    if(rideId){
      getRouteInfo()
    }
  }, [rideId])

  return (
    <Box>
      <Formik
        enableReinitialize={true} 
        initialValues={{
          commonName: ride?.origen || '',
          scientificName: ride?.horaLlegada || '',
          flowers: ride?.gasolina || '',
          seeds: ride?.asientos || '',
        }}
        validationSchema={AddPlantSchema}
        onSubmit={async (
          values: InitialValues,
          { resetForm, setErrors }: FormikHelpers<InitialValues>
        ) => {
          try {
            const {commonName, scientificName, flowers, seeds } = values;
            if(rideId){
              //await editRouteById(rideId!, user?.id, direccion, hora, asientos, gasolina, days)
            } else {
              //await createRoute(user?.id, direccion, hora, asientos, gasolina, days)
            }
            enqueueSnackbar(rideId ? '¡Ruta actualizada exitosamente!': '¡Ruta creada exitosamente!', {
              variant: 'success',
              action: (key) => (
                <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                  <Icon icon={closeFill} />
                </MIconButton>
              )
            });
            navigate(PATH_DASHBOARD.root);
          } catch (error:any){
            resetForm();
            setSelected([]);
            setErrors({ afterSubmit: error.response.data.message });
          }
        }}
      >
        {({handleChange, values, errors, touched, isSubmitting, setFieldValue}) => {
        return (
          <Form>
            {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
            <Grid container spacing={4}>
              <Grid item container xs={12} spacing={4}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    autoComplete="commonName"
                    type="text"
                    label="Nombre comun"
                    name= "commonName"
                    value = {values.commonName}
                    onChange = {handleChange}
                    error={Boolean(touched.commonName && errors.commonName)}
                    helperText={touched.commonName && errors.commonName}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    autoComplete="scientificName"
                    type="text"
                    label="Nombre científico"
                    name= "scientificName"
                    value = {values.scientificName}
                    onChange = {handleChange}
                    error={Boolean(touched.scientificName && errors.scientificName)}
                    helperText={touched.scientificName && errors.scientificName}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    autoComplete="flowers"
                    type="text"
                    label="Nombre de flor"
                    name= "flowers"
                    value = {values.flowers}
                    onChange = {handleChange}
                    error={Boolean(touched.flowers && errors.flowers)}
                    helperText={touched.flowers && errors.flowers}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    autoComplete="seeds"
                    type="text"
                    label="Nombre de semilla"
                    name= "seeds"
                    value = {values.seeds}
                    onChange = {handleChange}
                    error={Boolean(touched.seeds && errors.seeds)}
                    helperText={touched.seeds && errors.seeds}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  fullWidth
                  size='large'
                  type='submit'
                  variant='contained'
                  loading={isSubmitting}
                >
                  {rideId ? 'Guardar cambios' : 'Agregar planta'}
                </LoadingButton>
              </Grid>
            </Grid>
          </Form>
          )}}
      </Formik>
    </Box>
  )
}

export default PlantForm