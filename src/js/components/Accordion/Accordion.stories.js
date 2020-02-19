import React from 'react';
import { Accordion } from './Accordion';
import { AccordionPanel } from '../AccordionPanel/AccordionPanel';
import { Box } from '../Box/Box';

export const defaultAccordion = () => (
  <Accordion>
    <AccordionPanel label="Panel 1">
      <Box background="light-2" overflow="auto" height="medium">
        <Box height="large" flex={false}>
          Panel 1 contents
        </Box>
      </Box>
    </AccordionPanel>
    <AccordionPanel label="Panel 2">
      <Box background="light-2" style={{ height: '50px' }}>
        Panel 2 contents
      </Box>
    </AccordionPanel>
    <AccordionPanel label="Panel 3">
      <Box background="light-2" style={{ height: '300px' }}>
        Panel 3 contents
      </Box>
    </AccordionPanel>
  </Accordion>
)
