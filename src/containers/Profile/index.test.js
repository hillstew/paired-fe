import React from 'react';
import { shallow } from 'enzyme';
import { Profile, mapDispatchToProps } from './index';
import * as thunk from '../../thunks/createUser';

describe('Profile', () => {
  describe('Profile component', () => {
    let wrapper;
    const mockCreateUser = jest.fn();
    const mockProps = {
      createUser: mockCreateUser,
      email: 'Hill@gmail.com',
      phoneNumber: '1234567890',
      firebaseID: 'bAzN8PSfQSPL9rg4pMhTha8zewn2',
      image: 'https://avatars1.githubusercontent.com/u/49459620?v=4',
      name: 'Hillary',
      match: { patch: '/profile' }
    };

    beforeEach(() => {
      wrapper = shallow(<Profile {...mockProps} />);
      window.fetch = jest.fn();
    });

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should have a default state', () => {
      const expected = {
        name: mockProps.name,
        email: mockProps.email,
        phoneNumber: '',
        phoneNumberError: '',
        program: '',
        module: '',
        pronouns: '',
        slack: '',
        submitted: false,
        'skill 1': '',
        'skill 2': '',
        'skill 3': ''
      };
      expect(wrapper.state()).toEqual(expected);
    });

    it('should return true if the user has not entered info for program, module, email, name, pronouns, or slack', () => {
      const expected = true;
      const result = wrapper.instance().checkDropdowns();
      expect(result).toEqual(expected);
    });

    it('should handleSubmit when the form is submitted', async () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'handleSubmit');
      wrapper.instance().forceUpdate();
      wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
      expect(instance.handleSubmit).toHaveBeenCalled();
    });

    it('should call handleChange when a user types in the input', () => {
      const mockSlack = '@tiffany';
      const mockEvent = {
        target: { name: 'slack', value: mockSlack }
      };
      const initialState = '';
      expect(wrapper.state('slack')).toEqual(initialState);
      wrapper.instance().handleChange(mockEvent);
      expect(wrapper.state('slack')).toEqual(mockSlack);
    });
  });

  describe('mapDispatchToProps', () => {
    window.fetch = jest.fn();
    it('should call dispatch with createUser thunk when createUser is called', () => {
      const mockDispatch = jest.fn();
      thunk.createUser = jest.fn();
      const actionToDispatch = thunk.createUser({}, []);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.createUser({}, []);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});
