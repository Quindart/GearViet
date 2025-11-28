import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './i18n/config';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import StoreProvider from 'store';
import { MuiThemeProvider } from 'theme/muiTheme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MuiThemeProvider>
        <StoreProvider>
          <App />
        </StoreProvider>
      </MuiThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
