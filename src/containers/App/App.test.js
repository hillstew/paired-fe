import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from '../../Reducers';
import * as actions from '../../actions';
import { getUserAndSchedule } from '../../thunks/getUserAndSchedule';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../thunks/getUserAndSchedule');

describe('App', () => {
    const mockProps = {
      hasError: '',
      isLoading: false,
      user: {},
      getUserAndSchedule: jest.fn()
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
