import { fetchData } from '../utils';
import { setError, setLoading, setSchedule, setUser } from '../actions';
import * as gql from '../queries';

export const getUserAndSchedule = () => {
  return async dispatch => {
    try {
      dispatch(setLoading(true));
      const userQuery = gql.getUser('Hillary');
      const userRes = await fetchData(userQuery);
      const pairingQuery = gql.getUserPairings(userRes.getUser.id);
      const pairingRes = await fetchData(pairingQuery);
      dispatch(setLoading(false));
      dispatch(setUser(userRes.getUser));
      dispatch(setSchedule(pairingRes.getUserPairings));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch(setError(error.message));
    }
  };
};
