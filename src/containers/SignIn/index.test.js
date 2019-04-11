import React from 'react';
import { shallow } from 'enzyme';
import { mockUser } from '../../mockData';
import { SignIn, mapStateToProps, mapDispatchToProps } from './index';
import { setError } from '../../actions';
import { signInUser } from '../../thunks/signInUser';

jest.mock('../../thunks/signInUser');

describe('SignIn', () => {
  describe('SignIn component', () => {
    let wrapper;
    const mockSetError = jest.fn();
    const mockSignInUser = jest.fn();
    beforeEach(() => {
      wrapper = shallow(
        <SignIn
          setError={mockSetError}
          signInUser={mockSignInUser}
          user={{}}
        />
      );
    });

    it('should match the snapshot when there is no user', () => {
      expect(wrapper).toMatchSnapshot();
    });
    
    it('should match the snapshot when there is a new user', () => {
      wrapper = shallow(
        <SignIn
          setError={mockSetError}
          signInUser={mockSignInUser}
          user={{ isNewUser: true, firebaseID: 'abc123' }}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('should match the snapshot when there is an existing user', () => {
      wrapper = shallow(
        <SignIn
          setError={mockSetError}
          signInUser={mockSignInUser}
          user={mockUser}
        />
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('should call handleSignIn when the button is clicked', () => {
      jest.spyOn(wrapper.instance(), 'handleSignIn');
      wrapper.instance().forceUpdate();
      wrapper.find('button').simulate('click');
      expect(wrapper.instance().handleSignIn).toHaveBeenCalled();
    });
  });
});

describe('mapStateToProps', () => {
  it('should return a props object with the correct properties', () => {
    const initialState = { user: { id: 'abc123' }, extraProperty: true };
    const expected = { user: { id: 'abc123' } };
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
    const expected = setError('error signing in');
    mappedProps.setError('error signing in');
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });
});
