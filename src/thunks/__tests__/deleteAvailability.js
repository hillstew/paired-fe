import { deleteAvailability } from '../deleteAvailability';
import * as gql from '../../queries';
import * as utils from '../../utils';
import { setLoading, setError } from '../../actions';
import { mockUser } from '../../mockData';

describe('deleteAvailability', () => {
  const mockDispatch = jest.fn();
  const thunk = deleteAvailability(mockUser.id);
  const mockError = 'Error deleting availability';

  beforeEach(() => {
    utils.fetchData = jest.fn(() => Promise.resolve({ status: 200 }))
  });

  it('should call dispatch with setLoading and true', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(true));
  });

  it('should call fetchData with the correct query', async () => {
    const expected = gql.deletePairings(mockUser.id);
    await thunk(mockDispatch);
    expect(utils.fetchData).toHaveBeenCalledWith(expected);
  });

  it('should call dispatch with setLoading and false', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false));
  });

  it('should call dispatch with an error if everything is not okay with the fetch', async () => {
    utils.fetchData = jest.fn(() => {
      throw new Error(mockError);
    });
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setError(mockError));
  });

  it('should call dispatch with setLoading and false if everything is not okay with fetch', async () => {
    utils.fetchData = jest.fn(() => {
      throw new Error(mockError);
    });
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false));
  });


});