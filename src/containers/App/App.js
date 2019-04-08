import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { connect } from 'react-redux';
import Controls from '../Controls';
import Schedule from '../Schedule';
import { getUserAndSchedule } from '../../thunks/getUserAndSchedule';
import Confirmation from '../Confirmation';
import codeSVG from '../../images/code-typing.svg';

export class App extends Component {
  async componentDidMount() {
    const { getUserAndSchedule } = this.props;
    getUserAndSchedule();
  }

  render() {
    return (
      <div className="App">
        <Sidebar />
        <div>
          <header>
            <h1>Paired</h1>
          </header>
          <Switch>
            <Route path="/schedule" component={Schedule} />
            <Route path="/book-pairing" component={Controls} />
            <Route path="/confirm" component={Confirmation} />
            <Route
              exact
              path="/"
              render={() => <img src={codeSVG} alt="two people coding" />}
            />
            <Route render={() => <div>ERRORRRRRRRR</div>} />
          </Switch>
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
  getUserAndSchedule: () => dispatch(getUserAndSchedule())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
