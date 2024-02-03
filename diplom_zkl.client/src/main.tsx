import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { StyledEngineProvider } from '@mui/joy/styles';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
        <Router>
            <AuthProvider>
                <App />
            </AuthProvider>
            </Router>
        </StyledEngineProvider>
    </React.StrictMode>
);
