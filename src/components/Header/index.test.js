import React from 'react';
import { shallow } from 'enzyme';
import Header from './index';

describe('Header', () => {
  let wrapper;
  const mockProps = {
    user: { id: 'asdf' },
    handleSignOut: jest.fn(),
    windowInnerWidth: 1440
  };

  beforeEach(() => {
    wrapper = shallow(<Header {...mockProps} />);
  });

  it('should match the snapshot when the user is signed in', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should have default state', () => {
    expect(wrapper.state()).toEqual({ isExpanded: false });
  });

  it('should match the snapshot when the user is not signed in', () => {
    wrapper = shallow(<Header {...mockProps} user={{ id: false }} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should set isExpanded to true when the image is clicked', () => {
    wrapper.find('.Header--image').simulate('click');
    expect(wrapper.state('isExpanded')).toEqual(true);
  });

  it('should call handleSignOut when the Sign Out button is clicked', () => {
    wrapper.find('.Header--image').simulate('click');
    wrapper.find('.Header--button--signout').simulate('click');
    expect(mockProps.handleSignOut).toHaveBeenCalled();
  });
});