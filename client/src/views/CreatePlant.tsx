// UI

import { Box, Card, Stack, Container, Typography } from '@mui/material';

// Components

import PlantForm from '../components/PlantForm'
import ReturnButton from '../components/ReturnButton'

function CreatePlant() {
  return (
    <Stack>
      <ReturnButton text='Regresar' />
      <Box sx={{ pb: '56px' }}>
        <Container maxWidth="sm">
          <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
              {/* <Typography variant="h4" gutterBottom>
                {mainText}
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                {secondaryText}
              </Typography> */}
            </Box>
          </Stack>
          <Card sx={{ padding:5 }}>
            <PlantForm />
          </Card>
        </Container>
      </Box>
    </Stack>
  )
}

export default CreatePlant