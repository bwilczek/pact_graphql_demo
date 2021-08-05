# Demo for contract testing

Just a random, useless change.

Components:

* Rails GraphQL backend (provider)
* Webpack/React frontend (consumer)
* Contact testing with `pact`

Pre-requisites:
```
# pact-broker on port 8080:
# see https://github.com/pact-foundation/pact_broker#to-have-a-play-around-on-your-local-machine

# provider
bundle install
bundle exec ./bin/rails db:migrate
bundle exec ./bin/rails db:seed

# consumer
cd client
yarn install
```

Running it:
```
# backend start
bundle exec rails s

# frontend start
PORT=3001 yarn start
```

See the UI at [http://localhost:3001](http://localhost:3001)

Smoke tests:
```
# testing REST API
curl -H 'Accept: application/json' http://localhost:3000/authors/1/books

# testing GraphQL using curl
curl -XPOST -d '{"operationName":null,"variables":{},"query":"{ author(id: 2) {name __typename}}"}' http://localhost:3000/graphql

# testing GraphQL in the rails console
PactGraphqlDemoSchema.execute('{book(id:1){title author {name}}}')['data']['book']['author']['name']
PactGraphqlDemoSchema.execute('{book(id:1){title author {name books {title}}}}')['data']['book']['author']['books'][1]['title']
PactGraphqlDemoSchema.execute('{author(id:2) {name books {title}}}')['data']['author']['books'][1]['title']
```

Proper tests:
```
# frontend, use MockedProvider for GraphQL
cd client; CI=true yarn test src/Author.test.js

# frontend, generate pact file
cd client; CI=true yarn test src/Author.pact.test.js

# frontent, publish pact file
cd client; yarn publish-pact

# backend, verify pact (from broker), rails server has to be running
rake pact:verify
```

#### Resources ####

* [Testing Pact Provider (Ruby)](https://github.com/pact-foundation/pact-ruby)
* [Testing Pact Subscriber (JS): Interactions, Matchers](https://github.com/pact-foundation/pact-js)
* [Testing Apollo GraphQL client](https://www.apollographql.com/docs/guides/testing-react-components.html#MockedProvider)
* [Testing promises with JestJS](https://jestjs.io/docs/en/tutorial-async)
* [Defining GraphQLInteraction for Pact JS](http://blog.pact.io/2018/07/24/contract-testing-a-graphql-api/)
* [GraphQL backend with Rails](http://graphql-ruby.org/getting_started)
