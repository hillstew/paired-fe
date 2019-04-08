export const mockUser = {
  name: "Hillary",
  program: "FE",
  module: 4,
  id: "5caa7eebfdebb8348e53a48e"
}

export const mockSchedule = [
  {
    pairer: {
      name: "Hillary",
      module: 4,
      program: "FE",
      id: "5caa7eebfdebb8348e53a48e",
      pronouns: "she/her",
      slack: "@hillstew"
    },
    pairee: null,
    date: "Mon Apr 15 2019",
    time: "lunch",
    id: "5caa7eebfdebb8348e53a490",
    notes: null
  },
  {
    pairer: {
      name: "Hillary",
      module: 4,
      program: "FE",
      id: "5caa7eebfdebb8348e53a48e",
      pronouns: "she/her",
      slack: "@hillstew"
    },
    paireee: {
      name: "Jeo",
      module: 4,
      program: "FE",
      pronouns: "he/him",
      slack: "@jeo",
    },
    date: "Wed Apr 17 2019",
    time: "afternoon",
    id: "5caa7eebfdebb8348e53a49d",
    notes: null,
  }
];

export const mockAvailPairings = [
  {
    pairer: {
      name: "Tiffany",
      module: 4,
      program: "FE",
      id: "5caa7eebfdebb8348e53a48d",
      pronouns: "she/her",
      skills: [
        "react",
        "testing"
      ],
      slack: "@tiffany",
    },
    date: "Thu Apr 18 2019",
    time: "morning",
    id: "5caa7eebfdebb8348e53a4a4",
  },
  {
    pairer: {
      name: "Tiffany",
      module: 4,
      program: "FE",
      id: "5caa7eebfdebb8348e53a48d",
      pronouns: "she/her",
      skills: [
        "react",
        "testing"
      ],
      slack: "@tiffany",
    },
    date: "Thu Apr 18 2019",
    time: "lunch",
    id: "5caa7eebfdebb8348e53a4a5",
  }
]; 

export const mockPairingToDeleteFromSched = {
  pairer: {
    name: 'Hillary',
    module: 4,
    program: 'FE',
    id: '5caa7eebfdebb8348e53a48e',
    pronouns: 'she/her',
    slack: '@hillstew'
  },
  pairee: null,
  date: 'Mon Apr 15 2019',
  time: 'lunch',
  id: '5caa7eebfdebb8348e53a490',
  notes: null
};

export const mockScheduleAfterDelete = [
  {
    pairer: {
      name: "Hillary",
      module: 4,
      program: "FE",
      id: "5caa7eebfdebb8348e53a48e",
      pronouns: "she/her",
      slack: "@hillstew"
    },
    paireee: {
      name: "Jeo",
      module: 4,
      program: "FE",
      pronouns: "he/him",
      slack: "@jeo",
    },
    date: "Wed Apr 17 2019",
    time: "afternoon",
    id: "5caa7eebfdebb8348e53a49d",
    notes: null,
  }
]; 

export const mockPairingToAddToSched = {
  pairer: {
    name: 'Hillary',
    module: 4,
    program: 'FE',
    id: '5caa7eebfdebb8348e53a48e',
    pronouns: 'she/her',
    slack: '@hillstew'
  },
  pairee: null,
  date: 'Thu Apr 18 2019',
  time: 'morning',
  id: '5caa7eebfdebb8348e56f000',
  notes: null
};

export const mockScheduleAfterAdd = [
  {
    pairer: {
      name: "Hillary",
      module: 4,
      program: "FE",
      id: "5caa7eebfdebb8348e53a48e",
      pronouns: "she/her",
      slack: "@hillstew"
    },
    pairee: null,
    date: "Mon Apr 15 2019",
    time: "lunch",
    id: "5caa7eebfdebb8348e53a490",
    notes: null
  },
  {
    pairer: {
      name: "Hillary",
      module: 4,
      program: "FE",
      id: "5caa7eebfdebb8348e53a48e",
      pronouns: "she/her",
      slack: "@hillstew"
    },
    paireee: {
      name: "Jeo",
      module: 4,
      program: "FE",
      pronouns: "he/him",
      slack: "@jeo",
    },
    date: "Wed Apr 17 2019",
    time: "afternoon",
    id: "5caa7eebfdebb8348e53a49d",
    notes: null,
  },
  mockPairingToAddToSched
];

export const mockQueryFromgetAvailablePairings = {
         query: `{
    getAvailablePairings(filter: { program: "BE", module: 3, date: "Wed Apr 17 2019" }) {
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
       };

export const mockQueryFromgetUser = {
         query: `{
  getUser(name: "Hillary") {
    name
    program
    module
    id
  }
}`
       };

export const mockQueryFromgetUserPairings = {
         query: `{
    getUserPairings(
      id: "5h5h5h5h5h5h5"
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
       };

export const mockQueryFromupdatePairing = {
         query: `mutation {
    updatePairing(pairing: {
        id: "6t6t6t"
        pairee: "7b7b7b"
        notes: "Mythical Creatures"
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
       };

export const mockQueryFromdeletePairing = {
         query: `mutation {
    deletePairing(id: "45dtl") {
      date
    }
  }`
       };