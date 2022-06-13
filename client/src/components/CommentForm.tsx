import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';

// Components


// UI

import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { Formik, Form, FormikHelpers } from 'formik';
import { TextField, Grid, FormGroup, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { Box, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';


// Hooks

import useAuth from '../hooks/useAuth';

// Utils

import { PATH_DASHBOARD } from '../routes/paths';
import { createComment, editCommentById, fetchCommentById} from '../services/commentService'
import { MIconButton } from './@material-extend';

interface InitialValues {
  care: string;
  irrigation: number;
  light: boolean;
  description: string
  afterSubmit?: string;
};

const AddCommentSchema = Yup.object().shape({
  care: Yup.string().required('Se requiere seleccionar una opción.'),
  irrigation: Yup.number().moreThan(0).required('Se requiere seleccionar una opción.'),
  light: Yup.boolean().required("Selecciona una opción"),
  description: Yup.string().required('Se requiere una descripción.'),
});

const CommentForm = () => {
  const navigate = useNavigate();
  const {user} = useAuth();
  const [comment, setComment] = useState<any>('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let { plantId } = useParams();
  let { commentId } = useParams();
 
  useEffect(() => {
    const getCommentInfo = async () => {
      try {
        const res:any = commentId && await fetchCommentById(commentId);
        setComment(res);
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
    }
    if(commentId){
      getCommentInfo()
    }
  }, [commentId])

  return (
    <Box>
      <Formik
        enableReinitialize={true} 
        initialValues={{
          care: comment?.care || '',
          irrigation: comment?.irrigation || '',
          light: comment?.light || false,
          description: comment?.content || ''
        }}
        validationSchema={AddCommentSchema}
        onSubmit={async (
          values: InitialValues,
          { resetForm, setErrors }: FormikHelpers<InitialValues>
        ) => {
          try {
            const { care, irrigation, light, description } = values;
            if(commentId){
              editCommentById(commentId, description);
            } else {
              await createComment(user?.id, plantId, description);
            }
            enqueueSnackbar(commentId ? 'Comentario actualizado exitosamente!': 'Comentario creado exitosamente!', {
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
        {({handleChange, values, errors, touched, isSubmitting, setFieldValue, getFieldProps}) => {
        return (
          <Form>
            {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
            <Grid container spacing={4}>
              <Grid item container xs={12} spacing={4}>
                <Grid item xs={12} md={12} lg={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Cuidados</InputLabel>
                    <Select
                      fullWidth
                      label="Cuidados"
                      {...getFieldProps('care')}
                      error={Boolean(touched.care && errors.care)}
                    >
                      <MenuItem value={0} disabled>Selecciona</MenuItem>
                      <MenuItem value={'HIGH'} >Alto</MenuItem>
                      <MenuItem value={'MEDIUM'}>Medio</MenuItem>
                      <MenuItem value={'LOW'}>Bajo</MenuItem>
                    </Select>
                    {touched.care && errors.care && <FormHelperText sx={{color:'red'}}>Selecciona una opcion</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={12} lg={6}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Riego</InputLabel>
                    <Select
                      fullWidth
                      label="Riego"
                      {...getFieldProps('irrigation')}
                      error={Boolean(touched.irrigation && errors.irrigation)}
                    >
                      <MenuItem value={0} disabled>Selecciona</MenuItem>
                      <MenuItem value={1} >Una vez por semana</MenuItem>
                      <MenuItem value={2}>Dos veces por semana</MenuItem>
                      <MenuItem value={3}>Tres veces por semana</MenuItem>
                    </Select>
                    {touched.irrigation && errors.irrigation && <FormHelperText sx={{color:'red'}}>Selecciona una opcion</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormGroup>
                    <FormControlLabel 
                      control={<Checkbox />} 
                      label="¿Requiere luz solar?" 
                      checked={values.light}
                      onChange= {() => setFieldValue('light', !values.light)}
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    autoComplete="description"
                    type="text"
                    label="Consejos"
                    name= "description"
                    value = {values.description}
                    multiline
                    rows={15}
                    onChange = {handleChange}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
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
                  {commentId ? 'Guardar cambios' : 'Agregar comentario'}
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