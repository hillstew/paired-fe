import React from 'react';
import { shallow } from 'enzyme';
import { Schedule, mapDispatchToProps } from './index';
import * as data from '../../mockData';
import { deletePairingThunk } from '../../thunks/deletePairingThunk';

jest.mock('../../thunks/deletePairingThunk');

describe('Schedule', () => {
  describe('Schedule component', () => {
    let wrapper;
    const mockDeletePairingThunk = jest.fn();
    const mockProps = {
      user: data.mockUser,
      schedule: [... data.mockSchedule, data.mockParingHillRecievingHelp ],
      deletePairingThunk: mockDeletePairingThunk
    };
    beforeEach(() => {
      wrapper = shallow(<Schedule {...mockProps}/>);
    });

    it('should match the snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with deletePairingThunk when deletePairingThunk is called', () => {
      const mockDispatch = jest.fn();
      const mockId = '49ldasd';
      const actionToDispatch = deletePairingThunk(mockId);
      const mappedProps = mapDispatchToProps(mockDispatch);
      mappedProps.deletePairingThunk(mockId);
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch);
    });
  });
});