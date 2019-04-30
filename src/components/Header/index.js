import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    const { user, handleSignOut } = this.props;
    return (
      <header className='Header'>
        <Link to='/'>
          <h1>Paired</h1>
        </Link>
        {user.id && (
          <div className='Header--controls'>
            <NavLink to='/schedule'>View Schedule</NavLink>
            <NavLink to='/book-pairing'>Book a Pairing</NavLink>
            <button className='Header--button--signout' onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        )}
      </header>
    );
  }
}
