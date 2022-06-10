import { useNavigate } from 'react-router-dom';

// UI

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { Button } from '@mui/material';

// Utils

import { PATH_DASHBOARD } from '../routes/paths';

type ButtonProps = {
  text: string,
}

export const ReturnButton = ({text}: ButtonProps) => {
  const navigate = useNavigate();
  return (
    <Button
      sx={{ alignSelf: 'flex-start' }}
      variant="text"
      startIcon={<ArrowBackOutlinedIcon />}
      onClick={() => navigate(PATH_DASHBOARD.root)}
    >
      {text}
    </Button>
  )
}

export default ReturnButton