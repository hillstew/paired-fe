import { determineDisplayTime } from './index';

describe('helpers', () => {
  describe('determineDisplayTime', () => {
    it('should return the correct time if passed param of morning', () => {
      const mockTime = 'morning';
      const expected = '8:00 - 8:50 a.m.';
      const result = determineDisplayTime(mockTime);
      expect(result).toEqual(expected);
    });

    it('should return the correct time if passed param of lunch', () => {
      const mockTime = 'lunch';
      const expected = '12:00 - 12:50 p.m.';
      const result = determineDisplayTime(mockTime);
      expect(result).toEqual(expected);
    });

    it('should return the correct time if passed param of afternoon', () => {
      const mockTime = 'afternoon';
      const expected = '4:10 - 5:00 p.m.';
      const result = determineDisplayTime(mockTime);
      expect(result).toEqual(expected);
    });

    it('should return the default', () => {
      const expected = undefined;
      const result = determineDisplayTime();
      expect(result).toEqual(expected);
    });
  });
});