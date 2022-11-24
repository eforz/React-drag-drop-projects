import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import {ThemeProvider} from 'styled-components';
import Global from './components/styles/GlobalStyles';
import Theme from './components/styles/Theme';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render( 
  
    <Router>
      <ThemeProvider theme={Theme}>
        <App />
        <Global/>
      </ThemeProvider>
    </Router>
  
);

