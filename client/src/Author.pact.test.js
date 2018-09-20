import { GraphQLInteraction, Pact } from '@pact-foundation/pact'
import path from 'path'
import { Author, GET_AUTHOR_QUERY, GET_AUTHOR_RAW_QUERY } from './Author'

import React from 'react';
import TestRenderer from 'react-test-renderer'
import wait from 'waait'

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import fetch from 'node-fetch'

import { print as printQL } from 'graphql/language/printer'

const client = new ApolloClient({
  uri: "http://localhost:3002/graphql",
  fetch: fetch,
  fetchOptions: {
    mode: 'no-cors'
  }
});

const provider = new Pact({
  consumer: 'AuthorConsumer',
  provider: 'AuthorProvider',
  port: 3002,
  log: path.resolve(process.cwd(), '../log', 'pact.log'),
  dir: path.resolve(process.cwd(), '../pacts'),
  logLevel: 'error',
  spec: 2
})

const graphqlQueryInteraction = new GraphQLInteraction()
  .uponReceiving('query getAuthor')
  .withQuery(printQL(GET_AUTHOR_QUERY))
  .withOperation('query')
  .withRequest({
    path: "/graphql",
    method: "POST",
  })
  .withVariables({
    id: 1,
  })
  .willRespondWith({
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: {
      data: {
        author: {
          name: 'Olga Tokarczuk'
        }
      },
    },
  });

describe('Pact with Author Provider', () => {
  beforeAll((done) => {
    return provider.setup()
      .then(() => {
        provider.addInteraction(graphqlQueryInteraction)
      })
      .then(() => done());
  })

  it('renders and saves pact file', async () => {
    const component = TestRenderer.create(
      <ApolloProvider client={client}>
        <Author id={1} />
      </ApolloProvider>
    )

    await wait(0)

    return provider.verify()
  })

  afterAll(() => {
    return provider.finalize()
  })
})
