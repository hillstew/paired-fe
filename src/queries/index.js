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
      }
      pairee {
        name
        module
        program
      }
      date
      time
      id
      notes
    }
  }`
});
