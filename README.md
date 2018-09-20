# Demo for contract testing

Components:

* Rails GraphQL backend (provider)
* Webpack/React frontend (consumer)
* Contact testing with `pact`

Running it:
```
# backend
bundle exec rails s
# frontend
cd client ; PORT=3001 yarn start
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
# cd client; CI=true yarn test src/Author.pact.test.js

# backend, verify pact file
# TODO
```
