import { fetchData } from '../utils';
import { setError, setLoading, cancelPairing } from '../actions';
import * as gql from '../queries';

export const cancelMentorPairing = (pairingId) => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const query = gql.cancelMentorPairing(pairingId);
      await fetchData(query);
      dispatch(setLoading(false));
      dispatch(cancelPairing(pairingId));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.message));
    }
  };
};
