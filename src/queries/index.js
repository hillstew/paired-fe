export const getAvailablePairings = (program, mod, date) => ({
  query: `{
    getAvailablePairings(filter: { program: "${program}", module: ${mod}, date: "${date}" }) {
      pairer {
        name
        module
        program
      }
      date
      time
    }
  }`
});

export const getUser = (name) => ({
  query: `{
  getUser(name: "${name}") {
    name
    program
    module
    id
  }
}`
});
