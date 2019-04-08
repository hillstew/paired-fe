import React from 'react';
import { shallow } from 'enzyme';
import ConfirmCard from './index';
import * as data from '../../mockData';

describe('ConfirmCard', () => {
  let wrapper;
  const mockPairing = data.mockPairingForConfirmCard;
  const mockHistoryPush = jest.fn();
  const mockConfirmPairing = jest.fn();
  const mockDeletePairingThunk = jest.fn();
  const mockProps = {
    date: mockPairing.date,
    time: mockPairing.time,
    name: mockPairing.pairer.name,
    selectedPairing: mockPairing.id,
    hasOpeningAlready: false,
    history: { push: mockHistoryPush },
    confirmPairing: mockConfirmPairing,
    deletePairingThunk: mockDeletePairingThunk,
    userId: data.mockUser.id
  };
  const mockPairingInConflictId = '49msfj';
  const mockPropsWithConflict = {
    ...mockProps,
    hasOpeningAlready: true,
    pairingInConflictId: mockPairingInConflictId
  };

  beforeEach(() => {
    wrapper = shallow(<ConfirmCard {...mockProps} />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot if the user has an opening already at the same time', () => {
    const wrapper = shallow(<ConfirmCard {...mockPropsWithConflict} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should have a default state', () => {
    const expected = {
      notes: ''
    };
    expect(wrapper.state()).toEqual(expected);
  });

  describe('handleChange', () => {
    it('should call handleChange when a user types in the input', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'handleChange');
      wrapper.instance().forceUpdate();
      wrapper.find('input').simulate('change', {
        target: { name: 'notes', value: 'Help' }
      });
      expect(instance.handleChange).toHaveBeenCalled();
    });

    it('should update notes in state when user enters notes in input', () => {
      const mockUserNotes = 'Help with grid';
      wrapper.find('input').simulate('change', {
        target: { name: 'notes', value: mockUserNotes }
      });
      expect(wrapper.state('notes')).toEqual(mockUserNotes);
    });
  });

  describe('handleCancel', () => {
    it('should call handleCancel when a user clicks cancel btn', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'handleCancel');
      wrapper.instance().forceUpdate();
      wrapper.find('button.ConfirmCard--button--cancel').simulate('click');
      expect(instance.handleCancel).toHaveBeenCalled();
    });

    it('should redirect user to /book-pairing when cancel is clicked', () => {
      const expectedPath = '/book-pairing';
      wrapper.find('button.ConfirmCard--button--cancel').simulate('click');
      expect(mockHistoryPush).toHaveBeenCalledWith(expectedPath);
    });
  });

  describe('handleConfirm', () => {
    it('should call handleConfirm when a user clicks confirm btn', () => {
      const instance = wrapper.instance();
      jest.spyOn(instance, 'handleConfirm');
      wrapper.instance().forceUpdate();
      wrapper.find('button.ConfirmCard--button--confirm').simulate('click');
      expect(instance.handleConfirm).toHaveBeenCalled();
    });

    it('should call confirmPairing with the correct params', () => {
      const mockNotes = 'JSFun problem set';
      wrapper.setState({ notes: mockNotes });
      wrapper.instance().handleConfirm();
      expect(mockConfirmPairing).toHaveBeenCalledWith(
        mockPairing.id,
        data.mockUser.id,
        mockNotes
      );
    });

    it('should redirect user to / ', () => {
      const expectedPath = '/';
      wrapper.instance().handleConfirm();
      expect(mockHistoryPush).toHaveBeenCalledWith(expectedPath);
    });

    it('should call deletePairingThunk is they already have an open paring', () => {
      const wrapper = shallow(<ConfirmCard {...mockPropsWithConflict} />);
      wrapper.instance().handleConfirm();
      expect(mockDeletePairingThunk).toHaveBeenCalledWith(mockPairingInConflictId)
    });
  });
});
