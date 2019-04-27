import { fetchData } from '../utils';
import { setError, setLoading } from '../actions';
import { getSchedule } from './getSchedule';
import * as gql from '../queries';
import * as helpers from '../helpers';

export const setAvailability = (userId, availabilities) => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      const startDate = 'Mon Apr 29 2019';
      const inning = helpers.getDatesToDisplayFancy(startDate, 29);
      const unformattedPairings = helpers.createPairingsForQuery(
        availabilities,
        inning,
        userId
      );
      const formattedPairings = helpers.formatPairingsForQuery(
        unformattedPairings
      );
      const pairingQuery = gql.createPairings(formattedPairings);
      await fetchData(pairingQuery);
      dispatch(getSchedule(userId));
    } catch (error) {
      dispatch(setError(error.message));
    }
    dispatch(setLoading(false));
  };
};
