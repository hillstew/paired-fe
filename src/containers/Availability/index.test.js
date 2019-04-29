import React from 'react';
import { shallow } from 'enzyme';
import { Availability } from './index';

describe('Availability', () => {
  let wrapper;
  let mockHandleClick = jest.fn();
  let mockAvailabilities = [true, false, true, false, true, false];

  beforeEach(() => {
    wrapper = shallow(
      <Availability
        handleClick={mockHandleClick}
        availabilities={mockAvailabilities}
      />
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
