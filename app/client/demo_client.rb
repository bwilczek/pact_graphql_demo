require 'graphql/client'
require 'graphql/client/http'

module Demo
  # HTTP = GraphQL::Client::HTTP.new('http://localhost:3000/graphql')
  # Schema = GraphQL::Client.load_schema(HTTP)
  # Client = GraphQL::Client.new(schema: Schema, execute: HTTP)

  class << self
    def client(address = 'http://localhost:3000/graphql')
      @http ||= GraphQL::Client::HTTP.new(address)
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
        Demo.const_set('QotdQuery', t)
      end
      client.query(QotdQuery)
    end
  end
end
