import { createUser } from '../createUser';
import * as utils from '../../utils';
import * as gql from '../../queries';
import { setError, setLoading, setUser } from '../../actions';
import { setAvailability } from '../setAvailability';
import { mockUser } from '../../mockData';

jest.mock('../setAvailability');

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

  it('should call fetchData with a createUser mutation', async () => {
    const mutation = gql.createUser(mockUser);
    await thunk(mockDispatch);
    expect(mutation.query).not.toEqual('');
    expect(utils.fetchData).toHaveBeenCalled();
  });
  
  it('should dispatch setAvailability if there are availabilities', async () => {
    await thunk(mockDispatch);
    expect(setAvailability).toHaveBeenCalledWith(mockUser.id, mockAvailabilities);
  });

  it('should not dispatch setAvailability if there are no availabilities', async () => {
    setAvailability.mockClear();
    const thunk = createUser(mockUser, false);
    await thunk(mockDispatch);
    expect(setAvailability).not.toHaveBeenCalled();
  });
  
  it('should dispatch setUser with a user', async () => {
    const expected = setUser(mockUser)
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