import * as React from 'react';
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

// UI

import {Grid, Box, Button, Typography} from '@mui/material';

// Components

import { ExpandableCard } from '../components/ExpandableCard';
import ReturnButton from '../components/ReturnButton'

// Utils

import { fetchPlantById } from '../services/plantsService';

// Hooks

import useAuth from '../hooks/useAuth';
import AddIcon from "@mui/icons-material/Add";
import {PATH_DASHBOARD} from "../routes/paths";

export default function PlantRecommendation() {
  const [plantComments, setPlantComments] = useState<any>();
  const [plant, setPlant] = useState<any>();

  const [imageBuffer, setImageBuffer] = useState<any>(null);
  const [userName, setUserName] = useState<any>();
  const navigate = useNavigate();
  const [fetchAgain, setFetchAgain] = useState<any>();
  const { user } = useAuth();
  let { plantId } = useParams();

  console.log(imageBuffer);

  const getPlantComments = async () => {
    try {
      var binary = '';
      const response:any = plantId && await fetchPlantById(plantId);
      var bytes = new Uint8Array(response.picture.data.data);
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
      
      console.log(response)
      setPlant(response);
      setPlantComments(response.comments);
      setImageBuffer(btoa(binary))
    } catch(err:any){}
  };

  useEffect(() => {
    if(plantId || fetchAgain){
      getPlantComments()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plantId, fetchAgain])

  return (
    <>
    <Typography>{plant?.commonName}</Typography>
    {
      imageBuffer &&  
      <Box>
        <img src={`data:image/png;base64, ${imageBuffer}`} width="400px" height="300" alt="Imagen de planta"/>
      </Box>
    }
      <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ mb: 4, alignSelf: 'flex-end'}}
          onClick={() => navigate(PATH_DASHBOARD.general.plants+ '/' + plantId + '/Addcomment')}
      >
        Agregar Recomendación
      </Button>
       <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ml: 0}}>
        {plantComments && plantComments.map((plantComment: any, index: any) => (
          <Grid item xs={2} sm={4} md={4} key={index} sx={{mt: 2}}>
            <ExpandableCard
              setFetchAgain={setFetchAgain}
              canBeDeleted={user ? plantComment.user === user.id : false}
              commentId={plantComment._id}
              authorId={plantComment.user}
              description={plantComment.description}
              careLevel={plantComment.care}
              requiresSun={plantComment.light}
              waterDays={plantComment.irrigation}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}