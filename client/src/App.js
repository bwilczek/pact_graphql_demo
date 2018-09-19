import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Author } from './Author';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import fetch from 'node-fetch'

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  fetch: fetch,
  fetchOptions: {
    mode: 'no-cors'
  }
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <div className="App-intro">
            <Author id={1}/>
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
