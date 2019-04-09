import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from '../../Reducers';
import * as actions from '../../actions';
import { signInUser } from '../../thunks/signInUser';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/app';

jest.mock('../../thunks/signInUser');

beforeAll(() => {
  firebase.initializeApp({
    apiKey: "AIzaSyBZztEJm_KxmHfMGaxYgLIFah2XAdS5mh0",
    authDomain: "paired-turing.firebaseapp.com"
  });
});

describe('App', () => {
    const mockProps = {
      hasError: '',
      isLoading: false,
      user: {},
      getUser: jest.fn()
    };

    it('renders without crashing', () => {
      const div = document.createElement('div');
      const store = createStore(rootReducer);
      ReactDOM.render(
        <BrowserRouter>
          <Provider store={store}>
            <App {...mockProps} />
          </Provider>
        </BrowserRouter>,
        div
      );
      ReactDOM.unmountComponentAtNode(div);
    });
})
