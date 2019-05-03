import { fetchData } from '../utils';
import { setError, setLoading, addToSchedule, clearAvailPairings } from '../actions';
import * as gql from '../queries';

export const confirmPairing = (pairingId, paireeId, notes) => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      const query = gql.updatePairing(pairingId, paireeId, notes);
      const response = await fetchData(query);
      const pairing = await response.updatePairing;
      dispatch(addToSchedule(pairing));
      dispatch(clearAvailPairings());
    } catch(error) {
      dispatch(setError(error.message));
    }
    dispatch(setLoading(false));
  }
};
