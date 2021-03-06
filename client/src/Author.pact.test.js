import { GraphQLInteraction, Pact, Matchers } from '@pact-foundation/pact'
import path from 'path'
import ApolloClient from "apollo-boost";
import fetch from 'node-fetch'
import { print as printQL } from 'graphql/language/printer'

import { Author, GET_AUTHOR_QUERY } from './Author'

const provider = new Pact({
  consumer: 'AuthorConsumer',
  provider: 'AuthorProvider',
  port: 3002,
  log: path.resolve(process.cwd(), '../log', 'pact.log'),
  dir: path.resolve(process.cwd(), '../pacts'),
  logLevel: 'warn',
  spec: 2
})

const client = new ApolloClient({
  uri: "http://localhost:3002/graphql",
  fetch: fetch,
  fetchOptions: {
    mode: 'no-cors'
  }
});

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
          name: Matchers.like('Kasia'),
          __typename: 'Author',
          books: Matchers.eachLike(
            {
              title: 'Prawiek i inne czasy',
              __typename: 'Book'
            }
          )
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
      .then(() => {
        done()
      });
  })

  it('saves pact file', async () => {
    const _result = await client.query({query: GET_AUTHOR_QUERY, variables: {id: 1}, operationName: 'query'})
    provider.verify()
  })

  afterAll((done) => {
    provider.finalize().then(() => done());
  });
})
