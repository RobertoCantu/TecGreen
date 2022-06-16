import * as React from 'react';
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

// UI

import { Grid } from '@mui/material';

// Components

import { ExpandableCard } from '../components/ExpandableCard';

// Utils

import { fetchPlantById } from '../services/plantsService';

// Hooks

import useAuth from '../hooks/useAuth';

export default function PlantRecommendation() {
  const [plantComments, setPlantComments] = useState<any>();
  const [fetchAgain, setFetchAgain] = useState<any>();
  const { user } = useAuth();
  let { plantId } = useParams();

  const getPlantComments = async () => {
    try {
      const response:any = plantId && await fetchPlantById(plantId);
      setPlantComments(response.comments);
    } catch(err:any){}
  };

  useEffect(() => {
    if(plantId || fetchAgain){
      getPlantComments()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plantId, fetchAgain])

  return (
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
  );
}