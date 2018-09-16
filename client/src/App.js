import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";

const client = new ApolloClient({
  // uri: "http://localhost:3000/graphql",
  uri: "/graphql",
  fetchOptions: {
    mode: 'no-cors'
  }
});

const Author = () => (
  <Query query={gql`query { author(id: 1) { name books {title} } }`} >
    {({ loading, error, data }) => {
      if (loading) return (<div>Loading...</div>);
      if (error) return (<div>Error :(</div>);
      return (
        <div>
          <div>{data.author.name}</div>
          <ul>
            { data.author.books.map( ({title}) => (<li key={title}>{title}</li>) ) }
          </ul>
        </div>
      )
    }}
  </Query>
);

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
            <Author />
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
