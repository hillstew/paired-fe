import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { mockUser } from './mockUser';

const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  uri: 'http://localhost:3001/graphql'
});

cache.writeData({
  data: {
    isLoggedIn: true,
    user: mockUser
  }
});

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const provider = (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Query query={IS_LOGGED_IN}>
        {({ data }) => (data.isLoggedIn ? <App /> : <div>Login</div>)}
      </Query>
    </ApolloProvider>
  </BrowserRouter>
);

ReactDOM.render(provider, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
