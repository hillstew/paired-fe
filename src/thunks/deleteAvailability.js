import { fetchData } from "../utils";
import { setError, setLoading } from '../actions';
import * as gql from '../queries';

export const deleteAvailability = (userId) => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      const mutation = gql.deletePairings(userId);
      await fetchData(mutation);
    } catch (error) {
      dispatch(setError(error.message));
    }
    dispatch(setLoading(false));
  }
};