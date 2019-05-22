import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import { setError } from '../../actions';
import { signInUser } from '../../thunks/signInUser';
import Profile from '../Profile';
import codesvg from '../../images/code-typing.svg';
import PropTypes from 'prop-types';

export class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  handleSignIn = async () => {
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('read:user');
    try {
      const {
        user,
        additionalUserInfo
      } = await firebase.auth().signInWithPopup(provider);
      const { name, email, avatar_url: image } = additionalUserInfo.profile;
      const firebaseID = user.uid;
      this.setState({ user: { name, email, image, firebaseID } });
      await this.props.signInUser(firebaseID, image);
    } catch (error) {
      this.props.setError(error.message);
    }
  };

  render() {
    const { isNewUser } = this.props.user;
    const { user } = this.state;
    return (
      <div className='SignIn--div'>
        {!user.name && (
          <button onClick={this.handleSignIn}>Sign In with GitHub</button>
        )}
        {!user.firebaseID && (
          <img
            className='SignIn--img'
            src={codesvg}
            alt='Two people coding'
          />
        )}
        {isNewUser && user.firebaseID && <Profile {...user} match={this.props.match} />}
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.user
});

export const mapDispatchToProps = dispatch => ({
  setError: message => dispatch(setError(message)),
  signInUser: (id, photoURL) => dispatch(signInUser(id, photoURL))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);

SignIn.propTypes = {
  history: PropTypes.object,
  setError: PropTypes.func,
  signInUser: PropTypes.func,
  user: PropTypes.object,
};