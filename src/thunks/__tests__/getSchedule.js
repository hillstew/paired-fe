import { getSchedule } from '../getSchedule';
import * as utils from '../../utils';
import * as gql from '../../queries';
import { setError, setLoading, setSchedule } from '../../actions';
import { mockUser, mockSchedule } from '../../mockData';

describe('getSchedule', () => {
  const mockDispatch = jest.fn();
  const thunk = getSchedule(mockUser.id);
  const mockError = 'Error getting user';
  
  beforeEach(() => {
    utils.fetchData = jest.fn(() => Promise.resolve({
      status: 200,
      getUser: mockUser,
      getUserPairings: mockSchedule
    }));
  });

  it('should call dispatch with setLoading and true', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(true));
  });

  it('should call fetchData with the correct query for pairings', async () => {
    const expected = gql.getUserPairings(mockUser.id);
    await thunk(mockDispatch);
    expect(utils.fetchData).toHaveBeenCalledWith(expected);
  });

  it('should call dispatch with setLoading and false', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false));
  });

  it('should call dispatch with setSchedule and a schedule', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setSchedule(mockSchedule));
  });

  it('should call dispatch with setError with a message if everything is not okay with the fetch', async () => {
    utils.fetchData = jest.fn(() => { throw new Error(mockError)});
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setError(mockError));
  });
});