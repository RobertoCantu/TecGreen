import { Outlet } from 'react-router-dom';

// UI
import { styled, useTheme, Container, Box } from '@mui/material';

// Utils

import useCollapseDrawer from '../../hooks/useCollapseDrawer';

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  //paddingTop: theme.spacing(4),
  //paddingBottom: theme.spacing(8),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2)
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const theme = useTheme();
  const { collapseClick } = useCollapseDrawer();

  return (
  <Box sx={{ height: '100vh'}}>
    <Container maxWidth="xl" sx={{ height: '100%', mt: 8}}>
      <MainStyle
        sx={{
          transition: theme.transitions.create('margin', {
            duration: theme.transitions.duration.complex
          }),
          ...(collapseClick && {
            ml: '102px'
          })
        }}
      >
        <Outlet />
      </MainStyle>
    </Container>
    </Box>
  );
}