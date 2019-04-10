import React from 'react';
import { shallow } from 'enzyme';
import { Controls, mapStateToProps, mapDispatchToProps } from './index';
import { mockAvailPairings } from '../../mockData';
import { setError } from '../../actions';
import * as helpers from '../../helpers';

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
      helpers.getDatesToDisplay = jest.fn(() => [
        'Mon Apr 15 2019',
        'Tue Apr 16 2019',
        'Wed Apr 17 2019',
        'Thu Apr 18 2019',
        'Fri Apr 19 2019'
      ]);
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