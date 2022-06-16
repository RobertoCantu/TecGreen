import { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';

// UI

import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { Typography, Stack, Card, CardHeader, CardContent, CardActions, Collapse, Avatar } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { green, red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';

// Utils

import { deleteCommentById } from '../services/commentService';
import { fetchById } from '../services/authService'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

type cardProps = {
  authorId: string,
  description: string,
  careLevel: string,
  requiresSun: boolean,
  waterDays: number,
  canBeDeleted: boolean,
  commentId: string,
  setFetchAgain: any
}

export const ExpandableCard = ({authorId, canBeDeleted, description, careLevel, requiresSun, waterDays, commentId, setFetchAgain }:cardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [author, setAuthor] = useState('')
  const { enqueueSnackbar } = useSnackbar();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const didTapDelete = async () => {
    try {
      await deleteCommentById(commentId);
      enqueueSnackbar('El comentario fue eliminado correctamente', {
        variant: 'success'
      });
      setFetchAgain(true)
    } catch (err) {
      enqueueSnackbar('El comentario no fue eliminado correctamente', {
        variant: 'warning'
      });
      setFetchAgain(false)
    };
    setFetchAgain(false)
  }

  useEffect(() => {
    const getAuthorName = async (authorId: string) => {
      try {
        const response:any = authorId && await fetchById(authorId);
        let name = response.name + ' ' + response.lastName
        setAuthor(name)
      } catch(err:any){
        enqueueSnackbar('Error al buscar el nombre del usuario', {
          variant: 'warning'
        });
      }
    };

    getAuthorName(authorId)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        sx={{ textAlign: 'left' }}
        avatar={
          <Avatar sx={{ bgcolor: green[500] }}>
            T
          </Avatar>
        }
        title={
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {author}
          </Typography>
        }
        action={
          canBeDeleted && (
            <IconButton aria-label="settings" onClick={didTapDelete}>
              <DeleteIcon sx={{ color: red[500] }}/>
            </IconButton>
          )
        }
      />
      <CardContent sx={{pb: 0}}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1} sx={{ textAlign: 'left' }}>
            <Typography variant="h6" component="div">
              Nivel de care:
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
              {careLevel}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ textAlign: 'left' }}>
            <Typography variant="h6">
              Requiere sol:
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
              {requiresSun ? 'Sí' : 'No'}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ textAlign: 'left' }}>
            <Typography variant="h6">
              Días de riego a la semana:
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
              {waterDays}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{pt: 0}}>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left'}}>
            {description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};