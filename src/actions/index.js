export const setLoading = bool => ({
  type: 'SET_LOADING',
  bool
});

export const setError = error => ({
  type: 'SET_ERROR',
  error
});

export const setUser = user => ({
  type: 'SET_USER',
  user
});

export const setPairingId = id => ({
  type: 'SET_ID',
  id
});

export const setAvailPairings = pairings => ({
  type: 'SET_PAIRINGS',
  pairings
});

export const setSchedule = schedule => ({
  type: 'SET_SCHEDULE',
  schedule
});
