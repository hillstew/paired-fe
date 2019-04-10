import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default class Sidebar extends Component {
  render() {
    return (
      <aside className='Sidebar'>
        <Link to='/'>
          <h1>Paired</h1>
        </Link>
        <NavLink to='/schedule'>View Schedule</NavLink>
        <NavLink to='/book-pairing'>Book a Pairing</NavLink>
      </aside>
    );
  }
}
