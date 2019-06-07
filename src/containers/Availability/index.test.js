import React from 'react';
import { shallow } from 'enzyme';
import { Availability, mapDispatchToProps } from './index';
import { mockAvailabilities, mockUser } from '../../mockData';
import { createUser }from '../../thunks/createUser';
import { deleteAvailability } from '../../thunks/deleteAvailability';
import { setAvailability } from '../../thunks/setAvailability';

jest.mock('../../thunks/createUser');
jest.mock('../../thunks/deleteAvailability');
jest.mock('../../thunks/setAvailability');

describe('Availability', () => {
  describe('Availability component', () => {
    let wrapper;
    const mockProps = {
      handleClick: jest.fn(),
      availabilities: [
        true,
        false,
        true,
        false,
        true,
        true,
        false,
        true,
        false,
        true,
        true,
        false,
        true,
        false,
        true
      ],
      match: {
        path: '/set-availability'
      }
    };

    beforeEach(() => {
      wrapper = shallow(<Availability {...mockProps} />);
    });

    it('should match the snapshot when the path is /set-availability', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should match the snapshot when the path is /edit-availability', () => {
      wrapper = shallow(
        <Availability {...mockProps} match={{ path: '/edit-availability' }} />
      );
      expect(wrapper).toMatchSnapshot();
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
      expect(wrapper.state('availabilities')).toEqual(
        mockInitialAvailability
      );
      wrapper.instance().handleClick(mockEvent, mockIndex);
      expect(wrapper.state('availabilities')).toEqual(expected);
    });

    it('should call editAvailability if the edit--button is clicked', () => {
      wrapper = shallow(
        <Availability
          {...mockProps}
          match={{ path: '/edit-availability' }}
        />
      );
      const mockEvent = {
        target: {
          id: 'edit--button'
        }
      };
      const instance = wrapper.instance();
      jest.spyOn(instance, 'editAvailability');
      wrapper.instance().forceUpdate();
      wrapper.find('#edit--button').simulate('click', mockEvent);
      expect(instance.editAvailability).toHaveBeenCalled();
    });
  });

  describe('mapDispatchToProps', () => {
    const mockDispatch = jest.fn();
    
    it('should call dispatch with createUser when createUser is called', () => {
      const actionToDispatch = createUser(mockUser, mockAvailabilities);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.createUser(mockUser, mockAvailabilities);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    });

    it('should call dispatch with deleteAvailability when deleteAvailability is called', () => {
      const actionToDispatch = deleteAvailability(mockUser.id);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.deleteAvailability(mockUser.id);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch with setAvailability when setAvailability is called', () => {
      const actionToDispatch = setAvailability(mockUser, mockAvailabilities);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setAvailability(mockUser, mockAvailabilities);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});