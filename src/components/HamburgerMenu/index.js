import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

export class HamburgerMenu extends Component {
  constructor() {
    super();
    this.state = {
      isExpanded: false
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleEventListener);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleEventListener);
  }

  handleClick = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  };

  handleEventListener = event => {
    const dropdownWasClicked = event.target
      .closest('div')
      .classList.contains('HamburgerMenu--dropdown');
    const hamburgerWasClicked = event.target
      .closest('div')
      .classList.contains('HamburgerMenu');
    if (!dropdownWasClicked && !hamburgerWasClicked) {
      this.setState({ isExpanded: false });
    }
  };

  render() {
    const { handleSignOut } = this.props;
    const { isExpanded } = this.state;
    const classNameActive = isExpanded ? ' is-active' : '';
    return (
      <div className='HamburgerMenu'>
        <button
          className={`hamburger hamburger--squeeze${classNameActive}`}
          type='button'
          onClick={this.handleClick}
        >
          <span className='hamburger-box'>
            <span className='hamburger-inner' />
          </span>
        </button>
        {isExpanded && (
          <div className='HamburgerMenu--dropdown'>
            <ul className='HamburgerMenu--ul'>
              <li className='HamburgerMenu--li'>
                <NavLink
                  to='/schedule'
                  className='Header--link'
                  onClick={this.handleClick}
                >
                  View Schedule
                </NavLink>
              </li>
              <li className='HamburgerMenu--li'>
                <NavLink
                  to='/book-pairing'
                  className='Header--link'
                  onClick={this.handleClick}
                >
                  Book a Pairing
                </NavLink>
              </li>
              <li className='HamburgerMenu--li'>
                <NavLink
                  to='/stats-profile'
                  className='Header--link'
                  onClick={this.handleClick}
                >
                  View Stats
                </NavLink>
              </li>
              <li className='HamburgerMenu--li'>
                <NavLink
                  to='/edit-profile'
                  className='Header--link'
                  onClick={this.handleClick}
                >
                  Edit Profile
                </NavLink>
              </li>
              <li className='HamburgerMenu--li'>
                <button
                  className='Header--button--signout'
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }
}

HamburgerMenu.propTypes = {
  handleSignOut: PropTypes.func
};
