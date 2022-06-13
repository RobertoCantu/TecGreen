import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';

// Components


// UI

import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { Formik, Form, FormikHelpers } from 'formik';
import { TextField, Grid } from '@mui/material';
import { Box, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';


// Hooks

import useAuth from '../hooks/useAuth';

// Utils

import { PATH_DASHBOARD } from '../routes/paths';
import { createComment, editCommentById, fetchCommentById} from '../services/commentService'
import { MIconButton } from './@material-extend';

interface InitialValues {
  description: string
  afterSubmit?: string;
};

const AddCommentSchema = Yup.object().shape({
  description: Yup.string().required('Se requiere una descripción.'),
});

const CommentForm = () => {
  const navigate = useNavigate();
  const {user} = useAuth();
  const [comment, setComment] = useState<any>('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  let { plantId } = useParams();
  let { commentId } = useParams();


  console.log(plantId);
  console.log(user?.id)

 
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
          description: comment?.content || ''
        }}
        validationSchema={AddCommentSchema}
        onSubmit={async (
          values: InitialValues,
          { resetForm, setErrors }: FormikHelpers<InitialValues>
        ) => {
          try {
            const { description } = values;
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
        {({handleChange, values, errors, touched, isSubmitting, setFieldValue}) => {
        return (
          <Form>
            {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
            <Grid container spacing={4}>
              <Grid item container xs={12} spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    autoComplete="description"
                    type="text"
                    label="Descripción"
                    name= "description"
                    value = {values.description}
                    multiline
                    rows={20}
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