import { fetchData } from '../utils';
import { setError, setLoading, setUser } from '../actions';
import { getSchedule } from './getSchedule';
import * as gql from '../queries';

export const createUser = (userInfo) => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      const userQuery = gql.createUser(userInfo);
      const { user } = await fetchData(userQuery);
      dispatch(setUser(user));
      dispatch(getSchedule(user.id));
    } catch (error) {
      dispatch(setError(error.message));
    }
    dispatch(setLoading(false));
  };
};