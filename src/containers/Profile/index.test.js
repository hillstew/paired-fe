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
      firebaseID: 'bAzN8PSfQSPL9rg4pMhTha8zewn2',
      image: 'https://avatars1.githubusercontent.com/u/49459620?v=4',
      name: 'Hillary'
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
        program: '',
        module: '',
        pronouns: '',
        slack: '',
        skill1: '',
        skill2: '',
        availabilities: [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ]
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

    it('should toggle true/false the correct index in availabilities when handleClick is called', () => {
      const mockEvent = { preventDefault: jest.fn() };
      const mockIndex = 2;
      const mockInitialAvailability = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ];
      const expected = [
        false,
        false,
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ];
      expect(wrapper.state('availabilities')).toEqual(mockInitialAvailability);
      wrapper.instance().handleClick(mockEvent, mockIndex);
      expect(wrapper.state('availabilities')).toEqual(expected);
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
  })
});
