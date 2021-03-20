import { fetchData } from '../utils';
import { setError, setLoading, setRockAndPebble } from '../actions';
import * as gql from '../queries';

export const getRockAndPebbles = (id) => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      const rocksandpebbleQuery = gql.getUserRockAndPebble(id);
      const rockandpebbleResult = await fetchData(rocksandpebbleQuery);
      dispatch(setRockAndPebble(rockandpebbleResult.getUserRockAndPebble));
    } catch (error) {
      dispatch(setError(error.message));
    }
    dispatch(setLoading(false));
  };
};