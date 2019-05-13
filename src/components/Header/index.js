import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { HamburgerMenu } from '../HamburgerMenu';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      windowInnerWidth: 0
    };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ windowInnerWidth: window.innerWidth });
  };

  render() {
    const { user, handleSignOut } = this.props;
    const { windowInnerWidth } = this.state;
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
            className='Header--github-link'
          >
            Submit an issue
          </a>
        </div>
        {user.id && windowInnerWidth >= 659 && (
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
        {user.id && windowInnerWidth < 659 && (
          <HamburgerMenu handleSignOut={handleSignOut} />
        )}
      </header>
    );
  }
}
