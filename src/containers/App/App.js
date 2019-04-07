import React, { Component } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { connect } from 'react-redux';
import * as gql from '../../queries';
import { fetchData } from '../../utils';
import { setUser } from '../../actions';
import Controls from '../Controls';
import Schedule from '../Schedule';
import { getUserAndSchedule } from '../../thunks/getUserAndSchedule';
import Confirmation from '../Confirmation';

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
          <header>Paired</header>
          <Switch>
            <Route path="/schedule" component={Schedule} />
            <Route path="/book-pairing" component={Controls} />
            <Route path="/confirm" component={Confirmation}/>
            <Route exact path="/" render={() => <div>path: /</div>} />
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
  setUser: user => dispatch(setUser(user)),
  getUserAndSchedule: () => dispatch(getUserAndSchedule())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
