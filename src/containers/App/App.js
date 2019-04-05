import React, { Component } from 'react';
import '../../styles/main.scss';
import { withRouter, Route, Switch } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { connect } from 'react-redux';
import * as gql from '../../queries';
import { fetchData } from '../../utils';
import { setUser } from '../../actions';

export class App extends Component {

  async componentDidMount() {
    const body = gql.getUser('Hillary');
    const response = await fetchData(body);
    this.props.setUser(response.getUser);
  }

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

export const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
