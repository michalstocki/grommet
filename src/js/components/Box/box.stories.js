import { Box } from './Box';
import React from 'react';

export const defaultBox = () => (
  <Box
    pad="large"
    align="center"
    background={{ color: 'light-2', opacity: 'strong' }}
    round
    gap="small"
  >
    Box content
  </Box>
);
