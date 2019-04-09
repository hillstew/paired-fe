import { createUser } from '../createUser';
import * as utils from '../../utils';
import * as gql from '../../queries';
import { setError, setLoading, setUser } from '../../actions';
import { getSchedule } from '../getSchedule';
import { mockUser } from '../../mockData';

jest.mock('../getSchedule');

describe('createUser', () => {
  const thunk = createUser(mockUser);
  const mockDispatch = jest.fn();
  utils.fetchData = jest.fn(() => ({ user: mockUser}));

  it('should dispatch setLoading true', async () => {
    const expected = setLoading(true);
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(expected);
  });

  it('should call fetchData with the correct params', async () => {
    const expected = gql.createUser(mockUser);
    await thunk(mockDispatch);
    expect(utils.fetchData).toHaveBeenCalledWith(expected);
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