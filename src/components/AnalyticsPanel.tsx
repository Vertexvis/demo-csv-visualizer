import { Box, Button, Typography } from '@mui/material';
import React from 'react';

import { visualizeFile } from '../lib/analytics';
import { Viewer } from '../lib/viewer';

interface Props {
  readonly viewer: Viewer;
}

export function AnalyticsPanel({ viewer }: Props): JSX.Element {
  return (
    <Box mx={2} mb={2}>
      <Box mb={2}>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Use the button below to select a CSV file and visualize its results.
          An example CSV file can be found in the root of the project.
        </Typography>
        <Button variant="contained" component="label">
          Open CSV
          <input
            type="file"
            id="select-file"
            accept=".csv"
            hidden
            onChange={async (event) => {
              const file =
                event.target.files != null ? event.target.files[0] : null;
              if (file != null && viewer.ref.current != null) {
                visualizeFile(file, viewer.ref.current);
                event.target.value = '';
              }
            }}
          />
        </Button>
      </Box>
    </Box>
  );
}
