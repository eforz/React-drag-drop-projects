import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import {ThemeProvider} from 'styled-components';
import Global from './components/styles/GlobalStyles';
import Theme from './components/styles/Theme';
import { setupStore } from './store/store';
import { Provider } from 'react-redux';

const store = setupStore()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render( 
    <Router>
      <ThemeProvider theme={Theme}>
        <Provider store={store}>
          <App />
          <Global/>
        </Provider>
      </ThemeProvider>
    </Router>
);

