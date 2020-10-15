import { fetchData } from '../utils';
import { setError, setLoading, setUser } from '../actions';
import { getSchedule } from './getSchedule';
import { updateUser } from './updateUser';
import * as gql from '../queries';
import { getRockAndPebbles } from './getRockAndPebbles';

export const signInUser = (id, photoURL) => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      const userQuery = gql.getUserByFirebaseID(id);
      const { user } = await fetchData(userQuery);
      if (user !== null) {
        if (user.image !== photoURL) {
          dispatch(updateUser({ id: user.id, image: photoURL }, true));
        } else {
          dispatch(setUser(user));
        }
        dispatch(getSchedule(user.id));
        dispatch(getRockAndPebbles(user.id));
      } else {
        dispatch(setUser({ isNewUser: true }));
      }
    } catch (error) {
      dispatch(setError(error.message));
    }
    dispatch(setLoading(false));
  };
};
