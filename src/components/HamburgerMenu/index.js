import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export class HamburgerMenu extends Component {
  constructor() {
    super();
    this.state = {
      isExpanded: false
    };
  }

  handleClick = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
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
              <li className='HamburgerMenu--li' onClick={this.handleClick}>
                <NavLink to='/book-pairing' className='Header--link'>
                  Book a Pairing
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
