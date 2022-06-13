import * as React from 'react';
import { useState , useEffect} from 'react'
import { useNavigate } from "react-router-dom";

// UI

import { Box, CardMedia, Autocomplete, TextField, Stack} from '@mui/material'

// Utils

import { PATH_DASHBOARD } from '../routes/paths';
import { getPlants } from '../services/plantsService'

export default function ComboBox() {
  const [plants, setPlants] = useState<any>([]);
  let navigate = useNavigate();

  const handleChange = (event:any, newValue:any) => {
    const id = newValue._id
    navigate(PATH_DASHBOARD.general.plants + '/' + id)
  }

  const getAllPlants = async () => {
    try {
      const response:any = await getPlants();
      setPlants(response);
    } catch(err){
    }
  }

  useEffect(() => {
    // Api call for setting plants
    getAllPlants();
  }, [])

  return(
    <Stack 
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={0}
      m={20}
      
    >
      <CardMedia
        component="img"
        height="200"
        image="/logo.png"
        alt="TecGreen"
        sx={{ maxWidth:600, minWidth:400}}
      />
       <Autocomplete
        disablePortal
        id="combo-box"
        options={plants}
        getOptionLabel={(option:any) => option.commonName}
        sx={{ width: 800}}
        renderInput={(params) => <TextField {...params} label="Buscar..." />}
        onChange={handleChange}
      />
    </Stack>
   
  );
}