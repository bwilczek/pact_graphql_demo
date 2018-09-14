import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({
  // uri: "http://localhost:3000/graphql",
  uri: "/graphql",
  fetchOptions: {
    mode: 'no-cors'
  }
});

class App extends Component {
  render() {

    console.log('render');

    client.query({
      query: gql`query { author(id: 2) { name } }`
    }).then(
      result => console.log(result),
      error => console.log(error)
    );

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
