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
