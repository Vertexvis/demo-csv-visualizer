import Typography from '@mui/material/Typography';
import React from 'react';

interface Props {
  children?: React.ReactNode | React.ReactNode[];
}

export function NoData({ children }: Props): JSX.Element {
  return (
    <Typography sx={{ mx: 2, mb: 2 }} variant="body2">
      {React.Children.count(children) === 0 ? 'No data' : children}
    </Typography>
  );
}
