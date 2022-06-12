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
import { FormGroup, FormControlLabel, Checkbox, IconButton, Tooltip, Box, Alert, Button, Theme} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { PhotoCamera } from '@material-ui/icons'
import { makeStyles } from '@mui/styles';

// Hooks

import useAuth from '../hooks/useAuth';

// Utils

import { PATH_DASHBOARD } from '../routes/paths';
import { createPlant} from '../services/plantsService'
import { MIconButton } from './@material-extend';
// import { fetchEditRouteById } from '../../services/routesService';

interface InitialValues {
  description:String
  afterSubmit?: string;
};

interface FormProps {
  saveFace: any; //(fileName:Blob) => Promise<void>, // callback taking a string and then dispatching a store actions
}

const AddCommentSchema = Yup.object().shape({
  description: Yup.string().required('Se requiere una descripción.'),
});

const useStyles:any = makeStyles((theme: any) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  faceImage: {
    color: theme.palette.primary.light,
  },
}));

const CommentForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const {user} = useAuth();
  const [selected, setSelected] = useState<any>([]);
  const [ride, setRide] = useState<any>([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  let { rideId } = useParams();
  let { plantId } = useParams();
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [saveFace, setSaveFace] = useState<any>();

  console.log(plantId);

  // Functions
  const handleCapture = ({ target }: any) => {
    setSelectedFile(target.files[0]);
  };

  const handleSubmit = () => {
    setSaveFace(selectedFile);
  };


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
          flowers: ride?.gasolina || false,
          seeds: ride?.asientos || false,
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
              await createPlant(commonName, scientificName, flowers, seeds)
              //await createRoute(user?.id, direccion, hora, asientos, gasolina, days)
            }
            enqueueSnackbar(rideId ? 'Planta actualizada exitosamente!': 'Planta creada exitosamente!', {
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
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                <Grid item xs={12}>
                  <FormGroup>
                    <FormControlLabel 
                      control={<Checkbox />} 
                      label="¿Tiene flores?" 
                      checked={values.flowers}
                      onChange= {() => setFieldValue('flowers', !values.flowers)}
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <FormGroup>
                    <FormControlLabel 
                      control={<Checkbox />} 
                      label="¿Tiene semillas?" 
                      checked={values.seeds}
                      onChange= {() => setFieldValue('seeds', !values.seeds)}
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={8}>
                  <input
                    accept="image/jpeg"
                    className={classes.input}
                    id="faceImage"
                    type="file"
                    onChange={handleCapture}
                  />
                  <Tooltip title="Seleccionar Imagen">
                    <label htmlFor="faceImage">
                      <IconButton
                        className={classes.faceImage}
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                      >
                        <PhotoCamera fontSize="large" />
                      </IconButton>
                    </label>
                  </Tooltip>
                  <label>{selectedFile ? selectedFile.name : "Seleccionar Imagen"}</label>. . .
                  <Button onClick={() => handleSubmit()} color="primary">
                    Guardar
                  </Button>
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

export default CommentForm