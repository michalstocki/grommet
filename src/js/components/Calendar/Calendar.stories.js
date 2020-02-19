import React from 'react';
import { Calendar } from './Calendar';

export const defaultCalendar = () => (
  <Calendar
    date={'2020-02-19'}
    daysOfWeek
    size="small"
    bounds={['2018-09-08', '2020-12-13']}
  />
)
