import React, { Component, Fragment } from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from '../../components/Header';
import { connect } from 'react-redux';
import Controls from '../Controls';
import RockAndPebble from '../RockAndPebble';
import RockListing from '../RockListing';
import Schedule from '../Schedule';
import Confirmation from '../Confirmation';
import SignIn from '../SignIn';
import { signUserOut } from '../../actions';
import { signInUser } from '../../thunks/signInUser';
import firebase from 'firebase/app';
import 'firebase/auth';
import codesvg from '../../images/code-typing.svg';
import notfoundsvg from '../../images/not_found.svg';
import PropTypes from 'prop-types';
import Availability from '../Availability';
import Profile from '../Profile';
import Stats from '../Stats';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      windowInnerWidth: 0
    };
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ windowInnerWidth: window.innerWidth });
  };

  componentDidMount() {
    this.updateWindowDimensions();
    this.checkUser();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  checkUser = () => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        this.props.signInUser(user.uid, user.photoURL);
      }
    });
  };

  handleSignOut = async () => {
    const { history, signUserOut } = this.props;
    await firebase.auth().signOut();
    signUserOut();
    history.push('/');
  };

  render() {
    const { user, match, history } = this.props;
    const { windowInnerWidth } = this.state;
    return (
      <div className='App'>
        <Header
          user={user}
          handleSignOut={this.handleSignOut}
          windowInnerWidth={windowInnerWidth}
        />
        <div>
          {user.id && (
            <React.Fragment>
              <Switch>
                <Route path='/schedule' component={Schedule} />
                <Route path='/book-pairing' component={Controls} />
                <Route path='/rock-pebble' component={RockAndPebble} />
                <Route path='/rock-listing' component={RockListing} />
                <Route path='/confirm/:id' component={Confirmation} />
                <Route path='/edit-profile' component={Profile} />
                <Route path='/stats-profile' component={Stats} />
                <Route
                  path='/edit-availability'
                  render={() => (
                    <Availability windowInnerWidth={windowInnerWidth} />
                    )}
                />
                <Route
                  exact
                  path='/'
                  render={() => (
                    <div>
                      <h2 className='App--h2'>
                        Welcome {user.name}{' '}
                        <span role='img' aria-label='hand waving emoji'>
                          👋
                        </span>
                      </h2>
                      <img
                        className='App--img'
                        src={codesvg}
                        alt='Two people coding'
                      />
                    </div>
                  )}
                />
                <Route
                  render={() => (
                    <Fragment>
                      <h2 className='App--h2'>Sorry, page not found.</h2>
                      <img
                        className='App--img'
                        src={notfoundsvg}
                        alt='Eyes representing people looking around leaves'
                      />
                    </Fragment>
                  )}
                />
              </Switch>
            </React.Fragment>
          )}
          {!user.id && (
            <Switch>
              <Route
                exact
                path='/'
                render={() => <SignIn history={history} match={match} />}
              />
              <Route
                path='/set-availability'
                render={() => (
                  <Availability windowInnerWidth={windowInnerWidth} />
                )}
              />
              <Route path='/schedule' render={() => <Redirect to='/' />} />
              <Route path='/book-pairing' render={() => <Redirect to='/' />} />
              <Route
                render={() => (
                  <Fragment>
                    <p>Sorry, page not found.</p>
                    <img
                      className='App--img'
                      src={notfoundsvg}
                      alt='Eyes representing people looking around leaves'
                    />
                  </Fragment>
                )}
              />
            </Switch>
          )}
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  isLoading: state.isLoading,
  hasError: state.hasError,
  user: state.user
});

export const mapDispatchToProps = dispatch => ({
  signInUser: (id, photoURL) => dispatch(signInUser(id, photoURL)),
  signUserOut: () => dispatch(signUserOut())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);

App.propTypes = {
  hasError: PropTypes.string,
  history: PropTypes.object,
  isLoading: PropTypes.bool,
  location: PropTypes.object,
  match: PropTypes.object,
  signInUser: PropTypes.func,
  signUserOut: PropTypes.func,
  user: PropTypes.object
};
