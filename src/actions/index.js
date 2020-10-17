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

export const setStats = stats => ({
  type: 'SET_STATS',
  stats
});

export const deletePairing = id => ({
  type: 'DELETE_PAIRING',
  id
});

export const addToSchedule = pairing => ({
  type: 'ADD_TO_SCHEDULE',
  pairing
});

export const signUserOut = () => ({
  type: 'SIGN_USER_OUT'
});

export const clearAvailPairings = () => ({
  type: 'CLEAR_AVAIL_PAIRINGS'
});

export const setAvailableRocks = rocks => ({
  type: 'SET_AVAILABLE_ROCKS',
  rocks
})