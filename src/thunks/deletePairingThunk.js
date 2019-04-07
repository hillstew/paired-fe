import { fetchData } from '../utils';
import { setError, setLoading, deletePairing } from '../actions';
import * as gql from '../queries';

export const deletePairingThunk = (pairingId) => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const query = gql.deletePairing(pairingId);
      await fetchData(query);
      dispatch(setLoading(false));
      dispatch(deletePairing(pairingId));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.message));
    }
  };
};
