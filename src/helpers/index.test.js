import {
  determineDisplayTime,
  formatPairingsForQuery,
  makeAvailPairings,
  getDatesToDisplay
} from './index';

describe('helpers', () => {
  describe('determineDisplayTime', () => {
    it('should return the correct time if passed param of morning', () => {
      const mockTime = 'morning';
      const expected = '8:00 - 8:30 a.m.';
      const result = determineDisplayTime(mockTime);
      expect(result).toEqual(expected);
    });

    it('should return the correct time if passed param of lunch', () => {
      const mockTime = 'lunch';
      const expected = '12:00 - 12:30 p.m.';
      const result = determineDisplayTime(mockTime);
      expect(result).toEqual(expected);
    });

    it('should return the correct time if passed param of afternoon', () => {
      const mockTime = 'afternoon';
      const expected = '4:10 - 4:40 p.m.';
      const result = determineDisplayTime(mockTime);
      expect(result).toEqual(expected);
    });

    it('should return the default', () => {
      const expected = undefined;
      const result = determineDisplayTime();
      expect(result).toEqual(expected);
    });
  });

  describe('makeAvailPairings', () => {
    it('should return an array of pairing objects', () => {
      const mockPairings = [
        'Mon Apr 29 2019',
        'Mon May 06 2019',
        'Mon May 13 2019'
      ];
      const mockTime = 'lunch';
      const mockPairerId = 'rhty';
      const expected = [
        {
          date: 'Mon Apr 29 2019',
          time: mockTime,
          pairer: mockPairerId
        },
        {
          date: 'Mon May 06 2019',
          time: mockTime,
          pairer: mockPairerId
        },
        {
          date: 'Mon May 13 2019',
          time: mockTime,
          pairer: mockPairerId
        }
      ];
      const result = makeAvailPairings(mockPairings, mockTime, mockPairerId);
      expect(result).toEqual(expected);
    });
  });

  describe('getDatesToDisplay', () => {
    it('should return an array with a length equal to all the weekdays between the start and end date', () => {
      const daysRemaining = 12;
      const mockStartDate = 'Mon Apr 29 2019';
      const result = getDatesToDisplay(mockStartDate, daysRemaining);
      const expectedLength = 10;
      expect(result.length).toEqual(expectedLength);
    });

    it('should return an array of numbers with the first number equaling the start date', () => {
      const mockLength = 10;
      const mockStartDate = 'Mon Apr 29 2019';
      const result = getDatesToDisplay(mockStartDate, mockLength);
      expect(result[0]).toEqual(mockStartDate);
    });
  });

  describe('formatPairingsForQuery', () => {
    it('should format a pairings array correctly to use in a query', () => {
      const expected =
        '[{pairer:"3490sfjdvl",date:"Mon Apr 03 2019",time:"lunch"}]';
      const mockUnFormattedPairing = [
        {
          pairer: '3490sfjdvl',
          date: 'Mon Apr 03 2019',
          time: 'lunch'
        }
      ];
      const result = formatPairingsForQuery(mockUnFormattedPairing);
      expect(result).toEqual(expected);
    });
  });
});
