import React, { Component } from 'react';
import '../../styles/main.scss';
import { withRouter, Route, Switch } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { connect } from 'react-redux';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar />
        <div>
          <header>hi</header>
          <Switch>
            <Route path="/schedule" render={() => <div>path: /schedule</div>} />
            <Route
              path="/avail-pairings"
              render={() => <div>path: /avail-pairings</div>}
            />
            <Route exact path="/" render={() => <div>path: /</div>} />
            <Route render={() => <div>ERRORRRRRRRR</div>} />
          </Switch>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
  hasError: state.hasError
});

export default withRouter(connect(mapStateToProps)(App));
