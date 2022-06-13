import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { Formik, Form, FormikHelpers } from 'formik';

// UI

import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { TextField, Grid } from '@mui/material';
import { FormGroup, FormControlLabel, Checkbox, IconButton, Tooltip, Box, Alert, Button} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { PhotoCamera } from '@material-ui/icons'
import { makeStyles } from '@mui/styles';

// Hooks

import useAuth from '../hooks/useAuth';

// Utils

import { PATH_DASHBOARD } from '../routes/paths';
import { createPlant, fetchPlantById } from '../services/plantsService'
import { MIconButton } from './@material-extend';

interface InitialValues {
  commonName: string;
  scientificName: string;
  flowers: boolean;
  seeds: boolean;
  afterSubmit?: string;
};

interface FormProps {
  saveFace: any; //(fileName:Blob) => Promise<void>, // callback taking a string and then dispatching a store actions
}

const AddPlantSchema = Yup.object().shape({
  commonName: Yup.string().required('Se requiere el nombre comun de la planta.'),
  scientificName: Yup.string().required('Se requiere el nombre cientifico de la planta.'),
  flowers: Yup.string().required('Se requiere las flores de la planta.'),
  seeds: Yup.string().required('Se requieren las semillas de la planta.'),
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

const PlantForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const {user} = useAuth();
  const [plant, setPlant] = useState<any>();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
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

  const getPlantInfo = async () => {
    try {
      const res:any = plantId && await fetchPlantById(plantId);
      console.log(res);
      setPlant(res);

    } catch(err:any){
        navigate(PATH_DASHBOARD.root);
        enqueueSnackbar(err.error, {
          variant: 'error',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
    }
  };

  // Effects
  useEffect(() => {
    if(plantId){
      getPlantInfo()
    }
  }, [plantId])

  return (
    <Box>
      <Formik
        enableReinitialize={true} 
        initialValues={{
          commonName: plant?.commonName || '',
          scientificName: plant?.scientificName || '',
          flowers: plant?.flowers || false,
          seeds: plant?.seeds || false,
        }}
        validationSchema={AddPlantSchema}
        onSubmit={async (
          values: InitialValues,
          { resetForm, setErrors }: FormikHelpers<InitialValues>
        ) => {
          try {
            const {commonName, scientificName, flowers, seeds } = values;
            if(plantId){
              //await editRouteById(rideId!, user?.id, direccion, hora, asientos, gasolina, days)
            } else {
              await createPlant(commonName, scientificName, flowers, seeds)
            }
            enqueueSnackbar(plantId ? 'Planta actualizada exitosamente!': 'Planta creada exitosamente!', {
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
                  {plantId ? 'Guardar cambios' : 'Agregar planta'}
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