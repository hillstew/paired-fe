import { selectedPairingReducer } from '../selectedPairingReducer';
import { setPairingId } from '../../actions';

describe('selectedPairingsReducer', () => {
  it('should return the default state', () => {
    const expected = '';
    const result = selectedPairingReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should set selectedPairing to an id', () => {
    const mockPairingId = '4956nkjsh3c0';
    const initialState = '';
    const result = selectedPairingReducer(initialState, setPairingId(mockPairingId));
    expect(result).toEqual(mockPairingId);
  });
});
