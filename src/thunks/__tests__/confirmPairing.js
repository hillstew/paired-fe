import { confirmPairing } from '../confirmPairing';
import { setError, setLoading, addToSchedule } from '../../actions';
import * as gql from '../../queries';
import * as utils from '../../utils';

describe('confirmPairing', () => {
  const mockDispatch = jest.fn();
  const mockPairingId = "6t6t6t";
  const mockPaireeId =  "7b7b7b"
  const mockNotes = "Mythical Creatures"
  const thunk = confirmPairing(mockPairingId, mockPaireeId, mockNotes);
  const mockError = 'Error updating the pairing';
  const mockPairing = {
    pairee: {
      id: mockPaireeId,
      name: 'Leta',
    },
    pairer: {
      id: '4djf',
      name: 'Will',
    },
    notes: mockNotes,
    id: mockPairingId
  };

  beforeEach(() => {
    utils.fetchData = jest.fn(() => Promise.resolve({
      updatePairing: mockPairing
    }));
  })
  it('should call dispatch with setLoading and true', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(true));
  });

  it('should call fetchData with the correct query', async () => {
    const expected = gql.updatePairing(
      mockPairingId,
      mockPaireeId,
      mockNotes
    );
    await thunk(mockDispatch);
    expect(utils.fetchData).toHaveBeenCalledWith(expected);
  });

  it('should call dispatch with setLoading and false', async () => {
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false));
  });

  it('should call dispatch with addToSchedule with the returned pairing', async () => {
    const expected = mockPairing;
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(addToSchedule(expected));
  });


  it('should call dispatch with setLoading and false if everything is not okay with the fetch', async () => {
    utils.fetchData = jest.fn(() => { throw new Error(mockError) });
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoading(false));
  });

  it('should call dispatch with setError and a message if everything is not okay with fetch', async () => {
    utils.fetchData = jest.fn(() => { throw new Error(mockError) });
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setError(mockError));
  });
});