import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import store from './store/index';
import Moralis from 'moralis';
const serverUrl="https://azmqzuknme5r.usemoralis.com:2053/server";
const appId="2UoGgYjT67yJb4Wj998BbgGkinjrb3aStDSlgOOJ";
Moralis.start({serverUrl,appId})
export const moralisClient=Moralis;
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
