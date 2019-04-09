import React from 'react';
import { shallow } from 'enzyme';
import { Controls, mapStateToProps, mapDispatchToProps } from './index';
import { mockAvailPairings } from '../../mockData';
import { setError } from '../../actions';

describe('Controls', () => {
  describe('Controls component', () => {
    let wrapper;
    const mockSetError = jest.fn();
    const mockSetAvailPairings = jest.fn();
    const mockProps = {
      setError: mockSetError,
      setAvailPairings: mockSetAvailPairings,
      availPairings: mockAvailPairings
    }
    beforeEach(() => {
      wrapper = shallow(<Controls {...mockProps} />);
    });

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('mapStateToProps', () => {
    it('should return an object with availPairings', () => {
      const expected = { availPairings: mockAvailPairings };
      const mockState = {
        availPairings: mockAvailPairings,
        isLoading: false,
        hasError: '',
        user: {}
      };
      const mappedProps = mapStateToProps(mockState);
      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    const mockDispatch = jest.fn()
    it('should call dispatch with setError when setErro is called', () => {
      const mockError = 'Error loading';
      const actionToDispatch = setError(mockError);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setError(mockError);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});