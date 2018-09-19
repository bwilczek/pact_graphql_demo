import React from 'react';
import TestRenderer from 'react-test-renderer'
import { Author, GET_AUTHOR_QUERY }from './Author'
import fetch from 'node-fetch'
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  fetch: fetch,
  fetchOptions: {
    mode: 'no-cors'
  }
});

it('renders without crashing', () => {
  TestRenderer.create(
    <ApolloProvider client={client}>
      <Author id={2} />
    </ApolloProvider>
  )
});
