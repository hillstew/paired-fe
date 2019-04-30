import React from 'react';
import ReactDOM from 'react-dom';
import { App, mapStateToProps, mapDispatchToProps} from './App';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from '../../reducers';
import * as actions from '../../actions';
import { signInUser } from '../../thunks/signInUser';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/app';

jest.mock('../../thunks/signInUser');

beforeAll(() => {
  firebase.initializeApp({
    apiKey: 'AIzaSyBZztEJm_KxmHfMGaxYgLIFah2XAdS5mh0',
    authDomain: 'paired-turing.firebaseapp.com'
  });
});

describe('App', () => {
  let wrapper;
  const mockProps = {
    hasError: '',
    isLoading: false,
    user: { id: 'abc123' },
    signInUser: jest.fn(),
    signUserOut: jest.fn(),
    history: {
      push: jest.fn()
    }
  };

  beforeEach(() => {
    wrapper = shallow(<App {...mockProps} />);
  });

  describe('render', () => {
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

    it('should match the snapshot when there is a user id', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should match the snapshot when there is no user id', () => {
      wrapper = shallow(<App {...mockProps} user={{}}/>);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('componentDidMount', () => {
    it('should call checkUser', () => {
      jest.spyOn(wrapper.instance(), 'checkUser');
      wrapper.instance().forceUpdate();
      wrapper.instance().componentDidMount();
      expect(wrapper.instance().checkUser).toHaveBeenCalled();
    });
  });

  describe('handleSignOut', () => {
    it('should call signUserOut', async () => {
      await wrapper.instance().handleSignOut();
      expect(mockProps.signUserOut).toHaveBeenCalled();
    });
  });
});

describe('mapStateToProps', () => {
  it('should return a props object with the correct properties', () => {
    const initialState = {
      isLoading: false,
      hasError: false,
      user: { id: 'abc123' },
      extraProperty: true
    };
    const expected = {
      isLoading: false,
      hasError: false,
      user: { id: 'abc123' }
    };
    const result = mapStateToProps(initialState);
    expect(result).toEqual(expected);
  });
});

describe('mapDispatchToProps', () => {
  const mockDispatch = jest.fn();
  const mappedProps = mapDispatchToProps(mockDispatch);

  it('should dispatch signInUser', () => {
    const expected = signInUser('abc123')
    mappedProps.signInUser('abc123');
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });
  
  it('should dispatch signUserOut', () => {
    const expected = actions.signUserOut();
    mappedProps.signUserOut();
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });
});
