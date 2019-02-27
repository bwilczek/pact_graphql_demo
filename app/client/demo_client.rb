require 'graphql/client'
require 'graphql/client/http'

# @see https://github.com/github/graphql-client#configuration

class DemoClient
  def initialize(address = 'http://localhost:3000/graphql')
    @address = address
  end

  def client
    @http ||= GraphQL::Client::HTTP.new(@address)
    @client ||= GraphQL::Client.new(schema: GraphQL::Client.load_schema(@http), execute: @http)
  end

  def qotd
    unless defined?(QotdQuery)
      t = client.parse <<-'GRAPHQL'
        query {
          qotd {
            author
            quote
            __typename
          }
        }
      GRAPHQL
      DemoClient.const_set('QotdQuery', t)
    end
    client.query(QotdQuery)
  end
end
