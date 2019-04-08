import { deletePairingThunk } from '../deletePairingThunk';
import { setError, setLoading, deletePairing } from '../../actions';
import * as gql from '../../queries';
import * as utils from '../../utils';

describe('', () => {
  const mockDispatch = jest.fn();
  const mockPairingId = '87dlte';
  const thunk = deletePairingThunk(mockPairingId);
  const mockError = 'Error deleteing the pairing';
  
  beforeEach(() => {
    utils.fetchData = jest.fn(() => Promise.resolve({ status: 200 }));
  });
  it('should call dispatch with setLoading and true', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(true));
  });

  it('should call fetchData with the correct query', async () => {
    const expected = gql.deletePairing(mockPairingId);
    await thunk(mockDispatch);
    expect(utils.fetchData).toHaveBeenCalledWith(expected);
  });

  it('should call dispatch with setLoading and false', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false));
  });

  it('should call dispatch with deletPairing and an id', async () => {
    const expected = mockPairingId;
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(deletePairing(expected));
  });

  it('should call dispatch with setLoading and false if everything is not okay with the fetch', async () => {
    utils.fetchData = jest.fn(() => {
      throw new Error(mockError);
    });
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false));
  });

  it('should call dispatch with setError and a message if everything is not okay with fetch', async () => {
    utils.fetchData = jest.fn(() => {
      throw new Error(mockError);
    });
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setError(mockError));
  });
});
