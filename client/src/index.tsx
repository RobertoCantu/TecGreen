import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { MIconButton } from './components/@material-extend';
import ThemeConfig from './theme';


// icons
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';

// context 
import { AuthProvider } from './contexts/AuthContext';
import { CollapseDrawerProvider } from './contexts/CollapseDrawerContext';

const notistackRef:any = React.createRef();
const onClickDismiss = (key: any) => () => { 
    notistackRef.current.closeSnackbar(key);
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider
         anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        ref={notistackRef}
        action={(key) => (
          <MIconButton size="small" onClick={onClickDismiss(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )}
      >
        <AuthProvider>
         <ThemeConfig>
            <CollapseDrawerProvider>
              <App />
            </CollapseDrawerProvider>
          </ThemeConfig>
        </AuthProvider>
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
