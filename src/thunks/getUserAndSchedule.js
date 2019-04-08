import { fetchData } from '../utils';
import { setError, setLoading, setSchedule, setUser } from '../actions';
import * as gql from '../queries';

export const getUserAndSchedule = (userID) => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      const userQuery = gql.getUser(userID);
      const userRes = await fetchData(userQuery);
      const pairingQuery = gql.getUserPairings(userRes.getUser.id);
      const pairingRes = await fetchData(pairingQuery);
      dispatch(setUser(userRes.getUser));
      dispatch(setSchedule(pairingRes.getUserPairings));
    } catch (error) {
      dispatch(setError(error.message));
    }
    dispatch(setLoading(false));
  };
};
