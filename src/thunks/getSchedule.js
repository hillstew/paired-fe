import { fetchData } from '../utils';
import { setError, setLoading, setSchedule } from '../actions';
import * as gql from '../queries';

export const getSchedule = (id) => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      const pairingQuery = gql.getUserPairings(id);
      const pairingRes = await fetchData(pairingQuery);
      dispatch(setSchedule(pairingRes.getUserPairings));
    } catch (error) {
      dispatch(setError(error.message));
    }
    dispatch(setLoading(false));
  };
};
