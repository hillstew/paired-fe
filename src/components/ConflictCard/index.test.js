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

  it('should redirect user to /book-pairing when Choose Another Pairing is clicked', () => {
    const expectedPath = '/book-pairing';
    wrapper.find('button.ConflictCard--button').simulate('click');
    expect(mockHistory.push).toHaveBeenCalledWith(expectedPath);
  });

  it('should redirect user to /schedule when View Schedule is clicked', () => {
    const expectedPath = '/schedule';
    wrapper.find('button.ConflictCard--button--schedule').simulate('click');
    expect(mockHistory.push).toHaveBeenCalledWith(expectedPath);
  });
});
