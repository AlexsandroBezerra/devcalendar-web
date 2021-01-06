import React from 'react'

import { ThemeProvider } from 'styled-components'

import { ToastProvider } from './Toast'

import theme from '../styles/theme'

const AppProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <ToastProvider>{children}</ToastProvider>
  </ThemeProvider>
)

export default AppProvider
