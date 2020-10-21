import { fetchData} from '../utils';
import { setError, setLoading, setRockAndPebble } from '../actions';
import * as gql from '../queries';

export const discontinueRockPebbleRelationship = (rockId, pebbleId, reason, userRelationship) => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const query = gql.discontinueRockPebbleRelationship(rockId, pebbleId, reason, userRelationship);
      const result = await fetchData(query);
      dispatch(setLoading(false));
      dispatch(setRockAndPebble(result.discontinueRockPebbleRelationship));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.message));
    }
  };
};