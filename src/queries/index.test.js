import * as gql from './index';
import * as data from '../mockData';

describe('queries', () => {
  describe('getAvailablePairings', () => {
    it('should return a getAvailablePairings query with the correct params', () => {
      const mockProgram = 'BE';
      const mockMod = 3;
      const mockDate = 'Wed Apr 17 2019';
      const expected = data.mockQueryFromgetAvailablePairings;
      const result = gql.getAvailablePairings(mockProgram, mockMod, mockDate);
      expect(result).toEqual(expected);
    });
  });

  describe('getUser', () => {
    it('should return a getUser query with the correct params', () => {
      const mockName = 'Hillary';
      const expected = data.mockQueryFromgetUser;
      const result = gql.getUser(mockName);
      expect(result).toEqual(expected);
    });
  });

  describe('getUserPairings', () => {
    it('should return a getUserPairings query with the correct params', () => {
      const mockUserId = '5h5h5h5h5h5h5';
      const expected = data.mockQueryFromgetUserPairings;
      const result = gql.getUserPairings(mockUserId);
      expect(result).toEqual(expected);
    });
  });

  describe('updatePairing', () => {
    it('should return an updatePairing query with the correct params', () => {
      const mockPairingId = '6t6t6t';
      const mockPaireeId = '7b7b7b';
      const mockNotes = 'Mythical Creatures';
      const expected = data.mockQueryFromupdatePairing;
      const result = gql.updatePairing(mockPairingId, mockPaireeId, mockNotes);
      expect(result).toEqual(expected);
    });
  });

  describe('deletePairing', () => {
    it('should return a deletePairing query with the correct params', () => {
      const mockPairingId = '45dtl';
      const expected = data.mockQueryFromdeletePairing;
      const result = gql.deletePairing(mockPairingId);
      expect(result).toEqual(expected);
    });
  });

});