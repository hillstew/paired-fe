export const getAvailablePairings = (program, mod, date) => ({
  query: `{
    getAvailablePairings(filter: { program: "${program}", module: ${mod}, date: "${date}" }) {
      pairer {
        name
        module
        program
        id
        pronouns
        skills
        slack
      }
      date
      time
      id
    }
  }`
});

export const getUser = name => ({
  query: `{
  getUser(name: "${name}") {
    name
    program
    module
    id
  }
}`
});

export const getUserPairings = userId => ({
  query: `{
    getUserPairings(
      id: "${userId}"
    ) {
      pairer {
        name
        module
        program
        id
        pronouns
        slack
      }
      pairee {
        name
        module
        program
        pronouns
        slack
      }
      date
      time
      id
      notes
    }
  }`
});

export const updatePairing = (pairingId, paireeId, notes) => ({
  query: `mutation {
    updatePairing(pairing: {
        id: "${pairingId}"
        pairee: "${paireeId}"
        notes: "${notes}"
    }) {
      pairer {
        name
        module
        program
        id
        pronouns
        slack
      }
      pairee {
        name
        module
        program
        id
        pronouns
        slack
      }
      date
      time
      id
      notes
    }
  }`
});


export const deletePairing = (pairingId) => ({
  query: `mutation {
    deletePairing(id: "${pairingId}") {
      date
    }
  }`
});