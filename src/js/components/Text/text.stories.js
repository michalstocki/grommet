import React from 'react';
import { storiesOf } from '@storybook/react';

import { grommet } from 'grommet/themes';
import { Grommet } from '../Grommet';
import Box from '../Box/Box/Box';
import Text from './Text';

const sizes = [
  'xxlarge',
  'xlarge',
  'large',
  'medium',
  'small',
  'xsmall',
  '77px',
];

const All = () => (
  <Grommet theme={grommet}>
    {sizes.map(size => (
      <Box key={size} margin="small">
        <Text size={size}>{`Text ${size}`}</Text>
      </Box>
    ))}
  </Grommet>
);

const Color = () => (
  <Grommet theme={grommet}>
    <Text color="accent-1">Colored Text</Text>
  </Grommet>
);

storiesOf('Text', module)
  .add('All', () => All())
  .add('Color', () => Color());
