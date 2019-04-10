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

export const getDatesToDisplay = (num) => {
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
         return [
           ...dates,
         ];
       };