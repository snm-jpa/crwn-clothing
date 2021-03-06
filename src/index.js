import React from 'react';                       //Default Import
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; //Named Import
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './redux/store';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  //Provider: Makes the Redux store available to the connect() calls in the component hierarchy below.
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
