import React from 'react';
import { shallow } from 'enzyme';
import { Controls, mapDispatchToProps, mapStateToProps } from '../Controls/index'
import { mockAvailPairings } from '../../mockData';
import { setError, setAvailPairings } from '../../actions';
import * as helpers from '../../helpers';
import MockDate from 'mockdate';

describe('Controls', () => {
  describe('Controls component', () => {
    let wrapper;
    const mockSetError = jest.fn();
    const mockSetAvailPairings = jest.fn();
    const mockProps = {
      setError: mockSetError,
      setAvailPairings: mockSetAvailPairings,
      availPairings: mockAvailPairings
    };
    const mockProgram = 'FE';
    const mockDate = 'Thu Apr 25 2019';
    const mockModule = 4;

    beforeEach(() => {
      MockDate.set('5/8/2019');
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

    it('should call handleClick when the Show available pairings button is clicked', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'handleClick');
      wrapper.setState({
        date: mockDate,
        module: mockModule,
        program: mockProgram
      });
      wrapper.find('.Controls--avail-btn').simulate('click');
      expect(instance.handleClick).toHaveBeenCalled();
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
    const mockDispatch = jest.fn();
    it('should call dispatch with setError when setError is called', () => {
      const mockError = 'Error loading';
      const actionToDispatch = setError(mockError);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setError(mockError);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
    it('should call dispatch with setAvailPairings when setAvailPairings is called', () => {
      const actionToDispatch = setAvailPairings(mockAvailPairings);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.setAvailPairings(mockAvailPairings);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});
