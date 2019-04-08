import * as actions from './index';
import * as data from '../mockData';

describe('actions', () => {
  it('should return an object with type SET_LOADING and a bool', () => {
    const mockBool = true;
    const expected = {
      type: 'SET_LOADING',
      bool: mockBool
    }
    const result = actions.setLoading(mockBool);
    expect(result).toEqual(expected);
  });

  it('should return an object with type SET_ERRO and a message', () => {
    const mockError = 'Error updating pairing';
    const expected = {
      type: 'SET_ERROR',
      error: mockError
    }
    const result = actions.setError(mockError);
    expect(result).toEqual(expected);
  });

  it('should return an object with type SET_USER and a user', () => {
    const mockUser = data.mockUser;
    const expected = {
      type: 'SET_USER',
      user: mockUser
    }
    const result = actions.setUser(mockUser);
    expect(result).toEqual(expected);
  });

  it('should return an object with type SET_ID and an id', () => {
    const mockId = '5983ncfspcndkds7rqf';
    const expected = {
      type: 'SET_ID',
      id: mockId
    }
    const result = actions.setPairingId(mockId);
    expect(result).toEqual(expected);
  });

  it('should return an object with type SET_PAIRINGS and a ', () => {
    const mockPairings = data.mockAvailPairings;
    const expected = {
      type: 'SET_PAIRINGS',
      pairings: mockPairings
    }
    const result = actions.setAvailPairings(mockPairings);
    expect(result).toEqual(expected);
  });

  it('should return an object with type SET_SCHEDULE and a schedule', () => {
    const mockSchedule = data.mockSchedule;
    const expected = {
      type: 'SET_SCHEDULE',
      schedule: mockSchedule
    }
    const result = actions.setSchedule(mockSchedule);
    expect(result).toEqual(expected);
  });

  it('should return an object with type DELETE_PAIRING and an id', () => {
    const mockId = '68309fnslkjerk4u793';
    const expected = {
      type: 'DELETE_PAIRING',
      id: mockId
    }
    const result = actions.deletePairing(mockId);
    expect(result).toEqual(expected);
  });

  it('should return an object with type ADD_TO_SCHEDULE and a pairing', () => {
    const mockPairing = data.mockSchedule[0];
    const expected = {
      type: 'ADD_TO_SCHEDULE',
      pairing: mockPairing
    }
    const result = actions.addToSchedule(mockPairing);
    expect(result).toEqual(expected);
  });
});