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
        image
      }
      date
      time
      id
    }
  }`
});

export const getUser = id => ({
  query: `{
  getUser(id: "${id}") {
    name
    program
    module
    id
    image
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
        image
      }
      pairee {
        name
        module
        program
        pronouns
        slack
        image
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
        image
      }
      pairee {
        name
        module
        program
        id
        pronouns
        slack
        image
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

export const createUser = ({
  name,
  email,
  image,
  firebaseID,
  module,
  program
}) => ({
  query: `mutation {
    data: createUser(
      user: {
        name: "${name}"
        email: "${email}"
        image: "${image}"
        firebaseID: "${firebaseID}"
        module: ${module}
        program: "${program}"
      }
    ) {
      id
    }
  }`
});

export const getUserByFirebaseID = id => ({
  query: `{
  data: getUserByFirebaseID(id: "${id}") {
    name
    program
    module
    id
  }
}`
});