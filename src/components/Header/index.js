import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    const { user, handleSignOut } = this.props;
    return (
      <header className='Header'>
      <div className='Header--div'>
        <Link to='/' className='Header--h1--link'>
          <h1>Paired</h1>
        </Link>
        <a
          href='https://github.com/hillstew/paired-fe/issues/new'
          target='_blank'
          rel='noopener noreferrer'
          className='Header--github-link'>
          Submit an issue
        </a>
      </div>
        {user.id && (
          <div className='Header--controls'>
            <NavLink to='/schedule' className='Header--link'>View Schedule</NavLink>
            <NavLink to='/book-pairing' className='Header--link'>Book a Pairing</NavLink>
            <button
              className='Header--button--signout'
              onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        )}
      </header>
    );
  }
}
