import React from 'react';
import { shallow } from 'enzyme';
import { ConflictCard } from './index';

describe('ConflictCard', () => {
  const mockDate = 'Wed Apr 17 2019';
  const mockTime = 'morning';
  const mockHistory = { push: jest.fn() };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <ConflictCard date={mockDate} time={mockTime} history={mockHistory} />
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
