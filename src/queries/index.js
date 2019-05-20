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

export const deletePairing = pairingId => ({
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
  program,
  pronouns,
  slack,
  skill1,
  skill2,
  skill3
}) => ({
  query: `mutation {
    user: createUser(
      user: {
        name: "${name}"
        email: "${email}"
        image: "${image}"
        firebaseID: "${firebaseID}"
        module: ${module}
        program: "${program}"
        pronouns: "${pronouns}"
        slack: "${slack}"
        skills: ["${skill1}", "${skill2}", "${skill3}"]
      }
    ) {
      name
      program
      module
      id
      image
      pronouns
      email
      slack
      skills
    }
  }`
});

export const getUserByFirebaseID = id => ({
  query: `{
  user: getUserByFirebaseID(id: "${id}") {
    name
    program
    module
    id
    image
    pronouns
    email
    slack
    skills
  }
}`
});

export const createPairings = pairingsString => ({
  query: `mutation {
    createPairings(
      pairings: ${pairingsString}
    ) {
      pairer
      date
      time
    }
  }`
});

export const deletePairings = userId => ({
  query: `mutation {
    deletePairings(id: "${userId}") {
      pairer
    }
  }`
});

export const getPairing = id => ({
  query: `{
    getPairing(id: "${id}") {
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
      pairee {
        name
      }
      date
      time
      id
    }
  }`
});

export const updateUser = ({
  id,
  name,
  email,
  module,
  program,
  pronouns,
  slack,
  skill1,
  skill2,
  skill3
}) => ({
  query: `mutation {
    user: updateUser(
      user: {
        id: "${id}"
        name: "${name}"
        email: "${email}"
        module: ${module}
        program: "${program}"
        pronouns: "${pronouns}"
        slack: "${slack}"
        skills: ["${skill1}", "${skill2}", "${skill3}"]
      }
    ) {
      name
      program
      module
      id
      image
      pronouns
      email
      slack
      skills
    }
  }`
});