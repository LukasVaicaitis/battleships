import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@mantine/core/styles.css';
import App from './App.jsx'

import { MantineProvider } from '@mantine/core';

createRoot(document.getElementById('root')).render(
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <StrictMode>
      <App />
    </StrictMode>
  </MantineProvider>,
)
