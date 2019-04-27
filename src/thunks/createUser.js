import { fetchData } from '../utils';
import { setError, setLoading, setUser } from '../actions';
import * as gql from '../queries';
import { setAvailability } from './setAvailability';

export const createUser = (userInfo, availabilities) => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      const userQuery = gql.createUser(userInfo);
      const { user } = await fetchData(userQuery);
      if (availabilities) {
        dispatch(setAvailability(user.id, availabilities));
      }
      dispatch(setUser(user));
    } catch (error) {
      dispatch(setError(error.message));
    }
    dispatch(setLoading(false));
  };
};
