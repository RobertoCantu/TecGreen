import { useParams } from 'react-router-dom';

// UI

import { Typography, Box, Stack, Button, Container } from '@mui/material';

// Components

import { ExpandableCard } from '../components/ExpandableCard';


export default function Test() {

  return (

    <Stack sx={{ height: '100vh'}}>
      <ExpandableCard
        author="Frida Gutierrez"
        date="Junio 8, 2022"
        description="Breve descripción"
        careLevel="Low"
        requiresSun={true}
        waterDays={4}
      />
    </Stack>
  )
}