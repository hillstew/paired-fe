import { fetchData } from '../utils';
import { setError, setLoading, setUser } from '../actions';
import { getSchedule } from './getSchedule';
import * as gql from '../queries';

export const signInUser = (id) => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      const userQuery = gql.getUserByFirebaseID(id);
      const { user } = await fetchData(userQuery);
      if (user !== null) {
        dispatch(setUser(user));
        dispatch(getSchedule(user.id));
      } else {
        dispatch(setUser({ isNewUser: true }));
      }
    } catch (error) {
      dispatch(setError(error.message));
    }
    dispatch(setLoading(false));
  };
};
