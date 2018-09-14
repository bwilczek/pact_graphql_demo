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
