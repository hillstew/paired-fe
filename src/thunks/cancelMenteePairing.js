import { fetchData } from '../utils';
import { setError, setLoading } from '../actions';
import { getSchedule } from './getSchedule';
import * as gql from '../queries';

export const cancelMenteePairing = (pairingId, userId) => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const query = gql.cancelMenteePairing(pairingId);
      await fetchData(query);
      dispatch(setLoading(false));
      dispatch(getSchedule(userId));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.message));
    }
  };
};
