import { fetchData } from '../utils';
import { setError, setLoading, setRockAndPebble } from '../actions';
import * as gql from '../queries';

export const activateRockAndPebble = (rockId, pebbleId) => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const query = gql.activateRockPebbleRelationship(rockId, pebbleId);
      const result = await fetchData(query);
      dispatch(setLoading(false));
      dispatch(setRockAndPebble(result.activateRockPebbleRelationship));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.message));
    }
  };
};