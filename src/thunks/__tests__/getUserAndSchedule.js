import { getUserAndSchedule } from '../getUserAndSchedule';
import * as utils from '../../utils';
import * as gql from '../../queries';
import { setError, setLoading, setUser, setSchedule } from '../../actions';
import { mockUser, mockSchedule } from '../../mockData';

describe('getUserAndSchedule', () => {
  const mockDispatch = jest.fn();
  const thunk = getUserAndSchedule();
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

  it('should call fetchData with the correct user query', async () => {
    const expected = gql.getUser(mockUser.name);
    await thunk(mockDispatch);
    expect(utils.fetchData).toHaveBeenCalledWith(expected);
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

  it('should call dispatch with setUser and the user response', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setUser(mockUser));
  });

  it('should call dispatch with setSchedule and a schedule', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setSchedule(mockSchedule));
  });

  it('should call dispatch with setLoading and false if everything is not okay with the fetch', async () => {
    utils.fetchData = jest.fn(() => { throw new Error(mockError) });
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false));
  });

  it('should call dispatch with setError with a message if everything is not okay with the fetch', async () => {
    utils.fetchData = jest.fn(() => { throw new Error(mockError)});
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setError(mockError));
  });
});