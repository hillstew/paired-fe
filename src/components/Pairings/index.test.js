import React from 'react';
import { shallow } from 'enzyme';
import { Pairings } from './index';
import { mockAvailPairings } from '../../mockData';

describe('Pairings', () => {
  let wrapper;
  const mockProps = {
    history: { push: jest.fn() },
    openPairings: mockAvailPairings
  };

  beforeEach(() => {
    wrapper = shallow(<Pairings {...mockProps} />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});