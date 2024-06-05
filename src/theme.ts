import { MantineColorsTuple, MantineThemeOverride } from '@mantine/core';

const green: MantineColorsTuple = [
  '#f1f9f8',
  '#e4efee',
  '#c4dfda',
  '#a0cdc6',
  '#83bfb6',
  '#70b6ab',
  '#65b3a5',
  '#549c90',
  '#478c80',
  '#34796e'
];

const gray_oryx: MantineColorsTuple = [
  '#dbdbdb',
  '#dfdfdf',
  '#e3e3e3',
  '#e7e7e7',
  '#ebebeb',
  '#eeeeee',
  '#f1f1f1',
  '#f4f4f4',
  '#f7f7f7',
  '#f9f9f9',
  '#fcfcfc',
  '#ffffff'
];

export const theme: MantineThemeOverride = {
  fontFamily: 'Comfortaa,Arial,Helvetica,sans-serif',
  fontSizes: {
    xs: '0.7rem',
    sm: '0.8rem',
    md: '0.9rem',
    lg: '1.0rem',
    xl: '1.2rem'
  },
  headings: {
    sizes: {
      h1: { fontWeight: '100', fontSize: '2.3em' },
      h2: { fontSize: '1.2rem' },
      h3: { fontSize: '1.1rem' }
    }
  },
  colors: {
    green,
    gray_oryx
  },
  primaryColor: 'green'
};
