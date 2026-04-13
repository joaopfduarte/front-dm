import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/locale/pt_BR';
import { faunaTheme } from './theme/faunaTheme';
import './index.css';
import App from './App';
import { Toaster } from 'sonner';
import { registerSW } from 'virtual:pwa-register'

registerSW({ immediate: true })
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster position="top-right" />
    <ConfigProvider theme={faunaTheme} locale={ptBR}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>,
);
