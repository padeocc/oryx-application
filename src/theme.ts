import { MantineColorsTuple, MantineThemeOverride } from '@mantine/core';

const green_oryx: MantineColorsTuple = [
  '#FFFFFF', // White
  '#E1F3F3', // Lighter light blue
  '#C3E5E5', // Lighter turquoise
  '#A4D7D7', // Light pastel turquoise
  '#86C9C9', // Light teal
  '#68BBBB', // Soft teal
  '#4AA5A5', // Light greenish-blue
  '#3498A2', // Lighter shade of #027F8B
  '#2B7A7A', // Lighter version of somber green
  '#1F5D5D', // Lighter somber green
  '#004040' // Somber green
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
    green_oryx
  },
  primaryColor: 'green_oryx'
};

export const inputDefaultBackgrounColor = '#f1f3f5';
