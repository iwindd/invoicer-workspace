'use client';
import * as React from 'react';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import { createTheme } from './theme';
import { CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import emotionCache from './theme/modules/EmotionCache';


export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const theme = createTheme();

  return (
    <CacheProvider value={emotionCache}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </CacheProvider>
  );
}