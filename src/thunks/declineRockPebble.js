import { fetchData} from '../utils';
import { setError, setLoading, setRockAndPebble } from '../actions';
import * as gql from '../queries';

export const declineRockPebbleRelationship = (rockId, pebbleId, reason) => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const query = gql.declineRockPebbleRelationship(rockId, pebbleId, reason);
      const result = await fetchData(query);
      dispatch(setLoading(false));
      dispatch(setRockAndPebble(result.declineRockPebbleRelationship));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.message));
    }
  };
};