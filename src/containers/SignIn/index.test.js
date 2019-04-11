import React from 'react';
import { shallow } from 'enzyme';
import { mockUser } from '../../mockData';
import { SignIn } from './index';

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
          user={mockUser}
        />
      );
    });

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
