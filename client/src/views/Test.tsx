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
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
        careLevel="Low"
        requiresSun={true}
        waterDays={4}
      />
    </Stack>
  )
}