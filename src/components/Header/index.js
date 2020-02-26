import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { HamburgerMenu } from '../HamburgerMenu';
import PropTypes from 'prop-types';

export default class Header extends Component {
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
      .classList.contains('Header--dropdown');
    const imgWasClicked = event.target.classList.contains('Header--image');
    if (!dropdownWasClicked && !imgWasClicked) {
      this.setState({ isExpanded: false });
    }
  };

  render() {
    const { isExpanded } = this.state;
    const { user, handleSignOut, windowInnerWidth } = this.props;
    const { image, name } = user;
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
            <img
              src={image}
              alt={name}
              className='Header--image'
              onClick={this.handleClick}
            />
          </div>
        )}
        {user.id && windowInnerWidth > 740 && isExpanded && (
          <div className='Header--dropdown'>
            <ul className='HamburgerMenu--ul'>
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
