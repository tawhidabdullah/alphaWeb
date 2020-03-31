import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import App from './App';

// import store
import configureStore from './state/store';

// import css
import './styles/main.scss';

// optional cofiguration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_RIGHT,
  timeout: 7000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
};

const reduxStore = configureStore({});

ReactDOM.render(
  <ReduxProvider store={reduxStore}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </ReduxProvider>,
  document.getElementById('root')
);
