import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { HamburgerMenu } from '../HamburgerMenu';
import PropTypes from 'prop-types';

export default class Header extends Component {
  render() {
    const { user, handleSignOut, windowInnerWidth } = this.props;
    return (
      <header className='Header'>
        <div className='Header--div'>
          <Link to='/' className='Header--h1--link'>
            <h1 className='Header--h1'>Paired</h1>
          </Link>
          <a
            href='https://github.com/hillstew/paired-fe/issues/new'
            target='_blank'
            rel='noopener noreferrer'
            className='Header--github-link'
          >
            Submit an issue
          </a>
        </div>
        {user.id && windowInnerWidth > 740 && (
          <div className='Header--controls'>
            <NavLink to='/schedule' className='Header--link'>
              View Schedule
            </NavLink>
            <NavLink to='/book-pairing' className='Header--link'>
              Book a Pairing
            </NavLink>
            <button className='Header--button--signout' onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        )}
        {user.id && windowInnerWidth <= 740 && (
          <HamburgerMenu handleSignOut={handleSignOut} />
        )}
      </header>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object,
  handleSignOut: PropTypes.func,
  windowInnerWidth: PropTypes.number
};
