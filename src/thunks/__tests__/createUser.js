import { createUser } from '../createUser';
import * as utils from '../../utils';
import * as gql from '../../queries';
import { setError, setLoading, setUser } from '../../actions';
import { getSchedule } from '../getSchedule';
import { mockUser, mockPairingsQuery } from '../../mockData';

jest.mock('../getSchedule');

describe('createUser', () => {
  const mockAvailabilities = [true, false, true, false];
  const thunk = createUser(mockUser, mockAvailabilities);
  const mockDispatch = jest.fn();
  utils.fetchData = jest.fn(() => ({ user: mockUser}));

  it('should dispatch setLoading true', async () => {
    const expected = setLoading(true);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });

  it('should call fetchData with a user query', async () => {
    const expected = gql.createUser(mockUser);
    await thunk(mockDispatch);
    expect(utils.fetchData).toHaveBeenCalledWith(expected);
  });

  it('should call fetchData with a pairings query', async () => {
    await thunk(mockDispatch);
    expect(utils.fetchData).toHaveBeenCalledWith(mockPairingsQuery);
  });

  it('should dispatch setUser with a user', async () => {
    const expected = setUser(mockUser)
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch getSchedule with an id', async () => {
    const expected = getSchedule(mockUser.id);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch setError if there is an error', async () => {
    utils.fetchData = jest.fn(() => {
      throw Error('error creating user');
    });
    const expected = setError('error creating user');
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });
});