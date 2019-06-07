import { updateUser } from '../updateUser';
import * as gql from '../../queries';
import * as utils from '../../utils';
import { setLoading, setUser, setError } from '../../actions';
import {
  mockUserToUpdate,
  mockUpdatedUser,
  mockUserImgToUpdate,
  mockUserWithNewImg
} from '../../mockData';

describe('updateUser', () => {
  const mockDispatch = jest.fn();
  const mockError = 'Error updating user';

  describe('updateUser with default - updateImage is false', () => {
    const thunk = updateUser(mockUserToUpdate);

    beforeEach(() => {
      utils.fetchData = jest.fn(() =>
        Promise.resolve({ user: mockUpdatedUser })
      );
    });

    it('should call dispatch with setLoading and true', async () => {
      await thunk(mockDispatch);
      expect(mockDispatch).toHaveBeenCalledWith(setLoading(true));
    });

    it('should call fetchData with the correct query', async () => {
      const expected = gql.updateUser(mockUserToUpdate);
      await thunk(mockDispatch);
      expect(utils.fetchData).toHaveBeenCalledWith(expected);
    });

    it('should call dispatch with setUser and the user', async () => {
      await thunk(mockDispatch);
      expect(mockDispatch).toHaveBeenCalledWith(setUser(mockUpdatedUser));
    });

    it('should call dispatch with setLoading and false', async () => {
      await thunk(mockDispatch);
      expect(mockDispatch).toHaveBeenCalledWith(setLoading(false));
    });
  });

  describe('updateUser with updateImage is true', () => {
    const thunk = updateUser(mockUserImgToUpdate, true);

    beforeEach(() => {
      utils.fetchData = jest.fn(() =>
        Promise.resolve({ user: mockUserWithNewImg })
      );
    });

    it('should call dispatch with setLoading and true', async () => {
      await thunk(mockDispatch);
      expect(mockDispatch).toHaveBeenCalledWith(setLoading(true));
    });

    it('should call fetchData with the correct query', async () => {
      const expected = gql.updateUserImage(mockUserImgToUpdate);
      await thunk(mockDispatch);
      expect(utils.fetchData).toHaveBeenCalledWith(expected);
    });

    it('should call dispatch with setUser and the user', async () => {
      await thunk(mockDispatch);
      expect(mockDispatch).toHaveBeenCalledWith(setUser(mockUserWithNewImg));
    });

    it('should call dispatch with setLoading and false', async () => {
      await thunk(mockDispatch);
      expect(mockDispatch).toHaveBeenCalledWith(setLoading(false));
    });
  });

  it('should call setError with a message if everything is not okay with the fetch', async () => {
    const thunk = updateUser(mockUserToUpdate)
    utils.fetchData = jest.fn(() => {
      throw new Error(mockError)
    });
    await thunk(mockDispatch);
    expect(mockDispatch).toHaveBeenCalledWith(setError(mockError));
  });
});
