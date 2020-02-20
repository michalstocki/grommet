import React from 'react';
import { Menu } from './Menu';

export const defaultMenu = () => (
  <Menu
    dropProps={{ align: { top: 'bottom', left: 'left' } }}
    label="actions"
    items={[
      { label: 'Launch', onClick: () => {} },
      { label: 'Abort', onClick: () => {} },
      { label: 'Disabled', disabled: true },
    ]}
  />
)
