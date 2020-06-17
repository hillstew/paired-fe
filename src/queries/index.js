export const getUserRockAndPebble = (id) => ({
  query: `{
    getUserRockAndPebble(id: "${id}") {
      rockOptIn
      rocks {
        name
        module
        program
        id
        pronouns
        skills
        slack
        image
      }
      pebbles {
        name
        module
        program
        id
        pronouns
        skills
        slack
        image
      }
    }
  }`
});

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

export const cancelMenteePairing = (id) => ({
  query:
    `  mutation {
         cancelMenteePairing(input: {
                id: "${id}"
                }) {
          pairer {
            name
            email
            phoneNumber
            id
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

    export const cancelMentorPairing = (id) => ({
      query:
        ` mutation {
            cancelMentorPairing(input: {
              id: "${id}"
              }) {
                pairer {
                  name
                }
                pairee {
                  name
                  email
                  phoneNumber
                }
                  date
                  time
                  id
                }
            }`
        });

export const getUserStats = id => ({
  query: `{
    getUserStats(id: ${id}) {
      name
      totalBookings
      totalMentorHours
      totalHoursMentored
      mentees {
        name
      }
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
    updatePairing(
      input: {
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
    deletePairing( input: { id: "${pairingId}" })
      {
        date
      }
  }`
});

export const createUser = ({
  name,
  email,
  image,
  phoneNumber,
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
      input: {
        name: "${name}"
        email: "${email}"
        phoneNumber: "${phoneNumber}"
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
      phoneNumber
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
    phoneNumber
    email
    slack
    skills
  }
}`
});

export const createPairings = pairingsString => ({
  query: `mutation {
    createPairings(input: {
      pairings: ${pairingsString}
    } ) {
      unbookedPairings {
      pairer { id }
      date
      time
    }
   }
  }`
});

export const deletePairings = userId => ({
  query: `mutation {
    deletePairings(input: { id: "${userId}"} ) {
      pairer { id }
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
  phoneNumber,
  module,
  program,
  pronouns,
  slack,
  skill1,
  skill2,
  skill3,
}) => ({
  query: `mutation {
    user: updateUser(
      input: {
        id: "${id}"
        name: "${name}"
        email: "${email}"
        phoneNumber: "${phoneNumber}"
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
      phoneNumber
      slack
      skills
    }
  }`
});

export const updateUserImage = ({
  id,
  image
}) => ({
  query: `mutation {
    user: updateUser(
      input: {
        id: "${id}"
        image: "${image}"
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
