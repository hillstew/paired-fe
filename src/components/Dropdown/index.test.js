import React from 'react';
import { shallow } from 'enzyme';
import { Dropdown } from './index';

describe('Dropdown', () => {
  let wrapper;
  const mockOptions = ['1', '2', '3', '4'];
  const mockLabel = 'Module';
  const mockHandleChange = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Dropdown
        options={mockOptions}
        label={mockLabel}
        handleChange={mockHandleChange}
      />
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call handleChangeOptions when an option dropdown is selected', () => {
    const mockEvent = { name: mockLabel, value: mockOptions[0] };
    wrapper.find('select').simulate('change', mockEvent);
    expect(mockHandleChange).toHaveBeenCalledWith(mockEvent);
  });
});
