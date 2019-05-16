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

export const getDatesToDisplay = (currentDay, daysRemaining) => {
  const dates = [currentDay.toString().slice(0, 15)];
  let counter = 1;
  for (let i = 0; i < daysRemaining; i++) {
    let nextDate = new Date(currentDay);
    nextDate.setDate(nextDate.getDate() + counter);
    if (nextDate.getDay() !== 0 && nextDate.getDay() !== 6) {
      dates.push(nextDate.toString().slice(0, 15));
    }
    counter += 1;
  }
  return dates;
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

export const getDaysRemaining = () => {
  const endDates = [
    new Date('Thu June 6 2019'),
    new Date('Thu August 1 2019'),
    new Date('Thu September 19 2019'),
    new Date('Thu November 7 2019')
  ];
  const today = new Date();
  const nextEndDate = endDates.find(date => {
    return today.getTime() - date.getTime() < 0;
  });
  return (nextEndDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000);
};

export const filterPastPairings = pairing => {
  return (
    new Date(pairing.date).getTime() - new Date().getTime() >
    -24 * 60 * 60 * 1000
  );
};

export const determineProgram = (program, module) => {
  if (module === 5) return `${program} Graduate`;
  return `${program} Mod ${module}`;
}