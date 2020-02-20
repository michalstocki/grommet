import React from 'react';
import { hpe } from 'grommet-theme-hpe';
import { hp } from 'grommet-theme-hp';
import { dxc } from 'grommet-theme-dxc';
import { aruba } from 'grommet-theme-aruba';
import { Grommet } from '../src/js/components/Grommet';

export default function Wrapper({ children }) {
  return (
    <Grommet theme={dxc}>
      {children}
    </Grommet>
  );
}
