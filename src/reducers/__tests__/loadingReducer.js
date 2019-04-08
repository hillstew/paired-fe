import { loadingReducer } from '../loadingReducer';
import { setLoading } from '../../actions';

describe('loadingReducer', () => {
  it('should return the default state', () => {
    const expected = false;
    const result = loadingReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should set isLoading to a bool', () => {
    const mockBool = true;
    const initialState = false;
    const result = loadingReducer(initialState, setLoading(mockBool));
    expect(result).toEqual(mockBool);
  });
});
