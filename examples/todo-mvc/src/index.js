import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import 'todomvc-app-css/index.css';
import App from './containers/App';
import { rootReducer } from './knives';

const store = createStore(combineReducers(rootReducer));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
