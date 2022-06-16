import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { Formik, Form, FormikHelpers, ErrorMessage } from 'formik';

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
import { createPlant, fetchPlantById, editPlantById} from '../services/plantsService'
import { MIconButton } from './@material-extend';

interface InitialValues {
  commonName: string;
  scientificName: string;
  description: string;
  picture: any;
  afterSubmit?: string;
};

interface FormProps {
  saveFace: any; //(fileName:Blob) => Promise<void>, // callback taking a string and then dispatching a store actions
}

const AddPlantSchema = Yup.object().shape({
  commonName: Yup.string().required('Se requiere el nombre común de la planta.'),
  scientificName: Yup.string().required('Se requiere el nombre científico de la planta.'),
  // description: Yup.string().required('Se requiere una descripción.'),
  picture: Yup.mixed().required('Se requiere un archivo.'),
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
  const [plant, setPlant] = useState<any>();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let { plantId } = useParams();

  const getPlantInfo = async () => {
    try {
      const res:any = plantId && await fetchPlantById(plantId);
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
          description: plant?.description || '',
          picture: null
        }}
        validationSchema={AddPlantSchema}
        onSubmit={async (
          values: InitialValues,
          { resetForm, setErrors }: FormikHelpers<InitialValues>
        ) => {
          try {
            const {commonName, scientificName, description, picture} = values;
            if(plantId){
              await editPlantById(plantId, commonName, scientificName, description, picture);
            } else {
              await createPlant(commonName, scientificName, description, picture);
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
        {({handleChange, values, errors, touched, isSubmitting, setFieldValue,}) => {
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
                    label="Nombre común"
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
                <Grid item xs={6}>
                  <input
                    accept="image/*"
                    className={classes.input}
                    type="file"
                    id="picture"
                    name="picture"
                    onChange={(event:any) => setFieldValue('picture', event.currentTarget.files[0])}
                  />
                  <Tooltip title="Seleccionar Imagen">
                    <label htmlFor="picture">
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
                  <label>{values.picture ? values.picture.name : "Seleccionar Imagen"}</label>. . .
                  <ErrorMessage name="picture">
                      { msg => <div style={{ color: '#FF4842', fontSize: 12, position: "relative", left: -33}}>{msg}</div> }
                  </ErrorMessage>
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