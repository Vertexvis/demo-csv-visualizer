import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';

export function Header(): JSX.Element {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
    >
      <Typography>CAT + Vertex Analytics</Typography>
    </Box>
  );
}
