import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

export const LoadingSpinner = () => {
  return (
    <Box display="flex" pt={1} justifyContent="center">
      <CircularProgress />
    </Box>
  );
};