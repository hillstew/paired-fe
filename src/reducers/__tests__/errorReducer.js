import { errorReducer } from '../errorReducer';
import { setError } from '../../actions';

describe('errorReducer', () => {
  it('should return the default state', () => {
    const expected = '';
    const result = errorReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should set an hasError to an error message', () => {
    const mockError = 'Error updating pairing';
    const initialState = '';
    const result = errorReducer(initialState, setError(mockError));
    expect(result).toEqual(mockError);
  });
});
