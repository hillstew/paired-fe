import { fetchData } from '../utils';
import { setError, setLoading, addToSchedule } from '../actions';
import * as gql from '../queries';

export const confirmPairing = (pairingId, paireeId, notes) => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const query = gql.updatePairing(pairingId, paireeId, notes);
      const response = await fetchData(query);
      const pairing = await response.updatePairing;
      dispatch(setLoading(false));
      dispatch(addToSchedule(pairing));
    } catch(error) {
      dispatch(setLoading(false));
      dispatch(setError(error.message));
    }
  }
};
