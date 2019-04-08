import { availPairingsReducer } from '../availPairingsReducer';
import * as data from '../../mockData';
import { setAvailPairings } from '../../actions';

describe('availPairingsReducer', () => {
  it('should return the default state', () => {
    const expected = [];
    const result = availPairingsReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should set availPairings to an array of pairings', () => {
    const initialState = [];
    const expected = data.mockAvailPairings;
    const result = availPairingsReducer(initialState, setAvailPairings(data.mockAvailPairings));
    expect(result).toEqual(expected);
  });
});