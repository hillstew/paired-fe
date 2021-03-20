import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/App';
import { transitions, positions, types, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from "react-alert-template-mui";
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import './styles/main.scss';
import firebase from 'firebase/app';

firebase.initializeApp({
  apiKey: "AIzaSyBZztEJm_KxmHfMGaxYgLIFah2XAdS5mh0",
  authDomain: "paired-turing.firebaseapp.com"
  // Test environment Firebase config options
  // apiKey: "AIzaSyDryiKswDwY6L5AODmMvw5I8Wb6cm3PweU",
  // authDomain: "landslide-57f9a.firebaseapp.com"
});

const options = {
  position: positions.MIDDLE,
  timeout: 6000,
  type: types.SUCCESS,
  transition: transitions.FADE
}

const devTools = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(rootReducer, devTools);
const provider = (
  <BrowserRouter>
    <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
      </AlertProvider>
    </Provider>
  </BrowserRouter>
);

ReactDOM.render(provider, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
