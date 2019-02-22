#!/usr/bin/env node

const publisher = require('@pact-foundation/pact-node')
const path = require('path')

const pactTag = 'demo'
const appVersion = 'v0.1.0'

publisher.publishPacts({
    pactFilesOrDirs: [
        path.resolve(process.cwd(), '../pacts/authorconsumer-authorprovider.json')
    ],
    pactBroker: 'http://localhost:8080/',
    tags: [pactTag],
    consumerVersion: appVersion
})
