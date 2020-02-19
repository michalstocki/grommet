import { Box } from '../Box';
import { AccordionPanel } from './AccordionPanel';
import React from 'react';

export const defaultAccordionPanel = () => (
  <AccordionPanel label="Panel 1">
    <Box background="light-2" overflow="auto" height="medium">
      <Box height="large" flex={false}>
        Panel 1 contents
      </Box>
    </Box>
  </AccordionPanel>
);
