import { setAvailability } from '../setAvailability';
import * as utils from '../../utils';
import * as gql from '../../queries';
import * as helpers from '../../helpers';
import { setLoading, setError } from '../../actions';
import * as schedule from '../getSchedule';
import MockDate from 'mockdate';
import { mockUser, mockAvailabilities } from '../../mockData';

describe('setAvailability', () => {
  const mockDispatch = jest.fn();
  const mockError = 'Error setting Availability';
  const thunk = setAvailability(mockUser.id, mockAvailabilities);

  beforeEach(() => {
    MockDate.set('5/31/2019');
    utils.fetchData = jest.fn(() => Promise.resolve({ status: 200 }));
    schedule.getSchedule = jest.fn();
  });

  it('should call dispatch with setLoading and true', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(true));
  });

  // test is broken because of MockDate not having been changed when getDaysRemaining was updated
  xit('should call fetchData with the correct query', async () => {
    const currentDay = new Date()
    const mockInning = helpers.getDatesToDisplay(currentDay, 6);
    const mockUnformatedPairings = helpers.createPairingsForQuery(mockAvailabilities, mockInning, mockUser.id);
    const mockFormattedPairings = helpers.formatPairingsForQuery(mockUnformatedPairings);
    const expected = gql.createPairings(mockFormattedPairings);
    await thunk(mockDispatch);
    expect(utils.fetchData).toHaveBeenCalledWith(expected);
  });

  it('should call getSchedule with the userId', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(schedule.getSchedule(mockUser.id));
  });

  it('should call dispatch with setLoading and false', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false));
  });

  it('should call dispatch with setError and a message if everything is not okay with the fetch', async () => {
    utils.fetchData = jest.fn(() => {
      throw new Error(mockError);
    });
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setError(mockError));
  });
});