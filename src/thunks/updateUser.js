import { fetchData } from '../utils';
import { setLoading, setError, setUser } from '../actions';
import * as gql from '../queries';

export const updateUser = (userInfo) => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      const mutation = gql.updateUser(userInfo);
      const { user } = await fetchData(mutation);
      dispatch(setUser(user));
    } catch (error) {
      dispatch(setError(error.message));
    }
    dispatch(setLoading(false));
  }
}