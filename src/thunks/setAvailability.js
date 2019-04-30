import { fetchData } from '../utils';
import { setError, setLoading } from '../actions';
import { getSchedule } from './getSchedule';
import * as gql from '../queries';
import * as helpers from '../helpers';

export const setAvailability = (userId, availabilities) => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      const currentDay = new Date();
      const daysRemaining = helpers.getDaysRemaining();
      const inning = helpers.getDatesToDisplay(currentDay, daysRemaining);
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
