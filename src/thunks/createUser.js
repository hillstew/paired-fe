import { fetchData } from '../utils';
import { setError, setLoading, setUser } from '../actions';
import { getSchedule } from './getSchedule';
import * as gql from '../queries';
import * as helpers from '../helpers';

export const createUser = (userInfo, availabilities) => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      const userQuery = gql.createUser(userInfo);
      const { user } = await fetchData(userQuery);
      const startDate = 'Mon Apr 29 2019';
      const inning = helpers.getDatesToDisplayFancy(startDate, 29);
      const unformattedPairings = helpers.createPairingsForQuery(
        availabilities,
        inning,
        user.id
      );
      const formattedPairings = helpers.formatPairingsForQuery(unformattedPairings)
      const pairingQuery = gql.createPairings(formattedPairings);
      await fetchData(pairingQuery);
      dispatch(setUser(user));
      dispatch(getSchedule(user.id));
    } catch (error) {
      dispatch(setError(error.message));
    }
    dispatch(setLoading(false));
  };
};




