export const mockUser = {
  name: "Hillary",
  program: "FE",
  module: 4,
  id: "5caa7eebfdebb8348e53a48e",
  image: "https://avatars1.githubusercontent.com/u/40586291?v=",
  email: "hill@gmail.com",
  firebaseID: "abc123"
}

export const mockSchedule = [
  {
    pairer: {
      name: 'Hillary',
      module: 4,
      program: 'FE',
      id: '5caa7eebfdebb8348e53a48e',
      pronouns: 'she/her',
      slack: '@hillstew',
      image: "https://avatars1.githubusercontent.com/u/40586291?v="
    },
    pairee: null,
    date: 'Mon Apr 15 2019',
    time: 'lunch',
    id: '5caa7eebfdebb8348e53a490',
    notes: null
  },
  {
    pairer: {
      name: 'Hillary',
      module: 4,
      program: 'FE',
      id: '5caa7eebfdebb8348e53a48e',
      pronouns: 'she/her',
      slack: '@hillstew',
      image: "https://avatars1.githubusercontent.com/u/40586291?v="
    },
    pairee: {
      name: 'Jeo',
      module: 4,
      program: 'FE',
      pronouns: 'he/him',
      slack: '@jeo',
      id: '5caa7eebfdebb8348e53a48f',
      image: "https://avatars1.githubusercontent.com/u/40586291?v="
    },
    date: 'Wed Apr 17 2019',
    time: 'afternoon',
    id: '5caa7eebfdebb8348e53a49d',
    notes: null
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
      image: "https://avatars1.githubusercontent.com/u/40586291?v="
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
      image: "https://avatars1.githubusercontent.com/u/40586291?v="
    },
    date: "Thu Apr 18 2019",
    time: "lunch",
    id: "5caa7eebfdebb8348e53a4a5",
  },
  {
    pairer: {
      name: "Jeo",
      program: "FE",
      pronouns: "he/him",
      id: "5caa7eebfdebb8348e53a48f",
      skills: [
        "graphql",
        "testing"
      ],
      slack: "@jeo",
      image: "https://avatars1.githubusercontent.com/u/40586291?v="
    },
    date: "Thu Apr 18 2019",
    time: "lunch",
    id: "5caa7eebfdebb8348e58076",
  }
]; 

export const mockPairingToDeleteFromSched = {
  pairer: {
    name: 'Hillary',
    module: 4,
    program: 'FE',
    id: '5caa7eebfdebb8348e53a48e',
    pronouns: 'she/her',
    slack: '@hillstew',
    image: "https://avatars1.githubusercontent.com/u/40586291?v="
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
      slack: "@hillstew",
      image: "https://avatars1.githubusercontent.com/u/40586291?v="
    },
    pairee: {
      name: "Jeo",
      module: 4,
      program: "FE",
      pronouns: "he/him",
      slack: "@jeo",
      id: "5caa7eebfdebb8348e53a48f",
      image: "https://avatars1.githubusercontent.com/u/40586291?v="
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
    slack: '@hillstew',
    image: "https://avatars1.githubusercontent.com/u/40586291?v="
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
      slack: "@hillstew",
      image: "https://avatars1.githubusercontent.com/u/40586291?v="
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
      slack: "@hillstew",
      image: "https://avatars1.githubusercontent.com/u/40586291?v="
    },
    pairee: {
      name: "Jeo",
      module: 4,
      program: "FE",
      pronouns: "he/him",
      id: "5caa7eebfdebb8348e53a48f",
      slack: "@jeo",
      image: "https://avatars1.githubusercontent.com/u/40586291?v="
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
        image
      }
      date
      time
      id
    }
  }`
       };

export const mockQueryFromgetUser = {
         query: `{
  getUser(id: "Hillary") {
    name
    program
    module
    id
    image
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
       };

export const mockQueryFromdeletePairing = {
         query: `mutation {
    deletePairing(id: "45dtl") {
      date
    }
  }`
       };

export const mockPairingForConfirmCard = {
  pairer: {
    name: 'Tiffany',
    mod: 4,
    program: 'FE',
    prnouns: 'she/her',
    slack: '@tiffany',
    image: "https://avatars1.githubusercontent.com/u/40586291?v="
  },
  pairee: null,
  date: 'Fri Apr 07 2019',
  time: 'lunch',
  id: '49fgskljvs',
  notes: null
}

export const mockStudentForStudentCard = {
  afternoon: "",
  id: "5cabced6d2c9ebba50f1dfa2",
  image: "http://www.image.com/hill.jpeg",
  lunch: "5cabced6d2c9ebba50f1dfb0",
  module: 4,
  morning: "",
  name: "Hillary",
  program: "FE",
  pronouns: "she/her",
  skills: ["react", "redux"],
  slack: "@hillstew",
}

export const mockStudForStudentCardNoAvail = {
  afternoon: "",
  id: "5cabced6d2c9ebba50f1dfa2",
  image: "http://www.image.com/hill.jpeg",
  lunch: "",
  module: 4,
  morning: "",
  name: "Hillary",
  program: "FE",
  pronouns: "she/her",
  skills: ["react", "redux"],
  slack: "@hillstew",
}

export const mockStudForStudentCardAllAvail = {
  afternoon: "rsieowugds890uwefhio",
  id: "5cabced6d2c9ebba50f1dfa2",
  image: "http://www.image.com/hill.jpeg",
  lunch: "epougelknv",
  module: 4,
  morning: "oiwgrh9u0wg3",
  name: "Hillary",
  program: "FE",
  pronouns: "she/her",
  skills: ["react", "redux"],
  slack: "@hillstew",
}

export const mockParingHillRecievingHelp = {
  pairer: {
    name: 'Tiffany',
    module: 4,
    program: 'FE',
    id: '5caa7eebfdebb8348e53a48d',
    pronouns: 'she/her',
    skills: ['react', 'testing'],
    slack: '@tiffany',
    image: 'https://avatars1.githubusercontent.com/u/40586291?v='
  },
  pairee: {
    name: 'Hillary',
    module: 4,
    program: 'FE',
    id: '5caa7eebfdebb8348e53a48e',
    pronouns: 'she/her',
    slack: '@hillstew',
    image: 'https://avatars1.githubusercontent.com/u/40586291?v='
  },
  date: 'Mon Apr 22 2019',
  time: 'morning',
  id: '5caa7eebfdebb84098er4',
  notes: null
};