import * as React from 'react';
import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

// UI

import {Card, Button, Box, Stack, Typography, Paper, Grid } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { createStyles, makeStyles } from '@mui/styles';
import AddIcon from '@mui/icons-material/Add';

// Components

import { ExpandableCard } from '../components/ExpandableCard';

// Utils

import { PATH_DASHBOARD } from '../routes/paths';
import { fetchPlantById } from '../services/plantsService';
import { fetchById } from '../services/authService'

// Customed styles
const useStyles = makeStyles(() =>
  createStyles({
    root: {
      alignItems: 'center',
      lineHeight: '24px',
      width: '100%',
      height: '100%',
      position: 'relative',
      display: 'flex',
      '& .cellValue': {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
  }),
);

export default function PlantRecommendation() {
  const [plantComments, setPlantComments] = useState<any>();
  const [userName, setUserName] = useState<any>();
  const navigate = useNavigate();
  const classes = useStyles();
  let { plantId } = useParams();

  const getPlantComments = async () => {
    try {
      const response:any = plantId && await fetchPlantById(plantId);
      setPlantComments(response.comments);
    } catch(err:any){}
  };

  const getName = async (userId: string) => {
    try {
      const response:any = userId && await fetchById(userId);
      let name = response.name + ' ' + response.lastName
      return name
    } catch(err:any){}
  };

  const getUserName = async (userId: string) => {
    let name = await getName(userId)
    console.log(name)
    return name
  }

  useEffect(() => {
    if(plantId){
      getPlantComments()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plantId])

  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {plantComments && plantComments.map((plantComment: any, index: any) => (
        <Grid item xs={2} sm={4} md={4} key={index}>
          <ExpandableCard
            author={() => getUserName(plantComment.user)}
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