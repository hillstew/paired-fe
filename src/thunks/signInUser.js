import { fetchData } from '../utils';
import { setError, setLoading } from '../actions';
import { getUserAndSchedule } from './getUserAndSchedule';
import * as gql from '../queries';

export const signInUser = (user, id, newUser = false) => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      let userQuery;
      if (newUser) {
        userQuery = gql.createUser(user);
      } else {
        userQuery = gql.getUserByFirebaseID(id);
      }
      const userRes = await fetchData(userQuery);
      dispatch(getUserAndSchedule(userRes.data.id));
    } catch (error) {
      dispatch(setError(error.message));
    }
    dispatch(setLoading(false));
  };
};
