import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { Typography, Stack, Card, CardHeader, CardContent, CardActions, Collapse, Avatar } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { green } from '@mui/material/colors';

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
  author: any,
  description: string,
  careLevel: string,
  requiresSun: boolean,
  waterDays: number
}

export const ExpandableCard = ({author, description, careLevel, requiresSun, waterDays }:cardProps) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
      />
      <CardContent sx={{pb: 0}}>
        <Stack spacing={2}>
          <Stack direction="row" spacing={1}>
            <Typography variant="h6" component="div">
              Nivel de care:
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, textAlign: 'left' }}>
              {careLevel}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography variant="h6">
              Requiere sol:
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, textAlign: 'left' }}>
              {requiresSun ? 'Sí' : 'No'}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography variant="h6">
              Días de riego a la semana:
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, textAlign: 'left' }}>
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