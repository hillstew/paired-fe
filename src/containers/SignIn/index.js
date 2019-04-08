import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import { setError } from '../../actions';
import Profile from '../Profile';

export class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      hasAuthorizedWithGitHub: false,
      user: {}
    };
  }

  handleSignIn = async () => {
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('read:user');
    try {
      const { user, additionalUserInfo } = await firebase
        .auth()
        .signInWithPopup(provider);
      const { name, email, avatar_url: image } = additionalUserInfo.profile;
      const firebaseID = user.uid;
      this.setState({
        hasAuthorizedWithGitHub: true,
        user: { name, email, image, firebaseID }
      });
    } catch (error) {
      this.props.setError(error.message);
    }
  };

  handleSignOut = async () => {
    await firebase.auth().signOut();
    console.log('signed out')
  };

  render() {
    const { hasAuthorizedWithGitHub, user } = this.state;
    return (
      <div>
        {
          !hasAuthorizedWithGitHub &&
          <button onClick={this.handleSignIn}>
            Sign In with GitHub
          </button>
        }
        <button onClick={this.handleSignOut}>
          Sign Out
        </button>
        {
          hasAuthorizedWithGitHub &&
          <Profile {...user} />
        }
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => ({
  setError: (message) => dispatch(setError(message))
});

export default connect(null, mapDispatchToProps)(SignIn);