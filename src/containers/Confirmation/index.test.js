import React from 'react';
import { shallow } from 'enzyme';
import { Confirmation, mapStateToProps, mapDispatchToProps } from './index';
import * as data from '../../mockData';
import { confirmPairing } from '../../thunks/confirmPairing';
import { deletePairingThunk } from '../../thunks/deletePairingThunk'

jest.mock('../../thunks/confirmPairing');
jest.mock('../../thunks/deletePairingThunk');

describe('Confirmation', () => {
  describe('Confirmation component', () => {
    let wrapper;
    const mockDeletePairingThiunk = jest.fn();
    const mockConfirmPairing = jest.fn();
    const mockPropsNoConflict = {
      selectedPairing: '5caa7eebfdebb8348e53a4a4',
      availPairings: data.mockAvailPairings,
      schedule: data.mockSchedule,
      user: data.mockUser,
      confirmPairing: mockConfirmPairing,
      deletePairingThunk: mockDeletePairingThiunk
    };
    beforeEach(() => {
      wrapper = shallow(<Confirmation {...mockPropsNoConflict} />);
    });

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('mapStateToProps', () => {
    it('should return a props object with selectedPairing, availPairing, schedule and user', () => {
      const expected = {
        selectedPairing: '5caa7eebfdebb8348e53a4a4',
        availPairings: data.mockAvailPairings,
        schedule: data.mockSchedule,
        user: data.mockUser,
      };
      const initialState = {
        selectedPairing: '5caa7eebfdebb8348e53a4a4',
        availPairings: data.mockAvailPairings,
        schedule: data.mockSchedule,
        user: data.mockUser,
        hasError: '',
        isLoading: false
      };
      const mappedProps = mapStateToProps(initialState);
      expect(mappedProps).toEqual(expected);
    });
  });

  describe('mapDispatchToProps', () => {
    const mockDispatch = jest.fn();
    const mockPairingId = '3904wfjdo';
    const mockPaireeId = '329ruefwjipn';
    const mockNotes = 'Please help with hooks';

    it('should call dispatch with confirmPairing when confirmParing is called', () => {
      const actionToDispatch = confirmPairing(mockPairingId, mockPaireeId, mockNotes);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.confirmPairing(mockPairingId, mockPaireeId, mockNotes);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });

    it('should call dispatch with deletePairingThunk when deletePairingThunk is called', () => {
      const actionToDispatch = deletePairingThunk(mockPairingId);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.deletePairingThunk(mockPairingId);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});
