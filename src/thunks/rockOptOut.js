import { fetchData } from '../utils';
import { setError, setLoading, setUser } from '../actions';
import * as gql from '../queries';

export const rockOptInOut = (id) => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const query = gql.rockOptInOut(id);
      await fetchData(query);
      const result= gql.getUser(id);
      const updatedUser = await fetchData(result);
      dispatch(setLoading(false));
      dispatch(setUser(updatedUser.getUser));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.message));
    }
  };
};