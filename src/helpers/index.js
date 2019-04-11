export const determineDisplayTime = time => {
  switch (time) {
    case 'morning':
      return '8:00 - 8:50 a.m.';
    case 'lunch':
      return '12:00 - 12:50 p.m.';
    case 'afternoon':
      return '4:10 - 5:00 p.m.';
    default:
      return;
  }
};

export const getDatesToDisplay = num => {
  let dates = [];
  let counter = 1;
  while (dates.length < num) {
    let nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + counter);
    if (nextDate.getDay() !== 0 && nextDate.getDay() !== 6) {
      dates.push(nextDate.toString().slice(0, 15));
    }
    counter += 1;
  }
  return [...dates];
};

export const getDatesToDisplayFancy = (startDate, num) => {
  let dates = [];
  let counter = 1;
  while (dates.length < num) {
    let nextDate = new Date(startDate);
    nextDate.setDate(nextDate.getDate() + counter);
    if (nextDate.getDay() !== 0 && nextDate.getDay() !== 6) {
      dates.push(nextDate.toString().slice(0, 15));
    }
    counter += 1;
  }
  return [startDate, ...dates];
};

export const determineDay = index => {
  switch (index) {
    case 0:
      return { day: 'Mon', time: 'morning' };
    case 1:
      return { day: 'Mon', time: 'lunch' };
    case 2:
      return { day: 'Mon', time: 'afternoon' };
    case 3:
      return { day: 'Tue', time: 'morning' };
    case 4:
      return { day: 'Tue', time: 'lunch' };
    case 5:
      return { day: 'Tue', time: 'afternoon' };
    case 6:
      return { day: 'Wed', time: 'morning' };
    case 7:
      return { day: 'Wed', time: 'lunch' };
    case 8:
      return { day: 'Wed', time: 'afternoon' };
    case 9:
      return { day: 'Thu', time: 'morning' };
    case 10:
      return { day: 'Thu', time: 'lunch' };
    case 11:
      return { day: 'Thu', time: 'afternoon' };
    case 12:
      return { day: 'Fri', time: 'morning' };
    case 13:
      return { day: 'Fri', time: 'lunch' };
    case 14:
      return { day: 'Fri', time: 'afternoon' };
    default:
      return;
  }
};

export const makeAvailPairings = (pairings, time, pairerId) => {
  return pairings.map(pairing => {
    return {
      date: pairing,
      time: time,
      pairer: pairerId
    };
  });
};

export const formatPairingsForQuery = arr => {
  return JSON.stringify(arr)
    .replace(/"pairer"/g, 'pairer')
    .replace(/"date"/g, 'date')
    .replace(/"time"/g, 'time');
};

export const createPairingsForQuery = (chosenAvails, inning, pairerId) => {
  return chosenAvails.reduce((acc, curr, index) => {
    if (!curr) {
      return acc;
    }

    let availSelect = determineDay(index);
    let thingsToMake = inning.filter(date => {
      return date.includes(availSelect.day);
    });
    let arrayOfPairings = makeAvailPairings(
      thingsToMake,
      availSelect.time,
      pairerId
    );
    acc = [...acc, ...arrayOfPairings];
    return acc;
  }, []);
};
