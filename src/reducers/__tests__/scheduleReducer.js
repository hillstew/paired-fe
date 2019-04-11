import { scheduleReducer } from '../scheduleReducer';
import { setSchedule, deletePairing, addToSchedule } from '../../actions';
import * as data from '../../mockData';

describe('scheduleReducer', () => {
  it('should return the default state', () => {
    const expected = [];
    const result = scheduleReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should set schedule with the users schedule', () => {
    const expected = data.mockSchedule;
    const initialState = [];
    const result = scheduleReducer(initialState, setSchedule(data.mockSchedule));
    expect(result).toEqual(expected);
  });

  it('should remove the correct pairing from the schedule', () => {
    const initialState = data.mockSchedule;
    const mockId = data.mockPairingToDeleteFromSched.id;
    const expected = data.mockScheduleAfterDelete;
    const result = scheduleReducer(initialState, deletePairing(mockId));
    expect(result).toEqual(expected);
  });

  it('should add a pairing to the schedule', () => {
    const initialState = data.mockSchedule;
    const expected = data.mockScheduleAfterAdd;
    const mockPairing = data.mockPairingToAddToSched;
    const result = scheduleReducer(initialState, addToSchedule(mockPairing));
    expect(result).toEqual(expected);
  });

  it('should return an empty array when the action is SIGN_USER_OUT', () => {
    const result = scheduleReducer(undefined, { type: 'SIGN_USER_OUT'});
    expect(result).toEqual([]);
  });
});
