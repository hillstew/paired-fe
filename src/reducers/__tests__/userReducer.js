import { userReducer } from '../userReducer';
import { setUser } from '../../actions';
import * as data from '../../mockData';

describe('userReducer', () => {
  it('should return the default state', () => {
    const expected = {};
    const result = userReducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it('should set user to a user object', () => {
    const expected = data.mockUser;
    const initialState = {};
    const result = userReducer(initialState, setUser(data.mockUser));
    expect(result).toEqual(expected);
  });
});
